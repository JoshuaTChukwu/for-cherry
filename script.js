/* =========================================================================
   My Date Helper — page logic. You shouldn't need to edit this file;
   everything you customize lives in config.js.
   ========================================================================= */
(function () {
  "use strict";

  const C = (typeof CONFIG !== "undefined" && CONFIG) ||
            (typeof window !== "undefined" && window.CONFIG) || {};
  let chosenDate = null;

  /* ---- helpers ---- */
  const $ = (id) => document.getElementById(id);
  function fill(str) {
    return String(str == null ? "" : str)
      .replaceAll("{her}", C.herName || "")
      .replaceAll("{you}", C.yourName || "")
      .replaceAll("{fromCity}", (C.intercity && C.intercity.herCity) || "")
      .replaceAll("{toCity}", (C.intercity && C.intercity.yourCity) || "")
      .replaceAll("{date}", chosenDate || "");
  }

  /* ---- theme + title ---- */
  function applyTheme() {
    const t = C.theme || {};
    const r = document.documentElement.style;
    if (t.background1) r.setProperty("--bg1", t.background1);
    if (t.background2) r.setProperty("--bg2", t.background2);
    if (t.accent) r.setProperty("--accent", t.accent);
    if (t.yesColor) r.setProperty("--yes", t.yesColor);
    if (t.textColor) r.setProperty("--text", t.textColor);
    document.title = fill(C.pageTitle) || "💌";
  }

  /* ---- scene switching ---- */
  function showScene(id) {
    document.querySelectorAll(".scene").forEach((s) => s.classList.remove("active"));
    $(id).classList.add("active");
  }

  /* ---- SCENE 1: intro ---- */
  function buildIntro() {
    const photo = $("herPhoto");
    if (C.herPhoto) {
      photo.src = C.herPhoto;
      photo.alt = C.herName || "";
      photo.classList.remove("hidden");
      photo.onerror = () => photo.classList.add("hidden");
    }
    const box = $("introLines");
    const lines = C.intro || [];
    box.innerHTML = "";
    lines.forEach((line, i) => {
      const p = document.createElement("p");
      p.textContent = fill(line);
      p.style.animationDelay = (0.5 + i * 1.1) + "s";
      box.appendChild(p);
    });
    const startBtn = $("startBtn");
    startBtn.textContent = C.startButton || "Ask me";
    // reveal the start button after the last line
    setTimeout(() => startBtn.classList.remove("hidden"),
      (0.5 + lines.length * 1.1) * 1000 + 400);
    startBtn.addEventListener("click", () => {
      startMusic();
      showScene("scene-ask");
    });
  }

  /* ---- SCENE 2: the ask ---- */
  function buildAsk() {
    $("questionText").textContent = fill(C.question);
    const yes = $("yesBtn");
    const no = $("noBtn");
    yes.textContent = C.yesButton || "Yes 💕";
    no.textContent = (C.noTaunts && C.noTaunts[0]) || C.noButton || "No";

    let taunt = 0;
    let scale = 1;

    function dodge() {
      // shrink + show next taunt + jump somewhere else
      const taunts = C.noTaunts && C.noTaunts.length ? C.noTaunts : [C.noButton || "No"];
      taunt = (taunt + 1) % taunts.length;
      no.textContent = taunts[taunt];

      scale = Math.max(0.45, scale - 0.12);

      const pad = 12;
      const maxX = Math.max(0, window.innerWidth - no.offsetWidth - pad * 2);
      const maxY = Math.max(0, window.innerHeight - no.offsetHeight - pad * 2);
      const x = pad + Math.random() * maxX;
      const y = pad + Math.random() * maxY;

      no.style.position = "fixed";
      no.style.left = x + "px";
      no.style.top = y + "px";
      no.style.transform = "scale(" + scale + ")";
    }

    no.addEventListener("mouseenter", dodge);
    no.addEventListener("click", (e) => { e.preventDefault(); dodge(); });
    no.addEventListener("touchstart", (e) => { e.preventDefault(); dodge(); }, { passive: false });

    yes.addEventListener("click", () => {
      burstConfetti();
      showScene("scene-pick");
    });
  }

  /* ---- SCENE 3: pick a day ---- */
  function buildPick() {
    $("yesTitle").textContent = fill(C.yesTitle);
    $("yesMessage").textContent = fill(C.yesMessage);

    const box = $("dateOptions");
    box.innerHTML = "";
    (C.availableDates || []).forEach((opt) => {
      const btn = document.createElement("button");
      btn.className = "date-option";
      btn.innerHTML =
        '<span class="opt-label"></span><span class="opt-when"></span>';
      btn.querySelector(".opt-label").textContent = fill(opt.label);
      btn.querySelector(".opt-when").textContent = fill(opt.when);
      btn.addEventListener("click", () => {
        chosenDate = fill(opt.when);
        buildReveal();
        burstConfetti();
        showScene("scene-yes");
      });
      box.appendChild(btn);
    });
  }

  /* ---- SCENE 4: flight ticket + plan ---- */
  function buildReveal() {
    // flight boarding pass
    const fc = $("flightCard");
    const ic = C.intercity || {};
    if (ic.enabled) {
      fc.classList.remove("hidden");
      fc.innerHTML = "";
      const title = document.createElement("div");
      title.className = "flight-title";
      title.textContent = fill(C.flightTitle);

      const route = document.createElement("div");
      route.className = "flight-route";
      route.innerHTML =
        '<span class="city"></span><span class="plane">✈️</span><span class="city"></span>';
      route.children[0].textContent = ic.herCity || "";
      route.children[2].textContent = ic.yourCity || "";

      const msg = document.createElement("div");
      msg.className = "flight-msg";
      msg.textContent = fill(C.flightMessage);

      const stub = document.createElement("div");
      stub.className = "flight-stub";
      const photoHtml = C.herPhoto
        ? '<img class="flight-photo" src="' + C.herPhoto + '" alt="" onerror="this.remove()"/>'
        : "";
      stub.innerHTML =
        photoHtml +
        '<span>Passenger · ' + (C.herName || "") + '</span><span>' + (chosenDate || "") + "</span>";

      fc.append(title, route, msg, stub);
    } else {
      fc.classList.add("hidden");
    }

    // date plan card
    const dp = C.datePlan || {};
    const rows = [
      { icon: "🏖️", label: "What", val: dp.what },
      { icon: "📍", label: "Where", val: dp.where },
      { icon: "🗓️", label: "When", val: chosenDate },
      { icon: "👗", label: "Dress code", val: dp.dressCode },
    ].filter((r) => r.val);

    const card = $("datePlan");
    card.innerHTML = "";
    rows.forEach((r) => {
      const row = document.createElement("div");
      row.className = "date-row";
      row.innerHTML =
        '<span class="icon">' + r.icon + '</span><span><span class="label">' +
        r.label + '</span>' + fill(r.val) + "</span>";
      card.appendChild(row);
    });
    if (dp.note) {
      const note = document.createElement("div");
      note.className = "date-note";
      note.textContent = fill(dp.note);
      card.appendChild(note);
    }

    $("closing").textContent = fill(C.closing);
    buildRsvp();
  }

  function buildRsvp() {
    const btn = $("rsvpBtn");
    const type = (C.rsvpType || "").toLowerCase();
    if (!type) { btn.classList.add("hidden"); return; }

    const msg = encodeURIComponent(
      fill(C.rsvpPrefilled) + (chosenDate ? " (" + chosenDate + ")" : "")
    );
    let href = "";
    if (type === "whatsapp") {
      href = "https://wa.me/" + (C.rsvpPhone || "").replace(/\D/g, "") + "?text=" + msg;
    } else if (type === "sms") {
      href = "sms:" + (C.rsvpPhone || "") + "?&body=" + msg;
    } else if (type === "email") {
      href = "mailto:" + (C.rsvpEmail || "") +
        "?subject=" + encodeURIComponent("It's a date! 💕") + "&body=" + msg;
    }
    if (!href) { btn.classList.add("hidden"); return; }

    btn.href = href;
    btn.textContent = C.rsvpButton || "Reply 💕";
    btn.classList.remove("hidden");
  }

  /* ---- music ---- */
  let audio = null;
  function setupMusic() {
    if (!C.musicSrc) return;
    audio = new Audio(C.musicSrc);
    audio.loop = true;
    audio.volume = 0.6;
    const toggle = $("musicToggle");
    toggle.classList.remove("hidden");
    toggle.addEventListener("click", () => {
      if (!audio) return;
      if (audio.paused) { audio.play(); toggle.classList.add("playing"); }
      else { audio.pause(); toggle.classList.remove("playing"); }
    });
  }
  function startMusic() {
    if (audio && audio.paused) {
      audio.play().then(() => $("musicToggle").classList.add("playing")).catch(() => {});
    }
  }

  /* ---- floating hearts ---- */
  function startHearts() {
    if (C.floatingHearts === false) return;
    const layer = $("hearts");
    const emojis = ["💗", "💖", "💕", "❤️", "💘"];
    setInterval(() => {
      const h = document.createElement("span");
      h.className = "heart";
      h.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      h.style.left = Math.random() * 100 + "vw";
      h.style.fontSize = 14 + Math.random() * 26 + "px";
      const dur = 6 + Math.random() * 6;
      h.style.animationDuration = dur + "s";
      layer.appendChild(h);
      setTimeout(() => h.remove(), dur * 1000);
    }, 700);
  }

  /* ---- confetti ---- */
  function burstConfetti() {
    const canvas = $("confetti");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const colors = [C.theme && C.theme.accent || "#ff5d8f", "#ffd166", "#06d6a0", "#fff", "#ffadcb"];
    const pieces = [];
    for (let i = 0; i < 140; i++) {
      pieces.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        vx: (Math.random() - 0.5) * 16,
        vy: (Math.random() - 0.5) * 16 - 4,
        size: 5 + Math.random() * 7,
        color: colors[Math.floor(Math.random() * colors.length)],
        rot: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.3,
        life: 0,
      });
    }
    let frame = 0;
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pieces.forEach((p) => {
        p.vy += 0.3;          // gravity
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        p.life++;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, 1 - frame / 140);
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        ctx.restore();
      });
      frame++;
      if (frame < 140) requestAnimationFrame(draw);
      else ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    draw();
  }

  /* ---- init ---- */
  applyTheme();
  buildIntro();
  buildAsk();
  buildPick();
  setupMusic();
  startHearts();
  showScene("scene-intro");
})();
