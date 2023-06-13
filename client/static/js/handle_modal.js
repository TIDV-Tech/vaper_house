const modals_bg     = document.querySelectorAll(".modal_bg")
const modals        = document.querySelectorAll(".modal")
const options       = document.querySelectorAll(".option")
const close_btn     = document.querySelectorAll(".close_btn")
const register_btn  = document.querySelectorAll(".register_btn")
const modal_option  = document.querySelectorAll(".modal_option")

const getModalData = () => {
  const response = fetch("http://localhost:5000/modal/data")
  .then(response => response.json())
  .then(data => data)
  return response
}

const getModal = () => {
  const response = fetch("http://localhost:5000/modal")
  .then(response => response.text())
  .then(data => data)
  return response
}

for(let i = 0; i < modals_bg.length; i++){
  modals_bg[i].style.opacity = 0
  options[i].addEventListener("click", () => {
    modals_bg[i].innerHTML = ""
    modals_bg[i].appendChild(modals[i])
    
    modals[i].style.transform = "translateY(0)"
    modals_bg[i].style.visibility = "visible"
    modals_bg[i].style.opacity = 1
    
    if(i == 8) {
      const form = modals[i].querySelector("form")
      const btn = modals[i].querySelector("button")
      form.style.display = "block"
      form.style.textAlign = "center"
      btn.style.width = "60%"
    }
  })
}

for(let i = 0; i < close_btn.length; i++){
  close_btn[i].addEventListener("click", () => {
    modals[i].style.transform   = "translateY(-200px)"
    modals_bg[i].style.opacity  = 0
    setTimeout(() => modals_bg[i].style.visibility = "hidden", 300)    
  })
}

for (let i = 0; i < register_btn.length; i++) {
  register_btn[i].addEventListener("click", () => console.log("registrando..."))
}

for (let i = 0; i < modal_option.length; i++) {
  modal_option[i].addEventListener("click", async () => {
    
    let modal = await getModal()
    
    const parser = new DOMParser()
    modal = parser.parseFromString(modal, "text/html")
    
    const modals_option = modal.body.querySelectorAll(".modal")

    modals_option[i].style.width = "auto"
    
    if(i == 0 || i == 1){
      modals_bg[0].innerHTML = ""
      modals_bg[0].appendChild(modals_option[i])
      const close_btn_modals = modals_option[i].querySelector(".close_btn")
      close_btn_modals.addEventListener("click", () => {
        modals_option[i].style.transform  = "translateY(-200px)"
        modals_option[i].style.opacity  = 0
        modals_bg[0].style.opacity  = 0
        setTimeout(() => modals_bg[0].style.visibility = "hidden", 300) 
      })
    }

    if(i == 2 || i == 3){
      if(i == 2){
        modals_option[i].style.marginTop  = "200px"
        modals_option[i].style.height     = "80%"
        modals_option[i].style.width      = "80%"
      }
      modals_bg[1].innerHTML = ""
      modals_bg[1].appendChild(modals_option[i])
      const close_btn_modals = modals_option[i].querySelector(".close_btn")
      close_btn_modals.addEventListener("click", () => {
        modals_option[i].style.transform  = "translateY(-200px)"
        modals_option[i].style.opacity  = 0
        modals_bg[1].style.opacity  = 0
        setTimeout(() => modals_bg[1].style.visibility = "hidden", 300) 
      })
    }

    
    if(i== 4 || i == 5 || i == 6){
      if(i == 4){
        modals_option[i].style.marginTop  = "200px"
        modals_option[i].style.height     = "80%"
        modals_option[i].style.width      = "80%"
      }
      // const form      = modals_option[i].querySelector("form")
      // const btn       = form.querySelector(".register_btn")
      // const btn_copy  = btn.cloneNode(true)
      // const inputs    = modals_option[i].querySelectorAll("input") 
      // const inputs1   = document.createElement("div")
      // const inputs2   = document.createElement("div")
      // const btn_div   = document.createElement("div")

      // inputs1.className = "inputs1"
      // inputs2.className = "inputs2"
      // btn_div.className = "btn_div"

      // form.removeChild(btn)
      
      // for (let i = 0; i < 6; i++) {
      //   inputs1.appendChild(inputs[i])
      // }
      
      // for (let i = 6; i < inputs.length; i++) {
      //   inputs2.appendChild(inputs[i])
      // }

      // form.appendChild(inputs1)
      // form.appendChild(inputs2)
      // btn_div.appendChild(btn_copy)  
      // modals_option[5].appendChild(btn_div)
      // modals_option[5].style.width = "auto"

      modals_bg[2].innerHTML = ""
      modals_bg[2].appendChild(modals_option[i])
 
      const close_btn_modals = modals_option[i].querySelector(".close_btn")
      close_btn_modals.addEventListener("click", () => {
        modals_option[i].style.transform  = "translateY(-200px)"
        modals_option[i].style.opacity    = 0
        modals_bg[2].style.opacity        = 0
        setTimeout(() => modals_bg[2].style.visibility = "hidden", 300) 
      })
    }

    const filter        = modals_option[i].querySelector("select")
    let filter_selected = filter.options[0].value
    
    filter.addEventListener("change", () => {
      filter_selected = filter.options[filter.selectedIndex].value
    })

    const search_btn  = modals_option[i].querySelector(".search_btn")
    let from  = ""
    if (i == 0) from = "User"
    if (i == 2) from = "Purchase"
    if (i == 4) from = "Product"
    search_btn.addEventListener("click", () => {
      const value = modals_option[i].querySelector("input").value
      const data = {filter_selected, value, from}
      
      fetch("/filter", {
        method: "POST",
        body: JSON.stringify(data),
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      }) 
      .then(response => response.text())
      .then(new_modal_content => {
        const old_table   = modals_option[i].querySelector(".modal_content")
        new_modal_content = parser.parseFromString(new_modal_content, "text/html")
        const new_table   = new_modal_content.body.querySelector(".modal_content")
        
        old_table.parentNode.replaceChild(new_table, old_table)
      })
    })
  })
}