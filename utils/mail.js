import nodemailer from 'nodemailer'
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const sendEmail = (subject, emails, content, filename, destination, mimetype) => {
    return new Promise((resolve, reject) => {
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
              user: '0xeleon.dev@gmail.com',
              pass: 'rldhveypntjgqeoh'
            }
        });
    
        const mailOptions = {
            from: 'newsLetterApp <0xeleon.dev@gmail.com>',
            to: emails,
            subject: subject,
            html: content,
            attachments: [
                {
                    filename: filename, 
                    path: path.join(__dirname, `../${destination}`),
                    contentType: mimetype
                }
            ]
        };
    
        transporter.sendMail(mailOptions, (error, info) =>{
            if(error){
                return reject(error)
            }else{
                return resolve(info)
            }
        });
    })
}

export {
    sendEmail
} 