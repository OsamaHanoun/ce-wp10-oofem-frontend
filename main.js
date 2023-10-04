import startHandler from "./handle-upload";
import iniVisualizerHandlers from "./src/visualizer/visualizer-handlers";
import startWS from "./ws.js";
import initAllHandlers from "./src/handlers";

startHandler();
startWS();
iniVisualizerHandlers();
initAllHandlers();
