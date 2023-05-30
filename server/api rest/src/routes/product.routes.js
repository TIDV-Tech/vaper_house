const { Router } = require("express")
const _var       = require("../global/var.js")
const controller = require("../controllers/validate_product.js")
const axios      = require("axios")
const router     = Router()

router.post(_var.REG_PRO, async (req, res) => {
  try {
    const { param } = req. params
    const { nombre, descripcion, tipo_producto, marca, color, nicotine, flavor, category, img, cantidad, precio, promocion } = req.body
  const prod = await axios.post(`${_var.CONNECT_DB}register/product`, {
      name: nombre,
      description: descripcion,
      type: tipo_producto,
      brand: marca,
      color: color,
      nicotine: nicotine,
      flavor: flavor,
      category: category,
      img: img,
      quantity: cantidad,
      price: precio,
      promotionPrice: promocion
    })
  
    let product = controller.regisProduct(tipo_producto, nombre, descripcion, marca, cantidad, color, nicotine, flavor,  precio, promocion, param)
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

    const product = controller.editProducts(newData)
    if (product) {
      return(res.status(product.code).json(product))
    } 
      const editProduct = await axios.post(`${_var.CONNECT_DB}update/product`, obj)
      .then((result) => {
        res.send({ 
          msg: result.data.msg,
          status: result.data.status, 
          data: obj 
        })
      })
      .catch((err) => { 
        res.send({
          msg: err.response.data.msg,
          status: err.response.data.status,
          error: err.response.data.error
        })
      })
  } catch (err) { console.log(err) }
})

router.post(_var.DELETE_PRO, async (req, res) => {
  try {
    const { productId } = req.body
    const deleteProduct = await axios.post(`${_var.CONNECT_DB}delete/product`, { productId })
    .then((result) => {
      res.send({ 
        msg: result.data.msg, 
        status: result.data.status,
        data: productId 
      })
    })
    .catch((err) => { 
      res.send({
        msg: err.response.data.msg,
        status: err.response.data.status
      })
    })
  } catch (err) { console.log(err) }
})

module.exports = router