let font_size = 32

const makeBigger = () => {
   font_size = font_size + 2
   document.querySelector("h1").style.fontSize = `${font_size}px`;
   document.querySelector(".content").style.fontSize = `${font_size - 10}px`;
};
const makeSmaller = () => {
   font_size = font_size - 2
   document.querySelector("h1").style.fontSize = `${font_size}px`;
   document.querySelector(".content").style.fontSize = `${font_size - 10}px`;
};

document.querySelector("#a1").addEventListener('click', makeBigger);
document.querySelector("#a2").addEventListener('click', makeSmaller);

