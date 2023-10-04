import runVisualizer from "../../visualize";

export default function handleVisualizeResultsButton() {
  document.getElementById("btn-visualize-results").disabled = true;

  document
    .getElementById("btn-visualize-results")
    .addEventListener("click", () => runVisualizer("results"));
}
