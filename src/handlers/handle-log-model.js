export default function handleLogModelButton() {
  document.getElementById("btn-log-model").disabled = true;

  document.getElementById("btn-log-model").addEventListener("click", () => {
    const log = document.querySelector("#log");
    const message = document.createElement("p");
    const d = new Date();
    const time = `[ ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()} ]`;
    message.innerHTML = time + generateStructureListing();
    log.appendChild(message);
  });
}

function generateStructureListing() {
  const data = JSON.parse(sessionStorage.getItem("uploadedFile"));

  return `Listing structure:

Nodes
<table>
  <tr>
    <th>idx</th>
    <th>x1</th>
    <th>x2</th>
    <th>x3</th>
  </tr>
  ${data.nodes.reduce(
    (accumulator, node) =>
      accumulator +
      `<tr><td>${node.id}</td><td>${node.x1}</td><td>${node.x2}</td><td>${node.x3}</td></tr>`,
    ""
  )}
</table>

Constraints
<table>
  <tr>
    <th>node</th>
    <th>u1</th>
    <th>u2</th>
    <th>u3</th>
  </tr>
  ${data.nodes.reduce((accumulator, node) => {
    if (node["constraint-id"]) {
      const constraint = data.constraints.find(
        (constraint) => node["constraint-id"] === constraint.id
      );
      return (
        accumulator +
        `<tr><td>${node.id}</td><td>${booleanToFixedOrFree(
          constraint.u1
        )}</td><td>${booleanToFixedOrFree(
          constraint.u2
        )}</td><td>${booleanToFixedOrFree(constraint.u3)}</td></tr>`
      );
    } else {
      return accumulator;
    }
  }, "")}
</table>

Forces
<table>
  <tr>
    <th>node</th>
    <th>r1</th>
    <th>r2</th>
    <th>r3</th>
  </tr>
  ${data.nodes.reduce((accumulator, node) => {
    if (node["force-id"]) {
      const force = data.forces.find((force) => node["force-id"] === force.id);

      return (
        accumulator +
        `<tr><td>${node.id}</td><td>${force.r1}</td><td>${force.r2}</td><td>${force.r3}</td></tr>`
      );
    } else {
      return accumulator;
    }
  }, "")}
</table>`;
}
function booleanToFixedOrFree(boolean) {
  return boolean ? "free" : "fixed";
}
