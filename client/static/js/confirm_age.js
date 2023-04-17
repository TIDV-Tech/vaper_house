const modal_bg    = document.querySelector(".modal_bg") 
const modal       = document.querySelector(".modal_content") 
const loader      = document.querySelector(".loader")
const yes_button  = document.getElementById("yes")
const no_button   = document.getElementById("no")

yes_button.addEventListener("click", ()=>{
  yes_button.disabled       = true
  no_button.disabled        = true
  modal.style.filter        = "brightness(0.4)"
  loader.style.display      = "block"
  setTimeout(()=>{
    loader.style.display    = "none"
    modal.style.display     = "none"
    modal_bg.style.display  = "none"
  }, 3000)
})

no_button.addEventListener("click", ()=>{
  yes_button.style.display        = "none"
  no_button.style.display         = "none"
  modal.children[1].style.display = "none"
  modal.children[2].style.display = "none"
  modal.children[0].style.width   = "70%"
  modal.children[0].style.margin  = "20px auto"
  modal.children[0].innerHTML     = "Debes tener 18 años o más para poder acceder al sitio."
})