import mongoose from 'mongoose'

const EmailModel = new mongoose.model('Email', new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength1: 1,
    trim: true
  },
  hash : {
    type: String,
    required: true
  },
  categories : {
    type : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
    required: true
  },
  active : Boolean
}));

export default EmailModel;