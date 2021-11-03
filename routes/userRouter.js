const 
    router = require('express').Router(),
    auth = require('../middleware/auth'),
    userCtrl = require('../controllers/userCtrl');

//Regester User
router.post('/register',userCtrl.registerUser);

//Login User
router.post('/login',userCtrl.loginUser);

//Verify Token
router.get('/verify',userCtrl.verifiedToken);

//Get All Users
router.get('/getUsers',userCtrl.getAllUsers);

module.exports = router;