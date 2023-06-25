const router = require('express').Router();
const passport = require('passport');

const frontendLink = "https://dot-restros.netlify.app/";

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect(frontendLink);
});

router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

router.get('/redirect', passport.authenticate('google'), (req, res) => {
    res.redirect('/user/profile');
});


module.exports = router;