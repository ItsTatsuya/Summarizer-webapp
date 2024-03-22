const bcrypt=require("bcrypt");


const passChecking = (password) => {
    if (password.length < 8) {
        return 'Password must be at least 8 characters';
    }
    else if (password.length > 100) {
        return 'Maximum character for Password reached';
    }
    else if (!/[a-z]/.test(password)) {
        return 'Password must contain at least one lowercase letter';
    }
    else if (!/[A-Z]/.test(password)) {
        return 'Password must contain at least one uppercase letter';
    }
    else if (!/\d/.test(password)) {
        return 'Password must contain at least one digit';
    }
    else if (!/[^a-zA-Z0-9]/.test(password)) {
        return 'Password must contain at least one special character';
    }
    else {
        return 'True';
    }
};

//password hashing
const hashPassword = (password)=>{
    return new Promise((resolve,reject)=>{
        bcrypt.genSalt(10,(err,salt)=>{
            if(err){
                reject(err);
            }
            bcrypt.hash(password,salt,(err,hash)=>{
                if(err){
                    reject(err);
                }
                resolve(hash);
            })
        })
    })
}

module.exports={
    passChecking,
    hashPassword
}