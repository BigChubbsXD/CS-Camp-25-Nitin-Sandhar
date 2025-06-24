function activateSecretFeature() {
  document.documentElement.classList.add("golden");

  const container = document.querySelector(".container");
  if (container) {
    container.classList.add("golden"); // ✅ THIS IS REQUIRED
  }

  const secretText = document.getElementById("secretchange");
  if (secretText) {
    secretText.textContent = "You found the secret!";
  }

  // Sparkles...
  for (let i = 0; i < 50; i++) {
    const sparkle = document.createElement("div");
    sparkle.className = "sparkle";
    sparkle.style.left = `${Math.random() * 100}vw`;
    sparkle.style.top = `${Math.random() * 100}vh`;
    sparkle.style.animationDuration = `${1 + Math.random() * 2}s`;
    document.body.appendChild(sparkle);
  }

  setTimeout(() => {
    document.body.classList.remove("golden");

    if (container) {
      container.classList.remove("golden"); // ✅ Clean up
    }

    if (secretText) {
      secretText.textContent = "There is a secret...";
    }

    document.querySelectorAll(".sparkle").forEach(el => el.remove());
  }, 10000);
}

