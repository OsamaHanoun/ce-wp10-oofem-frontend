export default function handleDownloadButton() {
  document.getElementById("btn-download").disabled = true;

  document.getElementById("btn-download").addEventListener("click", () => {
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(sessionStorage.getItem("downloadFile"));
    var dlAnchorElem = document.getElementById("downloadAnchorElem");
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", "results.json");
    dlAnchorElem.click();
  });
}
