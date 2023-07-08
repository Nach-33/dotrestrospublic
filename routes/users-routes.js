const router = require("express").Router();
const { getUserProfile } = require('../controllers/users-controllers')


router.get("/profile", getUserProfile);



module.exports = router;
