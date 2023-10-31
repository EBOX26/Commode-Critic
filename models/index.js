const User = require('./User');
const Review = require('./Review');

Review.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = { User, Review }