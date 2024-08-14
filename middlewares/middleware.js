const middle1 = function (req, res, next){
    console.log("Middleware 1");
    next();
};

const middle2 = function (req, res, next){
    console.log("Middleware 2");
    next();
};

module.exports = {middle1, middle2};