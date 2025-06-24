function activateSecretFeature() {
  document.body.classList.add("golden");

  const secretText = document.getElementById("secretchange");
  if (secretText) {
    secretText.textContent = "✨ The golden power has awakened! ✨";
  }

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

    if (secretText) {
      secretText.textContent = "There is a secret...";
    }

    document.querySelectorAll('.sparkle').forEach(el => el.remove());
  }, 10000);
}

// 👇 Immediately trigger golden mode when <p> is clicked
document.addEventListener("DOMContentLoaded", () => {
  const secretParagraph = document.getElementById("secretchange");
  if (secretParagraph) {
    secretParagraph.style.cursor = "pointer";
    secretParagraph.title = "Click to unlock the secret...";

    secretParagraph.addEventListener("click", () => {
      activateSecretFeature();
    });
  }
});
