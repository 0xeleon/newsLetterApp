import mongoose from 'mongoose';

mongoose.Promise = global.Promise;
mongoose
  .connect('mongodb://eduardo:edu4rd0@mongonewslatter:27017/miapp?authSource=admin')
  .then(() => {
    console.log("Connection to MongoDB successfully :)")
  })
  .catch((e) => {
    console.log("error: ", e)
  });


export default mongoose;