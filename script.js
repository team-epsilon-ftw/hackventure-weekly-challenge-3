let currentCaseIndex = 0;
let attackPosition = null;
let boardData = [];

// Fetch the CSV data
fetch("high_quality_boards.csv")
  .then((response) => response.text())
  .then((text) => {
    const rows = text.trim().split("\n").slice(1); // Skip header row
    const size = 8; // Ensure the board is 8x8
    for (let i = 0; i < rows.length; i += size) {
      const board = [];
      for (let j = 0; j < size; j++) {
        board.push(rows[i + j].split(",").map((cell) => cell.trim()));
      }
      boardData.push(board);
    }
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

  board.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      const cellElement = document.createElement("div");
      cellElement.className = "cell";

      if (cell === "S") {
        cellElement.classList.add("hit");
      } else if (cell === "M") {
        cellElement.classList.add("miss");
      }

      cellElement.addEventListener("click", () => {
        if (attackPosition) {
          attackPosition.element.classList.remove("selected");
        }
        attackPosition = { x: rowIndex, y: colIndex, element: cellElement };
        cellElement.classList.add("selected");
      });

      grid.appendChild(cellElement);
    });
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

    // Mark the cell as a miss
    attackPosition.element.classList.add("miss");
    attackPosition.element.classList.remove("selected");
    attackPosition = null;
  } else {
    alert("Please select an attack position before saving.");
  }
}

document.getElementById("next-case").addEventListener("click", showNextCase);
document
  .getElementById("save-recommendation")
  .addEventListener("click", saveRecommendation);

// Show the first case initially
showNextCase();
