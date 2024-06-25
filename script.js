// const data = [
//   // The first 10 cases from the dataset, converted to JavaScript format
//   // Replace the following with actual data from the CSV file
//   {
//     board: [
//       // Example: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//       // attack_x: 3, attack_y: 4
//     ],
//   },
//   // Add 9 more cases here
// ];

let currentCaseIndex = 0;

function renderBoard(board, attackX, attackY) {
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

    if (cell === 1) {
      cellElement.classList.add("hit");
    } else if (x === attackX && y === attackY) {
      cellElement.classList.add("miss");
    }

    grid.appendChild(cellElement);
  });
}

function showNextCase() {
  if (currentCaseIndex >= data.length) {
    document.getElementById("result").innerText = "No more cases!";
    return;
  }

  const caseData = data[currentCaseIndex];
  renderBoard(caseData.board, caseData.attack_x, caseData.attack_y);

  document.getElementById("result").innerText = `Case ${
    currentCaseIndex + 1
  }: Attack at (${caseData.attack_x}, ${caseData.attack_y})`;
  currentCaseIndex++;
}

document.getElementById("next-case").addEventListener("click", showNextCase);

// Show the first case initially
showNextCase();
