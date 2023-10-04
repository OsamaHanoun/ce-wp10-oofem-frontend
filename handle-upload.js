import log from "./src/logger";
//function to read the user uploaded file
import Ajv from "ajv";
import runVisualizer from "./visualize";
let file = "";
const schema = {
  $id: "truss-structure",
  title: "truss-structure",
  type: "object",
  additionalProperties: false,
  required: ["nodes", "elements", "constraints", "forces"],
  properties: {
    title: {
      type: "string",
      description: "A title of the structure",
    },
    description: {
      type: "string",
      description: "A description of the structure",
    },
    nodes: {
      type: "array",
      items: {
        $ref: "#/$defs/node",
      },
    },
    elements: {
      type: "array",
      items: {
        $ref: "#/$defs/element",
      },
    },
    constraints: {
      type: "array",
      items: {
        $ref: "#/$defs/constraint",
      },
    },
    forces: {
      type: "array",
      items: {
        $ref: "#/$defs/force",
      },
    },
  },
  $defs: {
    constraint: {
      type: "object",
      additionalProperties: false,
      required: ["id", "u1", "u2", "u3"],
      properties: {
        id: {
          type: "string",
        },
        u1: {
          type: "boolean",
        },
        u2: {
          type: "boolean",
        },
        u3: {
          type: "boolean",
        },
      },
    },
    node: {
      type: "object",
      additionalProperties: false,
      required: ["id", "x1", "x2", "x3"],
      properties: {
        id: {
          type: "string",
        },
        x1: {
          type: "number",
        },
        x2: {
          type: "number",
        },
        x3: {
          type: "number",
        },
        "constraint-id": {
          type: "string",
        },
        displacement: {
          type: "object",
          additionalProperties: false,
          required: ["u1", "u2", "u3"],
          properties: {
            id: {
              type: "string",
            },
            u1: {
              type: "number",
            },
            u2: {
              type: "number",
            },
            u3: {
              type: "number",
            },
          },
        },
        "force-id": {
          type: "string",
        },
      },
    },
    element: {
      type: "object",
      additionalProperties: false,
      required: ["id", "area", "elasticModulus", "node1-id", "node2-id"],
      properties: {
        id: {
          type: "string",
        },
        area: {
          type: "number",
        },
        elasticModulus: {
          type: "number",
        },
        "node1-id": {
          type: "string",
        },
        "node2-id": {
          type: "string",
        },
        axialForce: {
          type: "number",
        },
      },
    },
    force: {
      type: "object",
      additionalProperties: false,
      required: ["id", "r1", "r2", "r3"],
      properties: {
        id: {
          type: "string",
        },
        r1: {
          type: "number",
        },
        r2: {
          type: "number",
        },
        r3: {
          type: "number",
        },
      },
    },
  },
};
export default function startHandler() {
  document.getElementById("btn-visualize-model").disabled = true;
  document.getElementById("btn-run").disabled = true;
  document.getElementById("btn-log-model").disabled = true;

  document.getElementById("uploadFile").addEventListener("change", uploadFile);
  document
    .getElementById("btn-visualize-model")
    .addEventListener("click", () => runVisualizer("original"));
}

//function that gets executed when the file is done uploading
function testFile(event) {
  const container = document.getElementById("renderer-container");
  container.textContent = "";
  document.getElementById("btn-visualize-model").disabled = true;
  document.getElementById("btn-run").disabled = true;
  document.getElementById("btn-log-model").disabled = true;
  document.getElementById("btn-log-results").disabled = true;
  document.getElementById("btn-visualize-results").disabled = true;
  document.getElementById("btn-download").disabled = true;

  try {
    const file = JSON.parse(event.target.result);
    const ajv = new Ajv();
    try {
      const validate = ajv.compile(schema);
      function test(data) {
        const valid = validate(data);
        if (valid) {
          log("The JSON file was successfully uploaded and validated");
          document.getElementById("btn-visualize-model").disabled = false;
          document.getElementById("btn-run").disabled = false;
          document.getElementById("btn-log-model").disabled = false;
          sessionStorage.setItem("uploadedFile", JSON.stringify(file));
        } else {
          log("The uploaded JSON file is invalid");
          /*
					validate.errors.forEach((error, index) => {
					  console.log(`Error #${index + 1}:`);
					  console.log(`- Message: ${error.message}`);
					});
					*/
        }
      }
      test(file);
    } catch (e) {
      alert(e);
    }
  } catch (e) {
    alert("Please upload a valid JSON file! \n" + e);
  }
}

function uploadFile(event) {
  var reader = new FileReader();
  reader.onload = testFile;
  reader.readAsText(event.target.files[0]);
}
