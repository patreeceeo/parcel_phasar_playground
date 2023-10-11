let count = 0;

function handleClick() {
  count++;
  console.log(count);
}

if (module.hot) {
  module.hot.accept(() => {
    document.body.removeEventListener('click', handleClick);
  });
}

document.body.addEventListener('click', handleClick);

console.log('Hello World!!');
