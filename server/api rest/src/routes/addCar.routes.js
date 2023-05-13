const { Router } = require("express")
const axios      = require("axios")
const _var       = require("../global/var.js")
const funct      = require("../controllers/validate_car.js")
const router     = Router()

router.post(_var.ADDCAR, async (req, res) => {
  try {
    const { userId, productId, quantityProducts } = req.body

    const allProduct = await axios
      .post(`${_var.CONNECT_DB}products`)
      .then((result) => {
        let car = result.data.data
        const validate = funct.carValidate(car, productId, quantityProducts)
        if (validate.code === 202) {
          res.status(validate.code).json(validate)
        } else if (validate.code === 200) {
          axios.post(`${_var.CONNECT_DB}add/cart`, {
            userId,
            productId,
            quantityProducts,
          })
          res.status(validate.code).json(validate)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  } catch (err) {
    console.log(err)
  }
})

module.exports = router
