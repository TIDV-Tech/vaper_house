const { Router } = require("express")
const _var       = require("../global/var.js")
const controller = require("../controllers/validate_product.js")
const axios      = require("axios")
const router     = Router()

router.post(_var.REG_PRO, async (req, res) => {
  try {
    const { param } = req. params
    const { productId, nombre, descripcion, tipo_producto, marca, img, cantidad, precio, promocion } = req.body
  axios.post(`${_var.CONNECT_DB}register/product`, {
      productId: productId,
      name: nombre,
      description: descripcion,
      type: tipo_producto,
      brand: marca,
      img: img,
      quantity: cantidad,
      price: precio,
      promotionPrice: promocion
    })
  
    let product = await controller.regisProduct(tipo_producto, nombre, descripcion, marca, cantidad, precio, promocion, param)
    res.status(product.code).json(product)
  } catch (err) { console.log(err) }
})

router.get(_var.VIEW_ALL_PRO, async (req, res) => {
  try {
    const products = await axios.get(`${_var.CONNECT_DB}products`)
    .then((result) => {
      res.send(result.data)
    })
    .catch((err) => { console.log(err) })
  } catch (err) { console.log(err) }
})

router.post(_var.VIEW_PRO, async (req, res) => {
  try {
    const { filter } = req.body

    const product = await axios.post(`${_var.CONNECT_DB}product`, {filter})
    .then((result) => {
      res.send(result.data.data)
    })
    .catch((err) => {
      console.log(err)
    })
  } catch (err) { console.log(err) }
})

router.post(_var.EDIT_PRO, async (req, res) => {
  try {
    const { productId, newData } = req.body 
    const obj = {
      productId,
      newData
    }

    const product = await controller.editProducts(newData)
    if (product) {
      return(res.status(product.code).json(product))
    } 
      const editProduct = axios.post(`${_var.CONNECT_DB}update/product`, obj)
      .then((result) => {
        res.send({ 
          msg: "Product updated successfully!",
          status: 200, 
          data: obj 
        })
      })
      .catch((err) => { 
        res.send({
          msg: "Something went wrong...",
          status: 400, 
          error: 'Cast to ObjectId failed for value "" (type string) at path "_id" for model "product"'
        }) 
      })
  } catch (err) { console.log(err) }
})

router.post(_var.DELETE_PRO, async (req, res) => {
  try {
    const { productId } = req.body
    const deleteProduct = axios.post(`${_var.CONNECT_DB}delete/product`, { productId })
    .then((result) => {
      res.send({ "msg": "Product deleted successfully", "status": 200, "data": productId })
    })
    .catch((err) => { console.log(err) })
  } catch (err) { console.log(err) }
})

module.exports = router