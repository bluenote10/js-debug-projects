import React from "react";
import ReactDOM from "react-dom";

// No double compilation without these two lines:
import Worker from "./worker";
const worker = new Worker();

ReactDOM.render(
  <React.StrictMode>
    <div>Hello World</div>
  </React.StrictMode>,
  document.getElementById("root")
);

// The following code merely exists to slow down the TS compilation
// of this file (it slows it down a lot, several seconds on my machine!).
// To trigger a recompilation change the number suffix (it looks like
// simply re-saving / touching the file isn't sufficient to cause a
// recompilation).

export function complexGeneric1234(name: keyof JSX.IntrinsicElements) {
  const wrapped: React.FC<JSX.IntrinsicElements[typeof name]> = (props) =>
    React.createElement(name, { ...props }, props.children);
  return wrapped;
}
