/*
$( document ).ready(function() {
    $('#btn').click(function() {
        window.alert("DID YOU JUST CLICK ME?!");
    });
});
*/
function buttonResult() {
  const input = document.getElementById("devmode").value;
   if (input.trim() === "") {
    alert("Please enter a command.");
    return;
  }
  try {
    const result = eval(input); // Evaluate the JS code
    if (result !== undefined) {
      console.log(result); // Log results like 2 + 2
      alert("Result: " + result);
    } else {
      alert("Executed: " + input);
    }
  } catch (e) {
    alert("Error: " + e.message);
  }
}

let gameState = {
  location: "start",
};

const storyElement = document.getElementById("story");
const inputElement = document.getElementById("storymode");

function processInput() {
  const input = inputElement.value.toLowerCase().trim();
  inputElement.value = "";

  if (gameState.location === "start") {
    if (input.includes("left")) {
      gameState.location = "forest";
      storyElement.innerText = "You enter a dark forest. A wolf howls in the distance.";
    } else if (input.includes("right")) {
      gameState.location = "cave";
      storyElement.innerText = "You walk into a damp cave. You hear something move.";
    } else {
      storyElement.innerText = "You stand still. Choose to go 'left' or 'right'.";
    }

  } else if (gameState.location === "forest") {
    if (input.includes("run")) {
      storyElement.innerText = "You run through the forest and escape safely.";
      gameState.location = "end";
    } else if (input.includes("fight")) {
      storyElement.innerText = "You fight the wolf and win! You're a hero!";
      gameState.location = "end";
    } else {
      storyElement.innerText = "The wolf approaches. You must 'run' or 'fight'.";
    }

  } else if (gameState.location === "cave") {
    if (input.includes("light")) {
      storyElement.innerText = "You light a torch and see treasure!";
      gameState.location = "end";
    } else if (input.includes("sneak")) {
      storyElement.innerText = "You sneak past a sleeping dragon.";
      gameState.location = "end";
    } else {
      storyElement.innerText = "It's too dark. Try 'light' or 'sneak'.";
    }

  } else if (gameState.location === "end") {
    storyElement.innerText = "The adventure ends here. Refresh to play again.";
  }
}

// Start game
storyElement.innerText = "You stand at a fork in the road. Do you go left or right?";






