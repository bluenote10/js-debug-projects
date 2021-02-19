async function functionOne() {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });

  throw new Error("Error here prints incomplete stack");
}

async function functionTwo() {
  await functionOne();
}

async function functionThree() {
  await functionTwo();
}

functionThree().catch((error) => {
  console.error(error);
});
