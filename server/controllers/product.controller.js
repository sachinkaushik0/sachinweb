
import Product from '../models/products.model.js'
import extend from 'lodash/extend.js'
import errorHandler from './error.controller.js'
const create = async (req, res) => { 
const product = new Product(req.body) 
try {
await product.save()
return res.status(200).json({ 
message: "Successfully saved product!"
})
} catch (err) {
return res.status(400).json({
error: errorHandler.getErrorMessage(err) 
})
} 
}
const list = async (req, res) => { 
try {
let products = await Product.find().select('name description price quantity category created updated') 
res.json(products)
} catch (err) {
return res.status(400).json({
error: errorHandler.getErrorMessage(err) 
})
} 
}
const productByID = async (req, res, next, id) => { 
try {
let product = await Product.findById(id) 
if (!product)
return res.status('400').json({ 
error: "Product not found"
})
req.profile = product 
next()
} catch (err) {
return res.status('400').json({ 
error: "Could not retrieve product"
}) 
}
}



  const productByKeyword = async (req, res) => {
    try {
        const searchString = req.query.name;

        let query = searchString ? { name: { $regex: searchString, $options: 'i' } } : {}

        let products = await Product.find(query).select('name description price quantity category updated created')
        res.json(products)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}
  

const read = (req, res) => {
return res.json(req.profile) 
}
const update = async (req, res) => { 
try {
let product = req.profile
product = extend(product, req.body) 
product.updated = Date.now() 
await product.save()
res.json(product) 
} catch (err) {
return res.status(400).json({
error: errorHandler.getErrorMessage(err) 
})
} 
}
const remove = async (req, res) => { 
try {
let product = req.profile
let deletedProduct = await product.deleteOne()
res.json(deletedProduct) 
} catch (err) {
return res.status(400).json({
error: errorHandler.getErrorMessage(err) 
})
} 
}

const removeall = async (req, res) => { 
    try {
    let product = req.profile
    let deletedProduct = await Product.deleteMany()
    res.json(deletedProduct) 
    } catch (err) {
    return res.status(400).json({
    error: errorHandler.getErrorMessage(err) 
    })
    } 
    }
 export default { create, productByID, read, list, remove, update, productByKeyword, removeall}

