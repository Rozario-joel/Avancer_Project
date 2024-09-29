const { adduser, login } = require('../Controllers/AuthCtrl');
const { adduserVal, loginVal } = require('../Middlewares/AuthVal');
const TimeStamp = require('../Middlewares/TimeStamp');
const {adminUser} = require('../Controllers/AdminUser')
const ensureAuthenticated = require('../Middlewares/Auth')
const {UserModel} = require('../Models/Schema')

const router = require('express').Router();

router.post('/login', loginVal, login );
router.post('/adduser', 
    adduserVal,
    adduser,
    TimeStamp
);

router.post('/adminUser' , adminUser )

router.get('/get-current-user',  ensureAuthenticated, async (req, res) => {
    // const user = await UserModel.findById(req.body).select("password");
    const userId = await UserModel.find(req.body).select("password")
    res.send({
      success: true,
      message: "You are authorised",
      // data: "admin"
      // data : admin
      data : userId,
      // data : user
    });
  })



module.exports = router;