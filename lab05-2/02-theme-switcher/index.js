const makeOcean = () => {
   document.querySelector("body").className = "ocean"
}

const makeDesert = () => {
   document.querySelector("body").className = "desert"
}

const makeHighContrast = () => {
   document.querySelector("body").className = "high-contrast"
}

const makeDefault = () => {
   document.querySelector("body").className = "unset"
}

document.querySelector("#ocean").addEventListener('click', makeOcean);
document.querySelector("#desert").addEventListener('click', makeDesert);
document.querySelector("#high-contrast").addEventListener('click', makeHighContrast);
document.querySelector("#default").addEventListener('click', makeDefault);