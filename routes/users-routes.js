const router = require("express").Router();
const { getUserProfile } = require("../controllers/users-controllers");

router.get("/", getUserProfile);

router.get("/status", (req,res)=>{
    return res.json({loggedIn:true});
});

module.exports = router;
