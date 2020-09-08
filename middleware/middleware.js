const User = require('../model/user')


const middlewareObj = {};

middlewareObj.isLoggedIn = (req, res, next) => {
if(req.session && req.user.session){
    return res.status(200).send({ message: "user authenticated" });
} else {
    return res.status(401).send({ message: "erro" });
}
};

module.exports = middlewareObj;