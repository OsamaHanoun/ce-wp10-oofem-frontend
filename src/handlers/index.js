import handleDownloadButton from "./handle-download";
import handleVisualizeResultsButton from "./handle-visualize-results";
import handleLogModelButton from "./handle-log-model";
import handleLogResultsButton from "./handle-log-results";

export default function initAllHandlers() {
  handleLogModelButton();
  handleDownloadButton();
  handleLogResultsButton();
  handleVisualizeResultsButton();
}
