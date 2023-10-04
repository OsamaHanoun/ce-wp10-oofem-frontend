export default function log(msg) {
  const containerElem = document.querySelector("#log");
  const pElem = document.createElement("p");
  const d = new Date();
  const hours = addZero(d.getHours());
  const minutes = addZero(d.getMinutes());
  const seconds = addZero(d.getSeconds());

  const time = `[ ${hours}:${minutes}:${seconds} ]`;
  pElem.innerHTML = time + ": " + msg;
  containerElem.appendChild(pElem);
  containerElem.scrollTop = containerElem.scrollHeight;
}

function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}
