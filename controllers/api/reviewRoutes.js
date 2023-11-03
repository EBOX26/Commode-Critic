const router = require('express').Router();
const { Review } = require('../../models');

// CREATE new review
router.post('/', async (req, res) => {
    try {
      const dbReviewData = await Review.create({
        review_content: req.body.review_content,
        rating: req.body.rating,
        user_id: req.body.user_id,
      });
  
        res.status(200).json(dbReviewData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  module.exports = router;