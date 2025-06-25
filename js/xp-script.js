// xp-script.js

let dragging = false;
let offsetX, offsetY;
const xpWindow = document.getElementById("xp-window");
const startMenu = document.getElementById("xp-start-menu");
const clock = document.getElementById("xp-clock");
const startButton = document.querySelector(".xp-start-button");

function openWindow(title) {
  const titleBar = document.getElementById("xp-window-title");
  const contentContainer = document.getElementById("xp-window-content-container");

  titleBar.textContent = title;
  xpWindow.classList.remove("hidden");
  xpWindow.style.left = "100px";
  xpWindow.style.top = "100px";

  if (title === "My Computer") {
    contentContainer.innerHTML = `
      <div class="my-computer-window">
        <div class="drive"><img src="images/hdd-icon.png" /> Local Disk (C:)</div>
        <div class="drive"><img src="images/hdd-icon.png" /> Local Disk (D:)</div>
        <div class="drive"><img src="images/hdd-icon.png" /> DVD Drive (E:)</div>
        <div class="drive"><img src="images/folder-icon.png" /> Shared Documents</div>
        <div class="drive"><img src="images/folder-icon.png" /> User's Documents</div>
      </div>`;
  } else if (title === "Recycle Bin") {
    contentContainer.innerHTML = `
      <div class="recycle-bin-window">
        <div class="recycle-item"><img src="images/file-icon.png" /> notes.txt</div>
        <div class="recycle-item"><img src="images/file-icon.png" /> photo.png</div>
        <div class="recycle-item"><img src="images/file-icon.png" /> old_resume.doc</div>
        <button class="empty-bin-button">Empty Recycle Bin</button>
      </div>`;
  } else if (title === "My Documents") {
    contentContainer.innerHTML = "<p style='padding-left: 16px;'>Documents folder is currently empty.</p>";
  } else if (title === "My Recent Documents") {
    contentContainer.innerHTML = "<ul style='padding-left: 16px;'><li>report.docx</li><li>notes.txt</li><li>budget.xlsx</li></ul>";
  } else if (title === "My Pictures") {
    contentContainer.innerHTML = "<p style='padding-left: 16px;'>No pictures found. Try importing some!</p>";
  } else if (title === "My Music") {
    contentContainer.innerHTML = "<p style='padding-left: 16px;'>Music library is not yet set up.</p>";
  } else if (title === "Control Panel") {
    contentContainer.innerHTML = "<p style='padding-left: 16px;'>Control Panel is under construction.</p>";
  } else if (title === "Printers and Faxes") {
    contentContainer.innerHTML = "<p style='padding-left: 16px;'>No printers or faxes installed.</p>";
  } else if (title === "Run") {
    contentContainer.innerHTML = `
      <div style='padding-left: 16px;'>
        <p>Type the name of a program, folder, document, or internet resource.</p>
        <input type="text" placeholder="e.g., calc" style="width: 90%; margin-bottom: 6px;" />
        <button onclick="alert('Command not found.')">OK</button>
      </div>`;
  } else if (
    [
      "Internet Explorer", "Outlook Express", "Windows Media Player", "MSN",
      "Windows Messenger", "Tour Windows XP", "Files and Settings Transfer Wizard"
    ].includes(title)
  ) {
    contentContainer.innerHTML = `
      <div style="padding-left: 16px;">
        <p><strong>${title}</strong> has been uninstalled.</p>
        <p>This feature is no longer available on this system.</p>
      </div>`;
  } else {
    contentContainer.innerHTML = `<p style='padding-left: 16px;'>This is a placeholder app window.</p>`;
  }
}


function confirmExit() {
  if (confirm("Are you sure you want to exit to the website?")) {
    window.location.href = "index3.html";
  }
}

function closeWindow(event) {
  event?.stopPropagation(); // prevent event bubbling from breaking things
  xpWindow.classList.add("hidden");
}

function toggleStartMenu(event) {
  event?.stopPropagation(); // prevent closing immediately after opening
  startMenu.classList.toggle("hidden");
}

document.addEventListener("click", (e) => {
  if (!startMenu.contains(e.target) && !startButton.contains(e.target)) {
    startMenu.classList.add("hidden");
  }
});

function startDrag(e) {
  dragging = true;
  const rect = xpWindow.getBoundingClientRect();
  offsetX = e.clientX - rect.left;
  offsetY = e.clientY - rect.top;

  document.addEventListener("mousemove", drag);
  document.addEventListener("mouseup", stopDrag);
}

function drag(e) {
  if (dragging) {
    xpWindow.style.left = `${e.clientX - offsetX}px`;
    xpWindow.style.top = `${e.clientY - offsetY}px`;
  }
}

function stopDrag() {
  dragging = false;
  document.removeEventListener("mousemove", drag);
  document.removeEventListener("mouseup", stopDrag);
}

function updateClock() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12;
  hours = hours === 0 ? 12 : hours;
  const hoursStr = hours.toString().padStart(2, '0');

  clock.textContent = `${hoursStr}:${minutes} ${ampm}`;
}

setInterval(updateClock, 1000);
updateClock();

document.getElementById("logoff-button").addEventListener("click", () => {
  const popup = document.getElementById("logout-popup");
  const popupContent = document.getElementById("logout-popup-content");

  popup.classList.remove("hidden");
  popupContent.textContent = "Logging out...";

  setTimeout(() => {
    popupContent.textContent = "Returning to website...";
  }, 1000);

  setTimeout(() => {
    window.location.href = "index3.html"; // Change to your desired URL if needed
  }, 2000);
});


document.getElementById("shutdown-button").addEventListener("click", () => {
  const confirmed = confirm("Are you sure you want to turn off the computer?");
  if (confirmed) {
    window.close();

    // Fallback for when `window.close()` is blocked
    alert("Unable to close the window. Please close the tab manually.");
  }
});
