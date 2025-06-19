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

const endingMap = {
  forest: [
    { keywords: ["follow"], ending: "You are forcefully transformed into a forest spirit." },
    { keywords: ["stay"], ending: "A dryad becomes your companion." },
    { keywords: ["explore the hills"], ending: "You are ambushed and mauled to death by wolves." },
    { keywords: ["village"], ending: "You settle down and enjoy a quiet village life." },
    { keywords: ["mushroom", "lie down"], ending: "You fall into a hidden cavern filled with treasure." },
    { keywords: ["mushroom", "water"], ending: "You find some strange water, drink it, then get turned into a fly for eternity." }
  ],
  shrunken: [
    { keywords: ["explore", "hide"], ending: "You accept your tiny fate, but enjoy your new life." },
    { keywords: ["explore", "investigate"], ending: "You are captured by an unkind woman and kept in a jar." },
    { keywords: ["table", "dive"], ending: "You are devoured as part of an unkind woman's breakfast." },
    { keywords: ["table", "down"], ending: "You find a growth ray and return to normal." },
    { keywords: ["hide", "stay"], ending: "The sock is moved, and a caring woman finds you. She then takes care of you and you live together happily ever after." },
    { keywords: ["hide", "run"], ending: "Unaware of your presence, a caring woman accidentally steps on you and crushes you to death." }
  ],
  space: [
    { keywords: ["attack", "pursue"], ending: "You become admiral of the galactic fleet." },
    { keywords: ["attack", "retreat"], ending: "A black hole swallows you whole." },
    { keywords: ["board", "fight"], ending: "You slaughter them all and wipe out their race." },
    { keywords: ["board", "hack"], ending: "Your cybernetics are sabotaged and you have hacked your consciousness away." },
    { keywords: ["evade", "scan"], ending: "You find a loot cache filled with ancient technology, but an ancient god emtombs you for eternity." },
    { keywords: ["evade", "power"], ending: "You retire to a space resort." }
  ]
};

const fallbackEndings = {
  forest: [
    "You fade into obscurity.", "You awaken with no memory of your journey.",
    "The forest forgets your name.", "You live out your days in quiet solitude.",
    "You are never heard from again."
  ],
  shrunken: [
    "You vanish between the floorboards.", "You build a new life out of crumbs.",
    "You're swept into the unknown.", "No one ever knows what happened to you.",
    "You embrace your tiny fate."
  ],
  space: [
    "Your ship drifts forever in silence.", "You fade into the blackness of space.",
    "You are remembered as a mystery.", "Time forgets your mission.",
    "A comet erases all trace of you."
  ]
};

function generateEnding(path) {
  const combined = path.join(" ");
  const options = endingMap[gameState.mode] || [];

  for (const { keywords, ending } of options) {
    if (keywords.every(word => combined.includes(word))) {
      return ending;
    }
  }

  return randomPick(fallbackEndings[gameState.mode] || ["The adventure ends."]);
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

  } else if (gameState.location === "end") {
    const ending = generateEnding(gameState.path);
    storyElement.innerText = ending;
    gameState.location = "choose";
    gameState.path = [];
  } else {
    const handlers = {
      forest: handleForest,
      shrunken: handleShrunken,
      space: handleSpace
    };
    if (handlers[gameState.mode]) {
      handlers[gameState.mode](input);
    }
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
      ]) + " Do you follow the sound, pick a mushroom, or stay on the path?";
} else if (input.includes("walk away")) {
  gameState.location = "forestExit";
  storyElement.innerText = "You turn away from the forest. Do you head to the village or explore the nearby hills?";
}
} else if (gameState.location === "forestExit") {
  if (input.includes("village") || input.includes("hills")) {
    gameState.location = "end";
    storyElement.innerText = generateEnding(gameState.path);
  } else {
    storyElement.innerText = "Do you go to the 'village' or 'explore the hills'?";
  }


  } else if (gameState.location === "deepForest") {
    if (input.includes("follow") || input.includes("stay")) {
      gameState.location = "end";
      storyElement.innerText = generateEnding(gameState.path);
    } else if (input.includes("mushroom")) {
      gameState.location = "mushroomPatch";
      storyElement.innerText = "You pick a mushroom and begin to feel dizzy. Do you lie down or search for water?";
    } else {
      storyElement.innerText = "Do you 'follow', 'stay', or 'pick a mushroom'?";
    }
  } else if (gameState.location === "mushroomPatch") {
    if (input.includes("lie down") || input.includes("water")) {
      gameState.location = "end";
      storyElement.innerText = generateEnding(gameState.path);
    } else {
      storyElement.innerText = "Do you 'lie down' or 'search for water'?";
    }
  }
}

