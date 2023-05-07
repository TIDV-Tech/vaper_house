const { Router } = require("express")
const _var       = require("../global/var.js")
const controller = require("../controllers/validate_product.js")
const axios      = require("axios")
const router     = Router()

router.post(_var.REG_PRO, async (req, res) => {
  try {
  //axios.post('/products', )
  const { param } = req. params
  const { tipo_producto, nombre, descripcion, marca, cantidad, precio, img, fecha_ingreso } = req.body
  let product = await controller.regisProduct(tipo_producto, nombre, descripcion, marca, cantidad, precio, fecha_ingreso, img, param)
  res.status(product.code).json(product)
  } catch (err) { console.log(err) }
})

router.get(_var.VIEW_PRO, async (req, res) => {
  try {
    
  } catch (err) { console.log(err) }
})

router.post(_var.EDIT_PRO, async (req, res) => {
  try {
    const { id_product ,tipo_producto, nombre, descripcion, marca, cantidad, precio, img, fecha_ingreso } = req.body 
    const product = {
      id_product : 1,
      tipo_producto: "Vaper",
      nombre: "vaper vapeador",
      descripcion: "Esto es un vaper vapeador",
      marca: "Vapea",
      cantidad: 2,
      precio: 100,
      img: "https://i.pinimg.com/originals/8d/17/3",
      fecha_ingreso: "2020-01-01"
    }
    
    let prod = await controller.editProduct( id_product,tipo_producto, nombre, descripcion, marca, cantidad, precio, img, fecha_ingreso ,product)
    res.send(prod)
  } catch (err) { console.log(err) }
})

router.post(_var.DELETE_PRO, async (req, res) => {
  try {
    
  } catch (err) { console.log(err) }
})

module.exports = router