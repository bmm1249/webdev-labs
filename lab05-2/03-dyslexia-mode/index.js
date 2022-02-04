/* 
  See Smashing Magazine Tutorial:
  https://www.smashingmagazine.com/2021/11/dyslexia-friendly-mode-website/
*/
let mode = 0

const makeDyslexic = () => {
    if (mode == 1){
      document.querySelector("body").className = "unset"
      mode = 0
    } else {
      document.querySelector("body").className = "dyslexia-mode"
      mode = 1
    }
}

document.querySelector("#ocean").addEventListener('click', makeDyslexic);