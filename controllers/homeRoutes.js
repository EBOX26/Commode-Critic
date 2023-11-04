const router = require('express').Router();
const { User, Review } = require('../models');
const withAuth = require('../utils/auth');

// route to get user
router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll({
            attributes: { exclude: ['password'] },
            order: [['name', 'ASC']],
        });

        const users = userData.map((project) => project.get({ plain: true }));

        res.render('homepage', {
            users,
            logged_in: req.session.logged_in, 
        });

    } catch (err) {
        res.status(500).json(err);
    }
});
 router.get('/login', (req, res) => {
    if (req.session.logged_on) {
        res.redirect('/');
        return;
    }

    res.render('login');
 });

 //Finds the logged in user using the session ID
 router.get('/profile', async (req, res) => {
    try {
        const userData =await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
        });
        const user = userData.get({ plain: true });

        res.render('profile', {
            ...user, 
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
 });

 // If user is already logged in
 router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        return;
    }
    res.render('login');
 });

 // route to get all review
router.get('/reviews', async (req, res) => {
    const reviewData = await Review.findAll().catch((err) => { 
        res.json(err);
      });
        const reviews = reviewData.map((review) => review.get({ plain: true }));
        res.status(200).json(reviews);

        //need to create the all-reviews handlebar
        //res.render('all-reviews', { reviews });
      });

// route to get one review
router.get('/reviews/:id', async (req, res) => {
    try{ 
        const reviewData = await Review.findByPk(req.params.id);
        if(!reviewData) {
            res.status(404).json({message: 'No review with this id!'});
            return;
        }
        const review = reviewData.get({ plain: true });
        //need to create the review handle bar route
        //res.render('review', review);
        res.status(200).json(review);

      } catch (err) {
          res.status(500).json(err);
      };     
  });

 module.exports = router;