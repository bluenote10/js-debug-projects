(function () {
  // Render state
  let mode = 0;

  let phi = 0.0;
  let width = 0;
  let height = 0;
  let tOld = NaN;

  function render() {
    const tNew = performance.now();

    if (mode === 0) {
      let ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, width, height);

      let x = 200 * Math.cos(phi);
      let y = 200 * Math.sin(phi);
      ctx.strokeRect(400 + x, 400 + y, 20, 20);

      phi += 0.03;
    } else {
      let ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < 1000; ++i) {
        const x1 = Math.random() * width;
        const x2 = Math.random() * width;
        const y1 = Math.random() * height;
        const y2 = Math.random() * height;
        ctx.fillStyle = `hsla(${Math.random() * 360}, 100%, 90%, 1)`;
        ctx.fillRect(
          Math.min(x1, x2),
          Math.min(y1, y2),
          Math.abs(x1 - x2),
          Math.abs(y1 - y2)
        );
      }
    }

    const tRenderFinished = performance.now();

    // Report rendering time
    if (!isNaN(tOld)) {
      const deltaRAF = tNew - tOld;
      report(deltaRAF, tRenderFinished - tNew);
    }
    tOld = tNew;

    window.requestAnimationFrame(render);
  }

  // Report state
  const textarea = document.getElementById("ta");
  const deltasRAF = [];
  const deltasRender = [];

  function report(deltaRAF, deltaRender) {
    deltasRAF.push(deltaRAF);
    deltasRender.push(deltaRender);

    if (deltasRAF.length % (60 * 3) === 0) {
      let s = `Canvas size: ${width} x ${height}\n`;

      s += "\nRAF delta time (from one requestAnimationFrame to the next):\n\n";
      s += createStatsString(deltasRAF);

      s += "\nRender self delta time:\n\n";
      s += createStatsString(deltasRender);

      textarea.value = s;
      deltasRAF.length = 0;
      deltasRender.length = 0;
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
    // Prepare select
    const select = document.getElementById("select");
    select.addEventListener("change", (event) => {
      console.log(event);
      console.log(event.target.selectedIndex);
      mode = event.target.selectedIndex;
    });

    // Prepare canvas
    const canvas = document.getElementById("canvas");
    console.log(canvas.clientWidth, canvas.clientHeight);

    width = canvas.clientWidth;
    height = canvas.clientHeight;

    // Resize canvas
    canvas.width = width;
    canvas.height = height;

    render();
  }

  main();
})();