function handleShrunken(input) {
  if (gameState.location === "start") {
    if (input.includes("explore")) {
      gameState.location = "kitchen";
      storyElement.innerText = "You scurry to the kitchen. A shadow moves. Do you hide, investigate, or climb the table?";
    } else if (input.includes("hide")) {
      gameState.location = "hidden";
      storyElement.innerText = "You hide under a sock. Something approaches. Do you run or stay?";
    } else {
      storyElement.innerText = "Do you 'explore' or 'hide'?";
    }
  } else if (gameState.location === "kitchen") {
    if (input.includes("hide") || input.includes("investigate")) {
      gameState.location = "end";
      storyElement.innerText = generateEnding(gameState.path);
    } else if (input.includes("table")) {
      gameState.location = "onTable";
      storyElement.innerText = "You climb up and find a bowl of cereal. Do you dive in or look for a way down?";
    } else {
      storyElement.innerText = "Do you 'hide', 'investigate', or 'climb the table'?";
    }
  } else if (gameState.location === "hidden") {
    if (input.includes("run") || input.includes("stay")) {
      gameState.location = "end";
      storyElement.innerText = generateEnding(gameState.path);
    } else {
      storyElement.innerText = "Do you 'run' or 'stay'?";
    }
  } else if (gameState.location === "onTable") {
    if (input.includes("dive") || input.includes("down")) {
      gameState.location = "end";
      storyElement.innerText = generateEnding(gameState.path);
    } else {
      storyElement.innerText = "Do you 'dive in' or 'look for a way down'?";
    }
  }
}

function handleSpace(input) {
  if (gameState.location === "start") {
    if (input.includes("attack")) {
      gameState.location = "combat";
      storyElement.innerText = "Lasers fire! You hit a ship. Do you pursue, board the enemy, or retreat?";
    } else if (input.includes("evade")) {
      gameState.location = "stealth";
      storyElement.innerText = "You drift through an asteroid field. Do you power down or scan?";
    } else {
      storyElement.innerText = "Do you 'attack' or 'evade'?";
    }
  } else if (gameState.location === "combat") {
    if (input.includes("pursue") || input.includes("retreat")) {
      gameState.location = "end";
      storyElement.innerText = generateEnding(gameState.path);
    } else if (input.includes("board")) {
      gameState.location = "enemyShip";
      storyElement.innerText = "You board the ship. Do you fight the crew or hack the controls?";
    } else {
      storyElement.innerText = "Do you 'pursue', 'board the enemy', or 'retreat'?";
    }
  } else if (gameState.location === "stealth") {
    if (input.includes("scan") || input.includes("power")) {
      gameState.location = "end";
      storyElement.innerText = generateEnding(gameState.path);
    } else {
      storyElement.innerText = "Do you 'scan' or 'power down'?";
    }
  } else if (gameState.location === "enemyShip") {
    if (input.includes("fight") || input.includes("hack")) {
      gameState.location = "end";
      storyElement.innerText = generateEnding(gameState.path);
    } else {
      storyElement.innerText = "Do you 'fight the crew' or 'hack the controls'?";
    }
  }
}

storyElement.innerText = "Choose your adventure: Forest, Shrunken Horror, or Space Battle.";
