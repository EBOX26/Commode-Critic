const router = require('express').Router();
const { User, Review } = require('../models');
const withAuth = require('../utils/auth');

// route to get user
router.get('/', async (req, res) => {
    try {
        // fetching user data
        const userData = await User.findAll({
            attributes: { exclude: ['password'] },
            order: [['username', 'ASC']],
        });

        const users = userData.map((project) => project.get({ plain: true }));

        //fetching review data
        const reviewData = await Review.findAll({
            include: {model: User, required: true},
            attributes: ['user.username', 'review_content', 'rating']
        });

        const reviews = reviewData.map((review) => [review.user.dataValues.username, review.dataValues.review_content, review.dataValues.rating]);

        res.render('homepage', {
            users,
            reviews: reviews,
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
    const reviewData = await Review.findAll({
        include: {model: User, required: true},
        attributes: ['user.username', 'review_content', 'rating']
    }).catch((err) => { 
        res.json(err);
      });
      
      const reviews = reviewData.map((review) => [review.user.dataValues.username, review.dataValues.review_content, review.dataValues.rating]);

        res.render('all-reviews', { reviews: reviews });
      });

// route to get one review
router.get('/reviews/:id', async (req, res) => {
    try{ 
        const reviewData = await Review.findByPk(req.params.id, {
            include: {model: User, required: true},
            attributes: ['user.username', 'review_content', 'rating']});
        if(!reviewData) {
            res.status(404).json({message: 'No review with this id!'});
            return;
        }
        const review = reviewData.get({ plain: true });
        console.log(review)
        
        res.render('review', {review: review});

      } catch (err) {
          res.status(500).json(err);
      };     
  });

 module.exports = router;