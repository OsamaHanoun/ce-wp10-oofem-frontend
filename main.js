import startHandler from "./src/handlers/handle-upload";
import iniVisualizerHandlers from "./src/visualizer/visualizer-handlers";
import startWS from "./src/ws.js";
import initAllHandlers from "./src/handlers";

startHandler();
startWS();
iniVisualizerHandlers();
initAllHandlers();
