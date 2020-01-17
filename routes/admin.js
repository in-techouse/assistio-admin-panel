var express = require('express');
var router = express.Router();
var firebase = require('firebase');

router.get('/',function(req , res){
    res.render("pages/index");
});
router.get('/all_users',function(req , res){
    res.render("pages/all_users");
});
router.get('/user',function(req , res){
    res.render("pages/user");
});






module.exports = router;