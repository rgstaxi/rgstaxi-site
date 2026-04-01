(function () {
  const words = [
    "à Savigny-sur-Orge",
    "à Morangis",
    "à Chilly-Mazarin",
    "en Essonne",
    "vers Orly, Roissy et Massy TGV",
    "dans toute l’Île-de-France"
  ];

  const el = document.getElementById("typewriter");
  if (!el) return;

  const isMobile = () => window.matchMedia("(max-width: 767px)").matches;
  let wordIndex = 0;
  let charIndex = 0;
  let deleting = false;
  let timer;

  function loop() {
    const current = words[wordIndex];

    if (isMobile()) {
      el.textContent = current;
      wordIndex = (wordIndex + 1) % words.length;
      timer = setTimeout(loop, 1800);
      return;
    }

    el.textContent = deleting
      ? current.slice(0, charIndex--)
      : current.slice(0, charIndex++);

    let delay = deleting ? 40 : 70;

    if (!deleting && charIndex === current.length + 1) {
      deleting = true;
      delay = 1200;
    } else if (deleting && charIndex < 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      delay = 220;
    }

    timer = setTimeout(loop, delay);
  }

  loop();

  window.addEventListener("beforeunload", function () {
    clearTimeout(timer);
  });
})();

(function () {
  if (!window.emailjs) return;

  try {
    emailjs.init({
      publicKey: "prqbycmPTmlobogg-"
    });
  } catch (e) {}

  const form = document.getElementById("contactForm");
  const successBox = document.getElementById("successBox");
  const errorBox = document.getElementById("errorBox");
  const submitBtn = document.getElementById("submitBtn");

  if (!form || !successBox || !errorBox || !submitBtn) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    successBox.style.display = "none";
    errorBox.style.display = "none";
    submitBtn.disabled = true;
    submitBtn.textContent = "Envoi en cours...";

    emailjs.sendForm(
      "service_gsjkuhs",
      "template_7kkgckt",
      form
    ).then(function () {
      successBox.style.display = "block";
      form.reset();
    }).catch(function (error) {
      console.error("EmailJS error:", error);
      errorBox.style.display = "block";
    }).finally(function () {
      submitBtn.disabled = false;
      submitBtn.textContent = "Envoyer la demande";
    });
  });
})();
