import { observer } from "./modules/observer.js";
import {
  randomColor,
  count,
  shuffleArrayFisherYates,
  weightedRandom,
} from "./modules/utils.js";
import { applyFlip } from "./modules/flip.js";

const btns = document.querySelectorAll("nav>button");
btns.forEach((btn) => {
  btn.addEventListener("click", () => observer.publish(btn.dataset.action));
});

const next = count();
function add() {
  const x = document.createElement("div");
  const s = document.createElement("span");
  s.textContent = next();
  const rnd = randomColor();
  x.style.background = rnd;
  x.dataset.color = rnd;
  x.style.setProperty(
    "--columns",
    `span ${weightedRandom([1, 2, 3], [10, 2, 1])}`
  );
  x.style.setProperty(
    "--rows",
    `span ${weightedRandom([1, 2, 3], [10, 2, 1])}`
  );
  x.appendChild(s);
  document.querySelector("main").appendChild(x);
}

function remove() {
  const x = document.querySelector("main>div:last-child");
  x.remove();
}

function move() {
  applyFlip((e) => {
    shuffleArrayFisherYates(e);
  }, "main");
}
function sortColor() {
  applyFlip((e) => {
    e.sort((a, b) => (a.dataset.color > b.dataset.color ? 1 : -1));
  }, "main");
}
function sortValue() {
  applyFlip((e) => {
    e.sort((a, b) =>
      Number(a.querySelector("span").textContent) >
      Number(b.querySelector("span").textContent)
        ? 1
        : -1
    );
  }, "main");
}
document.addEventListener("DOMContentLoaded", () => {
  observer.subscribe("add", add);
  observer.subscribe("remove", remove);
  observer.subscribe("move", move);
  observer.subscribe("sort-color", sortColor);
  observer.subscribe("sort-value", sortValue);
  for (let i = 0; i < 20; i++) {
    observer.publish("add");
  }
});
