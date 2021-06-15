(function () {
  // Render state
  let phi = 0.0;
  let width = 0;
  let height = 0;
  let tOld = NaN;

  function render() {
    let x = 200 * Math.cos(phi);
    let y = 200 * Math.sin(phi);

    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, width, height);
    ctx.strokeRect(400 + x, 400 + y, 20, 20);

    phi += 0.03;

    const tNew = performance.now();
    if (!isNaN(tOld)) {
      const delta = tNew - tOld;
      report(delta);
    }
    tOld = tNew;

    window.requestAnimationFrame(render);
  }

  // Report state
  const textarea = document.getElementById("ta");
  const values = [];

  function report(delta) {
    values.push(delta);

    if (values.length % (60 * 3) === 0) {
      values.sort((a, b) => a - b);

      let s = `Canvas size: ${width} x ${height}\n\n`;

      const numToShow = 10;
      s += "Smallest delta values: ";
      s +=
        values
          .slice(0, numToShow)
          .map((x) => x.toFixed(3))
          .join(" ") + "\n";
      s += "Largest delta values:  ";
      s +=
        values
          .slice(values.length - numToShow)
          .map((x) => x.toFixed(3))
          .join(" ") + "\n";

      const ratioLarge1 =
        values.filter((delta) => delta > 1000 / 60).length / values.length;
      s += `\nRatio larger 16.6 ms: ${(ratioLarge1 * 100).toFixed(3)} %`;
      const ratioLarge2 =
        values.filter((delta) => delta > 28).length / values.length;
      s += `\nRatio larger 28.0 ms: ${(ratioLarge2 * 100).toFixed(3)} %`;

      textarea.value = s;
      values.length = 0;
    }
  }

  function main() {
    let canvas = document.getElementById("canvas");
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
