import express from 'express'
import { getEmails, createEmail, updateEmail, deleteEmail, getSingleEmail } from '../controller/email.controller.js'

const emailRoutes = express.Router()

emailRoutes.get('/email', getEmails)
emailRoutes.get('/single-email', getSingleEmail)
emailRoutes.post('/email', createEmail)
emailRoutes.put('/email', updateEmail)
emailRoutes.delete('/email', deleteEmail)

export default emailRoutes