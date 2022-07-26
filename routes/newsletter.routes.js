import express from 'express'
import { getNewsLetters, createNewsLetters, updateNewsLetters, deleteNewsLetters, getAnalytics } from '../controller/newsletter.controller.js';
import multer from 'multer'

const upload = multer({ dest: './uploads/' }).single('uploaded_file')

const newsLetterRoutes = express.Router()

newsLetterRoutes.get('/newsLetter', getNewsLetters)
newsLetterRoutes.get('/anlaytics', getAnalytics)
newsLetterRoutes.post('/newsLetter', upload, createNewsLetters)
newsLetterRoutes.put('/newsLetter', updateNewsLetters)
newsLetterRoutes.delete('/newsLetter', deleteNewsLetters)

export default newsLetterRoutes