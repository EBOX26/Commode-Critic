const { Review } = require('../models');

const reviewdata = [
    {
        review_content: "Fancy bathroom; soft toilet paper, powerful hand dryer. 'Home Sweet Throne.",
        rating: 5,
        user_id: 1,
    },
    {
        review_content: "Not haunted, but automatic flush scared me. It laughed. Spooky, clean!",
        rating: 3,
        user_id: 2,
    },
    {
        review_content: "Loud hand dryer, like NASA rocket engine. Dried everything in 3 seconds.",
        rating: 3,
        user_id: 3,
    },
    {
        review_content: "Worse than porta-potty at chili contest. Graffiti like art, dirty hands.",
        rating: 1,
        user_id: 4,
    },
    {
        review_content: "'Out of order' bathroom. Out of hope, paper, dignity. Avoid unless method actor for horror film.",
        rating: 2,
        user_id: 5,
    }
]

// was missing the below function to make the seeding work. 
const seedReview = () => Review.bulkCreate(reviewdata);

module.exports = seedReview