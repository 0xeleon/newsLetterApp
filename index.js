import express from 'express'
import mongoose from './db/mongoose.js'
import bodyParser from 'body-parser'
import path from 'path';
import {fileURLToPath} from 'url';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// routes 
import categoryRoutes from './routes/category.routes.js'
import emailRoutes from './routes/email.routes.js'
import newsLetterRoutes from './routes/newsletter.routes.js'

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './frontend/newsletter-app/build')));


const pathApi = '/api/v1';

app.use((req, res, next) =>{
    next()
})

// define routes
app.use(pathApi, categoryRoutes);
app.use(pathApi, emailRoutes);
app.use(pathApi, newsLetterRoutes);

app.get('/test', async(_req, res) =>{
    return  res.send('ok');
})

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, './frontend/newsletter-app/build/index.html'));
});
  

app.listen(3001, () =>{
    console.log('listen 3001...');
})