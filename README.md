# 💖 My Date Helper

A personal, interactive "ask her out" web page — inspired by [PlanYour.Date](https://planyour.date/),
but fully yours to customize. One link, no app to download.

**The flow she sees:**

1. **Intro** — your messages fade in one line at a time.
2. **The question** — a big *Yes* button… and a *No* button that shrinks and runs away. 😏
3. **Pick a day** — she chooses from the dates you offer.
4. **The reveal** — a flight-ticket "boarding pass" confirming her tickets (her city → your city)
   will be booked for the day she picked, plus your date plan and a one-tap reply button.

---

## ✏️ How to customize (the only file you edit: `config.js`)

Open **`config.js`** in any text editor. Everything is labeled and grouped:

| Section | What it controls |
|---|---|
| 1. The basics | Your name, her name, browser tab title |
| 2. The opening | The intro lines that fade in |
| 3. The big question | The question + the playful "No" button taunts |
| 4. After "Yes" | The day options she can pick from |
| 5. The reveal | **Intercity flight message** (her city → your city), the date plan, closing line |
| 6. Look & feel | Theme colors |
| 7. Music | Optional background song |

Only change the text **inside the quotes** `"like this"`. Keep the quotes, commas, and brackets.

**Placeholders** that fill in automatically: `{her}`, `{you}`, `{fromCity}`, `{toCity}`, `{date}`.

### Intercity setup
In section 5, set the cities. If you both live in the same city, set
`intercity.enabled` to `false` and the flight card disappears.

```js
intercity: {
  enabled: true,
  herCity: "Lagos",
  yourCity: "Abuja",
},
```

### The reply button
In section 5, set `rsvpType` to `"whatsapp"`, `"sms"`, `"email"`, or `""` (none).
For WhatsApp/SMS, put your number in `rsvpPhone` (country code + number, digits only).

### Music (optional)
Drop a file named `song.mp3` next to `config.js` and set `musicSrc: "song.mp3"`.
Browsers only allow audio after a tap — it starts when she taps the first button,
and there's a ♪ toggle in the corner.

---

## 👀 Preview it on your computer

Just open `index.html` in your browser. (Or, for music to load reliably, run a tiny local server:)

```bash
cd "My Date Helper"
python3 -m http.server 8000
# then visit http://localhost:8000
```

---

## 🌐 Put it online & get a shareable link (free)

Pick one — all free, no coding:

- **Netlify Drop** — go to [app.netlify.com/drop](https://app.netlify.com/drop) and drag this whole
  folder in. You instantly get a link to send her.
- **GitHub Pages** — push these files to a repo, enable Pages in Settings → Pages.
- **Vercel** — `npx vercel` in this folder.

Then send her the link. That's it. 🎉

---

## Files

- `config.js` — **edit this** (all your content)
- `index.html` — page structure
- `styles.css` — styling/theme
- `script.js` — the interactive logic (no need to touch)
