/*
function activateSecretFeature() {
  document.body.classList.add("golden");

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
    document.querySelectorAll('.sparkle').forEach(el => el.remove());
  }, 10000);
}

document.addEventListener("keydown", () => {
  const input = prompt("Enter the secret command:");
  if (input && input.toLowerCase() === "secret") {
    activateSecretFeature();
  }
});
*/