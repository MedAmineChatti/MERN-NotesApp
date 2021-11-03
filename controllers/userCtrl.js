require('dotenv').config();
const 
    Cryptr = require('cryptr'),
    jwt = require('jsonwebtoken'),
    cryptr = new Cryptr('devnami'), 
    Users = require('../models/userModel'),
    userCtrl = {
        registerUser : async(req,res) => {
            try {

                const 
                    {username,email,password} = req.body,
                    user = await Users.findOne({email:email}),
                    passwordEncrypt = await cryptr.encrypt(password);

                if (user) {
                    return res.status(400).json({msg:"Email already exists"});
                }

                var date_sys = new Date();
                d = date_sys.getDate();
                m = date_sys.getMonth() + 1;
                var register_date = date_sys.getFullYear() + "/" + m + "/" + d +" - "+date_sys.getHours() + ":" + date_sys.getMinutes() + ":" + date_sys.getSeconds();
    
                const newUser = new Users ({
                    username : username,
                    email : email,
                    password : passwordEncrypt,
                    register_date : register_date,
                    last_login : register_date
                });

                // Save mongodb
                await newUser.save();
                
                res.json({msg:"Sign up Success"});

            } catch (err) {

                return res.status(500).json({msg : err.message});

            }         
        },
        loginUser : async(req,res) => {
            try {

                const 
                    {email,password} = req.body,
                    user = await Users.findOne({email:email});
                
                if (!user) {
                    return res.status(400).json({msg:"Email dos not exist"});
                }

                passwordDecrypt = cryptr.decrypt(user.password);

                if(!(password == passwordDecrypt)) {
                    return res.status(400).json({msg:"Password incorrect"});
                }

                //if login success create token
                const payload = {id : user._id, name: user.username}
                const token =  jwt.sign(payload, process.env.TOKEN_SECRET, {expiresIn: '7d'})

                
                var date_sys = new Date();
                d = date_sys.getDate();
                m = date_sys.getMonth() + 1;
                var login_date = date_sys.getFullYear() + "/" + m + "/" +d+" - "+date_sys.getHours() + ":" + date_sys.getMinutes() + ":" + date_sys.getSeconds();


                await Users.findOneAndUpdate({_id: user.id}, {
                    last_login : login_date
                })

            res.json({token});

            } catch (err) {

                return res.status(500).json({msg : err.message});

            }          
        },
        verifiedToken : (req,res) => {
            try {
                const token = req.header("Authorization");
                if(!token) return res.send(false);

                jwt.verify(token, process.env.TOKEN_SECRET, async(err, verified) =>{
                    if(err) return res.send(false);
        
                    const user = await Users.findById(verified.id);
                    if(!user) return res.send(false);


                    return res.send(true);
                });

            } catch (err) {
                return res.status(500).json({msg : err.message});
            }
        },
        getAllUsers : async(req,res) =>{
            user = await Users.find();
            if (!user) {
                return res.status(400).json({msg:"Email already exists"});
            }
            res.json(user);
        }
    }

module.exports = userCtrl;