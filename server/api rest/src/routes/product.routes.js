const { Router } = require("express")
const _var       = require("../global/var.js")
const controller = require("../controllers/validate_product.js")
const axios      = require("axios")
const router     = Router()

router.post(_var.REG_PRO, async (req, res) => {
  try {
  const { param } = req. params
  const { productId, nombre, descripcion, tipo_producto, marca, cantidad, precio, promocion } = req.body
  axios.post('http://localhost:5001/register/product', {
    productId: productId,
    name: nombre,
    description: descripcion,
    type: tipo_producto,
    brand: marca,
    quantity: cantidad,
    price: precio,
    promotionPrice: promocion
  })
  
  let product = await controller.regisProduct(tipo_producto, nombre, descripcion, marca, cantidad, precio, promocion, param)
  res.status(product.code).json(product)
  } catch (err) { console.log(err) }
})

router.get(_var.VIEW_PRO, async (req, res) => {
  try {
    const product = await axios.get('http://localhost:5001/products')
    res.send(product.data)
  } catch (err) { console.log(err) }
})

router.post(_var.EDIT_PRO, async (req, res) => {
  try {
    const { productId, newData } = req.body 
    const obj = {
      productId,
      newData
    }

    const editProduct = axios.post('http://localhost:5001/update/product', obj)
    .then((result) => {
      res.send({ "msg": "Product updated successfully!",
    "status": 200, "data": obj })
    })
    .catch((err) => { console.log(err) })
  } catch (err) { console.log(err) }
})

router.post(_var.DELETE_PRO, async (req, res) => {
  try {
    const { productId } = req.body
    const deleteProduct = axios.post('http://localhost:5001/delete/product', { productId })
    .then((result) => {
      res.send({ "msg": "Product deleted successfully", "status": 200, "data": productId })
    })
    .catch((err) => { console.log(err) })
  } catch (err) { console.log(err) }
})

module.exports = router