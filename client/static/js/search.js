const search = document.querySelector('.bx-search')
search.addEventListener('click', () => {
  let val = document.querySelector('#search_val').value
  window.location.href=`/buscar?search=${val}`
})