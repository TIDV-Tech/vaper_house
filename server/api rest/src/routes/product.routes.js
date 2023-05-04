const { Router } = require("express")
const _var       = require("../global/var.js")
const controller = require("../controllers/validate_product.js")
const router     = Router()

router.post(_var.REG_PRO, (req, res) => {
  const { tipo_producto, nombre, descripcion, marca, cantidad, precio, img, fecha_ingreso } = req.body
  let product = controller.regisProduct(tipo_producto, nombre, descripcion, marca, cantidad, precio, fecha_ingreso, img)
  res.status(product.code).json(product)
})

module.exports = router