import log from "../logger";
//function to read the user uploaded file
import Ajv from "ajv";
import runVisualizer from "../visualizer/visualize";
import schema from "../../assets/schema";
let file = "";

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
