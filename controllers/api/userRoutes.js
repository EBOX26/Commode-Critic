const router = require('express').Router();
const { User } = require('../../models');

// CREATE new user
router.post('/', async (req, res) => {
    try {
      const dbUserData = await User.create({
        username: req.body.username,
        // currently only using username and pw.
        // email: req.body.email,
        password: req.body.password,
      });
  
      req.session.save(() => {
        req.session.loggedIn = true;
  
        res.status(200).json(dbUserData);
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: {username: req.body.username }});
        if (!userData) {
            res 
            .status(400)
            .json({ message: 'Incorrect username. Please try again!'})
            return;
        }
        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res
            .status(400)
            .json({ message: 'Incorrect password. Please try again!'})
            return;
        }

        req.session.save(() => {
            req.session.username = userData.username;
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({ user: userData, message: 'You are now logged in!'});
        });
    }catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/current', (req, res) => {
    const username = req.session.username;
    const id = req.session.user_id;
    if (username && id) {
      res.json({ username, id });
    } else {
      res.json({ username: null });
    }
  });

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;