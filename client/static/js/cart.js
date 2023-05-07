const max       = document.querySelector('#max').value
const increment = document.querySelector('#increment')
const decrement = document.querySelector('#decrement')
const quantity  = document.querySelector('.quantity')
let defaultVal  = parseInt(quantity.value)

increment.addEventListener('click', () => {
  if (defaultVal>=max) return
  defaultVal++
  quantity.value = defaultVal
})

decrement.addEventListener('click', () => {
  if (defaultVal<=1) return
  defaultVal--
  quantity.value = defaultVal
})

const description_title = document.querySelector('.title-description')
const additional_title  = document.querySelector('.title-additional')
const description_text  = document.querySelector('.text-description')
const additional_text   = document.querySelector('.text-additional')

const chev1 = document.querySelector('#chev1')
const chev2 = document.querySelector('#chev2')

const arrchevron = ['bx bxs-chevron-down', 'bx bxs-chevron-up']

description_title.addEventListener('click', () => {
  chev1.classList.value == arrchevron[0] ? chev1.classList.value = arrchevron[1] : chev1.classList.value = arrchevron[0]
  description_text.classList.toggle('hidden')
})
additional_title.addEventListener('click', () => {
  chev2.classList.value == arrchevron[0] ? chev2.classList.value = arrchevron[1] : chev2.classList.value = arrchevron[0]
  additional_text.classList.toggle('hidden')
})
