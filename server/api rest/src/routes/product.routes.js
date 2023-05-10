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
          msg: result.data.msg,
          status: result.data.status, 
          data: obj 
        })
      })
      .catch((err) => { 
        res.send(res.send(err.response)) 
      })
  } catch (err) { console.log(err) }
})

router.post(_var.DELETE_PRO, async (req, res) => {
  try {
    const { productId } = req.body
    const deleteProduct = axios.post(`${_var.CONNECT_DB}delete/product`, { productId })
    .then((result) => {
      res.send({ 
        msg: result.data.msg, 
        status: result.data.status,
        data: productId 
      })
    })
    .catch((err) => { 
      res.send(err.response)
    })
  } catch (err) { console.log(err) }
})

module.exports = router