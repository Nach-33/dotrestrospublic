const router = require("express").Router();
const { getUserProfile } = require('../controllers/users-controllers')


router.get("/", getUserProfile);

module.exports = router;
