import EmailModel from '../db/models/email.model.js'
import CategoryModel from '../db/models/category.model.js'
import { hashEmail } from '../utils/hash.js'

const getEmails = async (_req, res, next) => {   
    try{
        let emails = await EmailModel.find().populate('categories')
        return res.status(200).send(emails)
    }catch(err){
        console.error(err)
        return res.status(500).send({'error' : 'A error happend contact admin'})
    }
}

const getSingleEmail = async (_req, res, next) => {
    try{         
        let email = await EmailModel.findOne({email : _req.query.email}).lean().then(res => res)
        let categories = await CategoryModel.find().lean().then(res => res)
        let subscribed = categories.map(category => {
            let search = email.categories.find(item => item.toString() === category._id.toString())
            let categoryAccess = {...category}
            if(search){
                categoryAccess.access = true
            }else{
                categoryAccess.access = false
            }
            return categoryAccess
        })
        email.categoriesList = subscribed
        return res.status(200).send(email)
    }catch(err){
        console.error(err)
        return res.status(500).send({'error' : 'A error happend contact admin'})
    }
}

const createEmail = async (_req, res, next) => {
    try{
        let body = {..._req.body}
        body.categories = _req.body.categories
        body.hash = hashEmail(_req.body.email)

        let email = await EmailModel.create(body)
        return res.status(200).send(email)
    }catch(err){
        console.error(err)
        return res.status(500).send({'error' : 'A error happend contact admin'})
    }
}

const updateEmail = async (_req, res, next) => {
    try{
        let body = {..._req.body}
        body.categories = _req.body.categories
        let email = await EmailModel.findOneAndUpdate(
            { _id: _req.query.id },
            {
              $set: body,
            },
            { new : true }
        )
        return res.status(200).send(email)
    }catch(err){
        console.error(err)
        return res.status(500).send({'error' : 'A error happend contact admin'})
    } 
}


const deleteEmail = async (_req, res, next) => {
    try{
        let email = await EmailModel.findOneAndUpdate(
            { _id: _req.query.id },
            {
              $set: {active : false},
            },
            { new : true }
        )
        return res.status(200).send(email)
    }catch(err){
        console.error(err)
        return res.status(500).send({'error' : 'A error happend contact admin'})
    } 
}

export {
    getEmails,
    createEmail,
    updateEmail,
    deleteEmail,
    getSingleEmail
}