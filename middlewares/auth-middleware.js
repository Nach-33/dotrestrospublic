const authenticate = (req,res,next)=>{
    if(!req.user) {
        console.log('not authenticated');
        res.redirect('/auth/google');
    }
    else next();
}

module.exports = authenticate;