import { randomNumber } from "./utils.js";

//sorter function must be mutable/in place
export function applyFlip(sorter, parentSelector) {
  const all = [...document.querySelectorAll(`${parentSelector}>*`)];
  all.forEach((e) => {
    recordPosition(e, "first");
  });
  sorter(all);
  all.forEach((e) => document.querySelector(parentSelector).appendChild(e));

  all.forEach((e) => {
    recordPosition(e, "last");
  });
  all.forEach((e) => {
    flip(e, randomNumber(400, 200));
  });
  all.forEach((e) => {
    e.dataset.first = "";
    e.dataset.last = "";
  });
}
export function flip(elm, duration = 300) {
  const first = JSON.parse(elm.dataset.first);
  const last = JSON.parse(elm.dataset.last);

  // Invert: determine the delta between the
  // first and last bounds to invert the element
  const deltaX = first.left - last.left;
  const deltaY = first.top - last.top;
  const deltaW = first.width / last.width;
  const deltaH = first.height / last.height;

  // Play: animate the final element from its first bounds
  // to its last bounds (which is no transform)
  elm.animate(
    [
      {
        transformOrigin: "top left",
        transform: `
        translate(${deltaX}px, ${deltaY}px)
        scale(${deltaW}, ${deltaH})
      `,
      },
      {
        transformOrigin: "top left",
        transform: "none",
      },
    ],
    {
      duration: Math.abs(deltaX) + Math.abs(deltaY),
      easing: "ease-in-out",
      fill: "both",
    }
  );
}

export function recordPosition(elm, prop) {
  const pos = elm.getBoundingClientRect();
  elm.dataset[prop] = JSON.stringify(pos);
}
