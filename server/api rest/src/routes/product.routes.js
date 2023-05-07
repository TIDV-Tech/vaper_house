const { Router } = require("express")
const _var       = require("../global/var.js")
const controller = require("../controllers/validate_product.js")
const axios      = require("axios")
const router     = Router()

router.post(_var.REG_PRO, async (req, res) => {
  //axios.post('/products', )
  const { tipo_producto, nombre, descripcion, marca, cantidad, precio, img, fecha_ingreso } = req.body
  let product = await controller.regisProduct(tipo_producto, nombre, descripcion, marca, cantidad, precio, fecha_ingreso, img)
  res.status(product.code).json(product)
})

router.get(_var.VIEW_PRO, async (req, res) => {
  try {
    
  } catch (err) {  throw err }
})

router.post(_var.EDIT_PRO, async (req, res) => {
  try {
    
  } catch (err) {  throw err }
})

router.post(_var.DELETE_PRO, async (req, res) => {
  try {
    
  } catch (err) {  throw err }
})

module.exports = router