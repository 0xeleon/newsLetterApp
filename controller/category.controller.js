import CategoryModel from '../db/models/category.model.js'
import EmailModel from '../db/models/email.model.js'

const getCategories = async (_req, res, next) => {   
    try{
        let categories = await CategoryModel.find()
        return res.status(200).send(categories)
    }catch(err){
        console.error(err)
        return res.status(500).send({'error' : 'A error happend contact admin'})
    }
}

const getEmailsByCategory = async(_req, res, next) => {
    try{
        let categories = await CategoryModel.find()
        let emails = await EmailModel.find()
        let categoryEmail = {}
        emails.forEach(email => {
            email.categories.forEach(categoryUser => {
                if(categoryUser !== null){
                    if(categoryEmail.hasOwnProperty(categoryUser)){
                        categoryEmail[categoryUser].push(email)
                    }else{
                        categoryEmail[categoryUser] = [email]
                    }
                }
            })
        })
        let categoriesWithEmails = categories.map(category => {
            let newCategory = {
                name : category.name,
                _id : category._id,
                active : category.active,
                emailList : categoryEmail.hasOwnProperty(category._id) ? categoryEmail[category._id] : []
            }
            return newCategory
        })
        
        return res.status(200).send(categoriesWithEmails)
    }catch(err){

    }
}

const createCategory = async (_req, res, next) => {
    try{
        let category = await CategoryModel.create(_req.body)
        return res.status(200).send(category)
    }catch(err){
        console.error(err)
        return res.status(500).send({'error' : 'A error happend contact admin'})
    }
}

const updateCategory = async (_req, res, next) => {
    try{
        let category = await CategoryModel.findOneAndUpdate(
            { _id: _req.query.id },
            {
              $set: _req.body,
            },
            { new : true }
        )
        return res.status(200).send(category)
    }catch(err){
        console.error(err)
        return res.status(500).send({'error' : 'A error happend contact admin'})
    } 
}


const deleteCategory = async (_req, res, next) => {
    try{
        let category = await CategoryModel.findOneAndUpdate(
            { _id: _req.query.id },
            {
              $set: {active : false},
            },
            { new : true }
        )
        return res.status(200).send(category)
    }catch(err){
        console.error(err)
        return res.status(500).send({'error' : 'A error happend contact admin'})
    } 
}

export {
    getCategories,
    getEmailsByCategory,
    createCategory,
    updateCategory,
    deleteCategory
}

