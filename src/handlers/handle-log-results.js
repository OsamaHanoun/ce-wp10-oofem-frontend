export default function handleLogResultsButton() {
  document.getElementById("btn-log-results").disabled = true;

  document.getElementById("btn-log-results").addEventListener("click", () => {
    const log = document.querySelector("#log");
    const message = document.createElement("p");
    const d = new Date();
    const time = `[ ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()} ]`;
    message.innerHTML = time + generateStructureListing();
    log.appendChild(message);
  });
}

function generateStructureListing() {
  const data = JSON.parse(sessionStorage.getItem("downloadFile"));

  return `Listing analysis results:

  Displacements
  <table>
  <tr>
    <th>idx</th>
    <th>u1</th>
    <th>u2</th>
    <th>u3</th>
  </tr>
  ${data.nodes.reduce(
    (accumulator, node) =>
      accumulator +
      `<tr><td>${node.id}</td><td>${node.displacement.u1}</td><td>${node.displacement.u2}</td><td>${node.displacement.u3}</td></tr>`,
    ""
  )}
</table>

Element forces
<table>
  <tr>
    <th>element</th>
    <th>force</th>
  </tr>
  ${data.elements.reduce(
    (accumulator, element) =>
      accumulator +
      `<tr><td>${element.id}</td><td>${element.axialForce}</td></tr>`,
    ""
  )}
</table>`;
}
