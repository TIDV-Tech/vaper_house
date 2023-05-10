(function ($) {
  "use strict"
  $('.js-tilt').tilt({ scale: 1.1 })
  var input = $('.validate-input .input100')

  $('.validate-form').on('submit', () => {
    var check = true;
    for (var i = 0; i < input.length; i++) {
      if (validate(input[i]) == false) {
        showValidate(input[i])
        check = false
      }
    }
    return check
  })

  $('#birthdate').on('click', () => {
    let d = new Date(new Date() - 5.68e+11).toLocaleDateString().split("/")
    if (d[1] < 10) d[1] = 0+d[1]
    d = d.reverse().join("-")
    $('#birthdate').attr('max', d.toString())
  })

  $('.validate-form .input100').each(() => { $(this).focus(() => { hideValidate(this) }) })

  function validate(input) {
    if ($(input).attr('type') == 'email' || $(input).attr('name') == 'email') { if ($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) return false }
    else if ($(input).attr('type') == 'text' || $(input).attr('name') == 'name') { if ($(input).val().trim().match(/^([a-zA-Z \-\.]+)$/) == null) return false }
    else { if ($(input).val().trim() == '') return false }
  }

  const showValidate = (input) => {
    var thisAlert = $(input).parent()
    $(thisAlert).addClass('alert-validate')
  }

  const hideValidate = (input) => {
    var thisAlert = $(input).parent()
    $(thisAlert).removeClass('alert-validate')
  }
})(jQuery)