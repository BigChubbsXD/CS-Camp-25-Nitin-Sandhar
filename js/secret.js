function activateSecretFeature() {
  // Apply 'golden' mode to html and body
  document.documentElement.classList.add("golden");
  document.body.classList.add("golden");

  const container = document.querySelector(".container");
  if (container) {
    container.classList.add("golden");
  }

  const secretText = document.getElementById("secretchange");
  if (secretText) {
    secretText.textContent = "You found the secret!";
  }

  // Create sparkles
  for (let i = 0; i < 50; i++) {
    const sparkle = document.createElement("div");
    sparkle.className = "sparkle";
    sparkle.style.left = `${Math.random() * 100}vw`;
    sparkle.style.top = `${Math.random() * 100}vh`;
    sparkle.style.animationDuration = `${1 + Math.random() * 2}s`;
    document.body.appendChild(sparkle);
  }

  // Revert golden mode after 10 seconds
  setTimeout(() => {
    document.documentElement.classList.remove("golden");
    document.body.classList.remove("golden");

    if (container) {
      container.classList.remove("golden");
    }

    if (secretText) {
      secretText.textContent = "secret...";
    }

    document.querySelectorAll(".sparkle").forEach(el => el.remove());
  }, 10000);
}

// Add click listener after DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  const secretText = document.getElementById("secretchange");
  if (secretText) {
    secretText.style.cursor = "pointer";
    secretText.style.pointerEvents = "auto";
    secretText.addEventListener("click", activateSecretFeature);
  } else {
    console.warn("#secretchange not found in DOM");
  }
});
