import crypto from 'crypto'

const hashEmail = (email) => {   
    const secret = 'NewsL4tt3R';
    const hash = crypto.createHmac('sha256', secret)
                   .update(email)
                   .digest('hex');
    return hash;
}

export {
    hashEmail
} 
