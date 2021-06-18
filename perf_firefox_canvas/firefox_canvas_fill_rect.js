(function () {
  const numRects = 1000;

  // Render state
  let width = 0;
  let height = 0;

  function render() {
    const tRenderStart = performance.now();

    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < numRects; ++i) {
      const x1 = Math.random() * width;
      const x2 = Math.random() * width;
      const y1 = Math.random() * height;
      const y2 = Math.random() * height;
      ctx.fillStyle = `hsla(0, 0%, ${Math.random() * 100}%, 1)`;
      ctx.fillRect(
        Math.min(x1, x2),
        Math.min(y1, y2),
        Math.abs(x1 - x2),
        Math.abs(y1 - y2)
      );
    }

    const tRenderFinished = performance.now();

    // Report rendering time
    report(tRenderFinished - tRenderStart);

    window.requestAnimationFrame(render);
  }

  // Report state
  const textarea = document.getElementById("ta");
  const deltas = [];

  function report(delta) {
    deltas.push(delta);

    if (deltas.length % (60 * 3) === 0) {
      let s = `Canvas size: ${width} x ${height}\n`;

      s += "\nRender self delta time:\n\n";
      s += createStatsString(deltas);

      textarea.value = s;
      deltas.length = 0;
    }
  }

  function createStatsString(deltas) {
    deltas.sort((a, b) => a - b);

    let s = "";
    const mean = deltas.reduce((a, b) => a + b, 0) / deltas.length;
    s += `Mean:   ${mean.toFixed(3)} ms\n`;
    s += `Median: ${deltas[deltas.length / 2].toFixed(3)} ms\n`;

    const numToShow = 10;
    s += "Smallest delta values [ms]: ";
    s +=
      deltas
        .slice(0, numToShow)
        .map((x) => x.toFixed(3))
        .join(" ") + "\n";
    s += "Largest delta values [ms]:  ";
    s +=
      deltas
        .slice(deltas.length - numToShow)
        .map((x) => x.toFixed(3))
        .join(" ") + "\n";

    const ratioLarge1 =
      deltas.filter((delta) => delta > 1000 / 60).length / deltas.length;
    s += `Ratio larger 16.6 ms: ${(ratioLarge1 * 100).toFixed(3)} %\n`;
    const ratioLarge2 =
      deltas.filter((delta) => delta > 28).length / deltas.length;
    s += `Ratio larger 28.0 ms: ${(ratioLarge2 * 100).toFixed(3)} %\n`;

    return s;
  }

  function main() {
    // Prepare canvas
    const canvas = document.getElementById("canvas");
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    canvas.width = width;
    canvas.height = height;

    render();
  }

  main();
})();
