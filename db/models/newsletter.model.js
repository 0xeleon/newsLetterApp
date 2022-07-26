import mongoose from 'mongoose'

const NewsLetterModel = new mongoose.model('NewsLetter', new mongoose.Schema({
  file : [{
    type : String
  }],
  subject : {
    type: String,
    required: true,
    minlength1: 1
  },
  category : {
    type : mongoose.Schema.Types.ObjectId, 
    ref: 'Category',
  },
  content  : {
    type: String,
    required: true,
    minlength1: 1
  },
  schedule : {
    type : Date
  },
  active : Boolean,
  emailsSend : {
    type : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Email' }],
    required: true
  }
}));

export default NewsLetterModel;