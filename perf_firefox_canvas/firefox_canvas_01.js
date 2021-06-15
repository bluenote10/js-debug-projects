(function () {
  let phi = 0.0;
  let width = 0;
  let height = 0;
  // with ~10000 rects, still at ~60 fps
  const numOverDraws = 10000;

  function render() {
    let x = 200 * Math.cos(phi);
    let y = 200 * Math.sin(phi);

    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < numOverDraws; ++i) {
      ctx.strokeRect(400 + x, 400 + y, 20, 20);
    }

    phi += 0.03;

    window.requestAnimationFrame(render);
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
