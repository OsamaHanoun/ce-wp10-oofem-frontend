export default function iniVisualizerHandlers() {
  exitButton();
}

function exitButton() {
  document
    .getElementById("visualizer-btn-exit")
    .addEventListener("click", () => {
      document.getElementById("renderer-container").textContent = "";
    });
}
