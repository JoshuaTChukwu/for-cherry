/* =========================================================================
   💖  MY DATE HELPER — YOUR PERSONAL "ASK HER OUT" PAGE
   =========================================================================
   This is the ONLY file you need to edit. Change the text between the
   quotes "like this" to make the page yours. Don't remove the quotes,
   commas, or brackets — just swap the words inside them.

   Tip: lines starting with //  are notes to you and are ignored by the page.
   ========================================================================= */

const CONFIG = {

  /* ---------------------------------------------------------------------
     1. THE BASICS — who's asking who
     --------------------------------------------------------------------- */
  yourName: "Joshua",
  herName: "Cherry",

  // Shown in the browser tab.
  pageTitle: "A little question for you… 💌",


  /* ---------------------------------------------------------------------
     2. THE OPENING — messages that fade in one by one before the question.
     Add or remove lines. Keep each one in "quotes" and end with a comma.
     --------------------------------------------------------------------- */
  intro: [
    "Hey {her}…",
    "I've been wanting to ask you something.",
    "I kept rehearsing it in my head,",
    "so I figured I'd just build you a whole page instead. 😅",
  ],

  // Text on the button that moves from the intro to the big question.
  startButton: "Okay, ask me 👀",


  /* ---------------------------------------------------------------------
     3. THE BIG QUESTION
     --------------------------------------------------------------------- */
  question: "Will you go on a date with me?",

  yesButton: "Yes 💕",
  noButton: "No",

  // The NO button dodges the cursor and shrinks. Each time she tries,
  // it shows the next playful line. It loops back to the start after the last.
  noTaunts: [
    "No",
    "Are you sure? 🥺",
    "Think again…",
    "Don't do me like that 😭",
    "The button is getting shy",
    "It's basically a yes at this point",
    "Just press the green one ❤️",
  ],


  /* ---------------------------------------------------------------------
     4. AFTER "YES" — she picks a day that works for her.
     Add or remove options. Each "when" is what shows on the flight ticket.
     --------------------------------------------------------------------- */
  yesTitle: "YESSS! 🎉",
  yesMessage: "You just made my whole week, {her}. Now pick the day that works for you:",

  availableDates: [
    { label: "Friday",   when: "Fri, Jun 26 · 7:00 PM" },
    { label: "Saturday", when: "Sat, Jun 27 · 7:00 PM" },
    { label: "Sunday",   when: "Sun, Jun 28 · 2:00 PM" },
  ],


  /* ---------------------------------------------------------------------
     5. THE REVEAL — shown after she picks a day.
     Set intercity.enabled to false if you're in the same city (hides flights).
     Use {date}, {fromCity}, {toCity}, {her} as placeholders — they fill in
     automatically.
     --------------------------------------------------------------------- */
  intercity: {
    enabled: true,
    herCity: "Abuja",
    yourCity: "Lagos",
  },

  // The flight-ticket confirmation message. Shown like a boarding pass.
  flightTitle: "✈️  Tickets on the way",
  flightMessage: "Don't worry about a thing — your flight tickets from {fromCity} to {toCity} will be booked for {date}. Just pack a bag and show up. ✨",

  datePlan: {
    what: "A beach day, just like we talked about 🏖️",
    where: "Landmark type of beach in Lagos, well its a surprise, but I promise you'll love it! 😍",
    dressCode: "Beach-ready & comfy — bring shades, I've got the rest 😎",
    note: "Sun, sand, good food and you. I'll handle everything else — just show up and look incredible.",
  },

  closing: "Can't wait to see you, {her}. 💕",

  // A button so she can reply instantly. Pick ONE style below by setting
  // `rsvpType` to "whatsapp", "sms", "email", or "" (to hide the button).
  rsvpType: "whatsapp",
  rsvpButton: "Tell me yes again 😄",
  rsvpPhone: "+2348143173379",            // your number, country code + number, digits only (for whatsapp/sms)
  rsvpEmail: "jchukwu61@gmail.com",       // used only if rsvpType is "email"
  rsvpPrefilled: "Yes! I'd love to go on that date 💕",


  /* ---------------------------------------------------------------------
     5. LOOK & FEEL — theme colors
     Use any color (hex like "#ff5d8f" or names like "crimson").
     --------------------------------------------------------------------- */
  theme: {
    background1: "#1a0b2e",   // top of the background gradient
    background2: "#3d1a4d",   // bottom of the background gradient
    accent: "#ff5d8f",        // hearts, buttons, highlights
    yesColor: "#2ecc71",      // the YES button
    textColor: "#fff5f8",     // main text
  },


  /* ---------------------------------------------------------------------
     6. MUSIC (optional)
     Put a song file named "song.mp3" next to this file, OR paste a direct
     link to an .mp3 below. Leave "" for no music.
     (Browsers require a tap before audio plays — the page handles that.)
     --------------------------------------------------------------------- */
  musicSrc: "",   // e.g. "song.mp3"


  /* ---------------------------------------------------------------------
     7. FLOATING HEARTS — set to false to turn off the background hearts.
     --------------------------------------------------------------------- */
  floatingHearts: true,
};
