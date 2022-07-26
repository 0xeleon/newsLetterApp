import mongoose from 'mongoose'

const CategoryModel = new mongoose.model('Category', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength1: 1,
    trim: true
  },
  active : Boolean
}));

export default CategoryModel;