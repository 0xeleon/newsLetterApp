import NewsLetterModel from '../db/models/newsletter.model.js'
import CategoryModel from '../db/models/category.model.js'
import { sendEmail } from '../utils/mail.js'

const getNewsLetters = async (_req, res, next) => {   
    try{
        let newsletters = await NewsLetterModel.find({active : true}).populate('category').populate('emailsSend')
        return res.status(200).send(newsletters)
    }catch(err){
        console.error(err)
        return res.status(500).send({'error' : 'A error happend contact admin'})
    }
}

const getAnalytics = async (_req, res, next) => {
    try{
        let newsletters = await NewsLetterModel.find({active : true}).populate('category')
        let result = {}
        newsletters.forEach(item => {
            if(item.category){
                if(result.hasOwnProperty(item.category.name)){
                    result[item.category.name].total = result[item.category.name].total + 1
                    result[item.category.name].mails = result[item.category.name].mails + item.emailsSend.length
                }else{
                    result[item.category.name] = {
                        total : 1,
                        mails : item.emailsSend.length
                    }
                }
            }
        })
        let listData = []
        for (const key in result) {
            const element = result[key];
            listData.push({
                'name' : key,
                'totalPost' : element.total,
                'totalEmails' : element.mails
            })
        }
        return res.status(200).send(listData)
    }catch(err){
        console.error(err)
        return res.status(500).send({'error' : 'A error happend contact admin'})
    }

}

const createNewsLetters = async (_req, res, next) => {
    try{
        let body = {..._req.body}
        let file = {..._req.file}
        body.emailsSend = JSON.parse(body.emailsSend)
        let emailsNotify = body.emailsSend.map(item => item.email)
        emailsNotify.map(async item => {
            let bodyUnsubscribed = `${body.content} <br> <br> <p><a href="http://localhost:3000/unsubscribed/${item}">unsubscribed</a></p>`
            let newMail = await sendEmail(body.subject, item, bodyUnsubscribed, file.filename, file.path, file.mimetype)
        })
        
        body.emailsSend = body.emailsSend.map(item => item._id)
        body.file = file.path
        body.active = true
        let newsLetter = await NewsLetterModel.create(body)

        return res.status(200).send(newsLetter)
    }catch(err){
        console.error(err)
        return res.status(500).send({'error' : 'A error happend contact admin'})
    }
}

const updateNewsLetters = async (_req, res, next) => {
    try{
        let body = {..._req.body}
        body.emailsSend = _req.body.emailsSend.split(',')
        body.file = _req.body.file.split(',')
        let newsLetter = await NewsLetterModel.findOneAndUpdate(
            { _id: _req.query.id },
            {
              $set: body,
            },
            { new : true }
        )
        return res.status(200).send(newsLetter)
    }catch(err){
        console.error(err)
        return res.status(500).send({'error' : 'A error happend contact admin'})
    } 
}

const deleteNewsLetters = async (_req, res, next) => {
    try{
        let newsLetter = await NewsLetterModel.findOneAndUpdate(
            { _id: _req.query.id },
            {
              $set: {active : false},
            },
            { new : true }
        )
        return res.status(200).send(newsLetter)
    }catch(err){
        console.error(err)
        return res.status(500).send({'error' : 'A error happend contact admin'})
    } 
}

export {
    getNewsLetters,
    createNewsLetters,
    updateNewsLetters,
    deleteNewsLetters,
    getAnalytics,
}