// Elements
const noBtn = document.getElementById("noBtn");
const hint = document.getElementById("hint");

if (noBtn) {
  const btnRow = noBtn.closest(".btn-row");
  let attempts = 0;

  const messages = [
    "Please think again!",
    "itni jaldi nahi matt bolo",
    "Are you sure? 👀",
    "Last chance...",
    "Okay but… I’m cute tho 😤",
  ];

  const randomWithin = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  function moveNoButton() {
    // make the button position: absolute within the card
    noBtn.classList.add("no-floating");

    const card = document.querySelector(".card");
    const cardRect = card.getBoundingClientRect();

    // keep within card bounds with some padding
    const pad = 10;
    const maxX = cardRect.width - noBtn.offsetWidth - pad;
    const maxY = cardRect.height - noBtn.offsetHeight - pad;

    const x = randomWithin(pad, Math.max(pad, maxX));
    const y = randomWithin(90, Math.max(90, maxY)); // keep away from title

    noBtn.style.transform = `translate(${x}px, ${y}px) rotate(${randomWithin(-8,8)}deg)`;
  }

  function updateHint() {
    if (!hint) return;
    const msg = messages[Math.min(attempts, messages.length - 1)];
    hint.textContent = msg;
  }

  // Start dodging when mouse gets near or user clicks it
  function armDodging() {
    // expand row height so layout doesn't jump when absolute
    if (btnRow) btnRow.style.height = `${Math.max(52, noBtn.offsetHeight)}px`;
    moveNoButton();
    updateHint();
  }

  // Hover avoidance
  noBtn.addEventListener("mouseenter", () => {
    attempts++;
    armDodging();
  });

  // If someone manages to click it, still dodge and tease
  noBtn.addEventListener("click", (e) => {
    e.preventDefault();
    attempts++;
    armDodging();
  });

  // For mobile (touchstart)
  noBtn.addEventListener("touchstart", (e) => {
    e.preventDefault();
    attempts++;
    armDodging();
  });
}
