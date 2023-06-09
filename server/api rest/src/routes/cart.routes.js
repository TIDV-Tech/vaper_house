const { Router } = require("express")
const axios = require("axios")
const _var = require("../global/var.js")
const funct = require("../controllers/validate_car.js")
const router = Router()

router.post(_var.ADDCAR, async (req, res) => {
  try {
    const { userId, productId, quantityProducts } = req.body

    const allProduct = await axios
      .post(`${_var.CONNECT_DB}product/id`, { productId })
      .then((result) => {
        let car = result.data.data
        const validate = funct.carValidate(car, productId, quantityProducts)

        if (validate.code === 202) {
          return res.status(validate.code).json(validate)
        } else if (validate.code === 200) {
          axios.post(`${_var.CONNECT_DB}add/cart`, {
            userId,
            productId,
            quantityProducts,
          })
          return res.status(validate.code).json(validate)
        }
      })
      .catch((err) => {
        res.send({
          msg: err.response.data.msg,
          status: err.response.data.status,
          error: err.response.data.error
        })
      })
  } catch (err) {
    console.log(err)
  }
})

module.exports = router
