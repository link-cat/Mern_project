module.exports.signUpError = (err) =>{
    let errors = {
        pseudo: '',
        email: '',
        password: ''
    }

    if(err.message.includes('pseudo'))
        errors.pseudo = "Pseudo incorrect ou deja pris"
    
    if(err.message.includes('email'))
        errors.email = "Email incorrect"
    
    if(err.message.includes('password'))
        errors.password = "le mot de passe doit faire 6 caracteres minimum"
    
    if(err.code == 11000 && Object.keys(err.keyValue)[0].includes('email')){
        errors.email = "Cet email est deja enregistré"

    if(err.code == 11000 && Object.keys(err.keyValue)[0].includes('pseudo'))
        errors.pseudo = "Ce pseudo est deja utilisé"
    }
    
    return errors
}

module.exports.signInError = (err)=>{
    let errors = {email:'',password:''}

    if(err.message.includes('email')) errors.email = "Email inconnu"
    if(err.message.includes('password')) errors.password = "mot de passe incorrect"

    return errors;
}