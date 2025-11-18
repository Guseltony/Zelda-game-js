document.addEventListener("DOMContentLoaded", gameFunctionality);

function gameFunctionality() {
  const grid = document.querySelector(".grid");
  const scoreDisplay = document.querySelector(".score");
  const levelDisplay = document.querySelector(".level");
  const enemyDisplay = document.querySelector(".enemies");

  const width = 10;
  const tileSize = 48;

  const squares = [];
  let score = 0;
  let level = 0;
  let playerPosition = 40;
  let enemies = [];
  let playerDirection = "right";
  let gameRunning = true;

  // y,w,x,z = corner walls | a,b = side walls | createBoard,d = top/bottom walls;
  // ) = lanterns | ( = fire pots) | % = left door | ^ = top door | $ = stairs
  // * = slicer enemy | } = skeletor enemy | (space) = empty walkable area

  const maps = [
    // level 1 layout
    [
      "ycc)cc^ccw",
      "a        b",
      "a      * b",
      "a   (    b",
      "%        b",
      "a   (    b",
      "a  *     b",
      "a        b",
      "xdd)dd)ddz",
    ],

    // level two layout

    [
      "yccccccccw",
      "a        b",
      ")        )",
      "a        b",
      "a        b",
      "a    $   b",
      ")   }    )",
      "a        b",
      "xddddddddz",
    ],
  ];

  function createBoard() {
    const currentMap = maps[level];

    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 10; j++) {
        const square = document.createElement("div");
        square.setAttribute("id", i * width + j);

        const char = currentMap[i][j];

        addMapElement(square, char, j, i);

        grid.appendChild(square);
        squares.push(square);
      }
    }
    createPlayer();
  }

  createBoard();

  function addMapElement(square, char, x, y) {
    switch (char) {
      case "a":
        square.classList.add("left-wall");
        break;
      case "b":
        square.classList.add("right-wall");
        break;
      case "c":
        square.classList.add("top-wall");
        break;
      case "d":
        square.classList.add("bottom-wall");
        break;
      case "w":
        square.classList.add("top-right-wall");
        break;
      case "x":
        square.classList.add("bottom-left-wall");
        break;
      case "y":
        square.classList.add("top-left-wall");
        break;
      case "z":
        square.classList.add("bottom-right-wall");
        break;
      case "%":
        square.classList.add("left-door");
        break;
      case "^":
        square.classList.add("top-door");
        break;
      case "$":
        square.classList.add("stairs");
        break;
      case ")":
        square.classList.add("lanterns");
        break;
      case "(":
        square.classList.add("fire-pot");
        break;
      case "*":
        createSlicer(x, y);
        break;
      case "}":
        createSkeletor(x, y);
        break;
    }
  }

  function createPlayer() {
    const playerElement = document.createElement("div");
    playerElement.className = "link-going-right";
    playerElement.id = "player";
    playerElement.style.left = `${(playerPosition % width) * tileSize}px`;
    playerElement.style.top = `${
      Math.floor(playerPosition / width) * tileSize
    }px`;
    grid.appendChild(playerElement);
  }

  function createSlicer(x, y) {
    const slicerElement = document.createElement("div");
    slicerElement.classList.add("slicer");
    slicerElement.style.left = `${x * tileSize}px`;
    slicerElement.style.top = `${y * tileSize}px`;

    const slicer = {
      x,
      y,
      sirection: -1,
      type: "slicer",
      slicerElement,
    };

    enemies.push(slicer);

    grid.appendChild(slicerElement);
  }

  function createSkeletor(x, y) {
    const skeletorElement = document.createElement("div");
    skeletorElement.classList.add("skeletor");
    skeletorElement.style.left = `${x * tileSize}px`;
    skeletorElement.style.top = `${y * tileSize}px`;

    const skeletor = {
      x,
      y,
      direction: -1,
      timer: Math.random() * 5,
      type: "skeletor",
      skeletorElement,
    };

    enemies.push(skeletor);
    grid.appendChild(skeletorElement);
  }
}
