import express from 'express'
import { getCategories, createCategory, updateCategory, deleteCategory, getEmailsByCategory } from '../controller/category.controller.js'

const categoryRoutes = express.Router()

categoryRoutes.get('/category', getCategories)
categoryRoutes.get('/categoryEmail', getEmailsByCategory)
categoryRoutes.post('/category', createCategory)
categoryRoutes.put('/category', updateCategory)
categoryRoutes.delete('/category', deleteCategory)

export default categoryRoutes