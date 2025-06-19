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
  location: "choose",
  mode: null,
  path: []
};

const storyElement = document.getElementById("story");
const inputElement = document.getElementById("storymode");

function randomPick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateEnding(path) {
  let seed = path.join("-");

  const forestEndings = [
    "You become one with the forest spirits.", "A dryad gifts you eternal life in the woods.", "You are crowned guardian of the glade.",
    "You fall into a hidden cavern filled with treasure.", "A tree swallows you whole, and you sleep forever.",
    "You tame a wolf pack and live among them.", "A talking owl leads you to a magical library.", "You discover an ancient ruin and awaken an old god.",
    "You transform into a tree and watch centuries pass.", "You catch a glimpse of the forest's heart crystal."
  ];
  while (forestEndings.length < 100) forestEndings.push(`Forest Ending #${forestEndings.length + 1}`);

  const shrunkenEndings = [
    "You get adopted by a colony of ants.", "A dust bunny becomes your loyal mount.", "You pilot a toy car into the sunset.",
    "You are discovered and rescued by scientists.", "You become ruler of the bug world.",
    "A giant human almost steps on you but turns away.", "You build a shelter from cereal crumbs.", "A cat becomes your nemesis.",
    "You find a portal under the couch.", "You tame a house centipede for transport."
  ];
  while (shrunkenEndings.length < 100) shrunkenEndings.push(`Shrunken Ending #${shrunkenEndings.length + 1}`);

  const spaceEndings = [
    "You become admiral of the galactic fleet.", "A black hole teleports you to another universe.", "You form a truce with alien invaders.",
    "Your AI co-pilot betrays you.", "You discover a Dyson sphere.",
    "You crash on a desert planet and adapt.", "You uncover an ancient alien signal.", "You save Earth from destruction.",
    "You join a space rebellion.", "You are cloned by an alien species."
  ];
  while (spaceEndings.length < 100) spaceEndings.push(`Space Ending #${spaceEndings.length + 1}`);

  let index = 0;
  if (path.includes("follow")) index = 0;
  else if (path.includes("stay")) index = 1;
  else if (path.includes("walk away")) index = 2;
  else index = seed.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0);

  if (gameState.mode === "forest") return forestEndings[index % forestEndings.length];
  if (gameState.mode === "shrunken") {
    if (path.includes("explore") && path.includes("hide")) index = 0;
    else if (path.includes("explore") && path.includes("investigate")) index = 1;
    else if (path.includes("hide") && path.includes("run")) index = 2;
    else if (path.includes("hide") && path.includes("stay")) index = 3;
    else index = seed.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
    return shrunkenEndings[index % shrunkenEndings.length];
  }
  if (gameState.mode === "space") {
    if (path.includes("attack") && path.includes("pursue")) index = 0;
    else if (path.includes("attack") && path.includes("retreat")) index = 1;
    else if (path.includes("evade") && path.includes("scan")) index = 2;
    else if (path.includes("evade") && path.includes("power")) index = 3;
    else index = seed.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
    return spaceEndings[index % spaceEndings.length];
  }
  return "The adventure ends.";
}

function processInput() {
  const input = inputElement.value.toLowerCase().trim();
  inputElement.value = "";
  gameState.path.push(input);

  if (gameState.location === "choose") {
    if (input.includes("forest")) {
      gameState.mode = "forest";
      gameState.location = "start";
      storyElement.innerText = "You awaken at the edge of a misty forest. Do you enter or walk away?";
    } else if (input.includes("shrunken")) {
      gameState.mode = "shrunken";
      gameState.location = "start";
      storyElement.innerText = "You're the size of a bug in your own house. Do you hide or explore?";
    } else if (input.includes("space")) {
      gameState.mode = "space";
      gameState.location = "start";
      storyElement.innerText = "You're piloting a starfighter. Enemy ships are closing in. Do you attack or evade?";
    } else {
      storyElement.innerText = "Choose your adventure: Forest, Shrunken Horror, or Space Battle.";
    }

  } else if (gameState.mode === "forest") {
    handleForest(input);
  } else if (gameState.mode === "shrunken") {
    handleShrunken(input);
  } else if (gameState.mode === "space") {
    handleSpace(input);
  } else if (gameState.location === "end") {
    storyElement.innerText = generateEnding(gameState.path);
    gameState.location = "choose";
    gameState.path = [];
  }
}

function handleForest(input) {
  if (gameState.location === "start") {
    if (input.includes("enter")) {
      gameState.location = "deepForest";
      storyElement.innerText = randomPick([
        "A deer watches you silently.",
        "You find glowing mushrooms.",
        "Whispers echo through the trees."
      ]) + " Do you follow the sound or stay on the path?";
    } else if (input.includes("walk away")) {
      gameState.location = "end";
      storyElement.innerText = generateEnding(gameState.path);
    } else {
      storyElement.innerText = "Do you 'enter' or 'walk away'?";
    }
  } else if (gameState.location === "deepForest") {
    if (input.includes("follow") || input.includes("stay")) {
      gameState.location = "end";
      storyElement.innerText = generateEnding(gameState.path);
    } else {
      storyElement.innerText = "Do you 'follow' or 'stay'?";
    }
  }
}

function handleShrunken(input) {
  if (gameState.location === "start") {
    if (input.includes("explore")) {
      gameState.location = "kitchen";
      storyElement.innerText = "You scurry to the kitchen. A shadow moves. Do you hide or investigate?";
    } else if (input.includes("hide")) {
      gameState.location = "hidden";
      storyElement.innerText = "You hide under a sock. Something approaches. Do you run or stay?";
    } else {
      storyElement.innerText = "Do you 'explore' or 'hide'?";
    }
  } else if (gameState.location === "kitchen" || gameState.location === "hidden") {
    if (input.includes("hide") || input.includes("investigate") || input.includes("run") || input.includes("stay")) {
      gameState.location = "end";
      storyElement.innerText = generateEnding(gameState.path);
    } else {
      storyElement.innerText = "Choose a response: 'hide', 'investigate', 'run', or 'stay'.";
    }
  }
}

function handleSpace(input) {
  if (gameState.location === "start") {
    if (input.includes("attack")) {
      gameState.location = "combat";
      storyElement.innerText = "Lasers fire! You hit a ship. Do you pursue or retreat?";
    } else if (input.includes("evade")) {
      gameState.location = "stealth";
      storyElement.innerText = "You drift through an asteroid field. Do you power down or scan?";
    } else {
      storyElement.innerText = "Do you 'attack' or 'evade'?";
    }
  } else if (gameState.location === "combat" || gameState.location === "stealth") {
    if (input.includes("pursue") || input.includes("retreat") || input.includes("scan") || input.includes("power")) {
      gameState.location = "end";
      storyElement.innerText = generateEnding(gameState.path);
    } else {
      storyElement.innerText = "Choose a response: 'pursue', 'retreat', 'scan', or 'power down'.";
    }
  }
}

// Initial prompt
storyElement.innerText = "Choose your adventure: Forest, Shrunken Horror, or Space Battle.";
