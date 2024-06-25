let currentCaseIndex = 0;
let attackPosition = null;
let boardData = [];

// Fetch the CSV data
fetch("high_quality_boards.csv")
  .then((response) => response.text())
  .then((text) => {
    const rows = text.trim().split("\n").slice(1); // Skip header row
    boardData = rows.map((row) => row.split(",").map((cell) => cell.trim()));
    showNextCase(); // Automatically show the first case once data is loaded
  })
  .catch((error) => {
    console.error("Error fetching the CSV file:", error);
  });

function renderBoard(board) {
  const container = document.getElementById("board-container");
  container.innerHTML = "";

  const grid = document.createElement("div");
  grid.className = "grid";
  container.appendChild(grid);

  board.forEach((cell, index) => {
    const cellElement = document.createElement("div");
    cellElement.className = "cell";
    const x = Math.floor(index / 8);
    const y = index % 8;

    if (cell === "S") {
      cellElement.classList.add("hit");
    }

    cellElement.addEventListener("click", () => {
      if (attackPosition) {
        attackPosition.element.classList.remove("miss");
      }
      attackPosition = { x, y, element: cellElement };
      cellElement.classList.add("miss");
    });

    grid.appendChild(cellElement);
  });
}

function showNextCase() {
  if (currentCaseIndex >= boardData.length) {
    document.getElementById("result").innerText = "No more cases!";
    return;
  }

  const caseData = boardData[currentCaseIndex];
  renderBoard(caseData);

  document.getElementById("result").innerText = `Case ${currentCaseIndex + 1}`;
  currentCaseIndex++;
  attackPosition = null;
}

function saveRecommendation() {
  if (attackPosition) {
    const output = document.getElementById("output");
    const recommendation = `Case ${currentCaseIndex}: Attack at (${attackPosition.x}, ${attackPosition.y})\n`;
    output.value += recommendation;
  } else {
    alert("Please select an attack position before saving.");
  }
}

document.getElementById("next-case").addEventListener("click", showNextCase);
document
  .getElementById("save-recommendation")
  .addEventListener("click", saveRecommendation);
