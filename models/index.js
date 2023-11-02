const User = require('./User');
const Review = require('./Review');
const Location = require('./Location');

Review.belongsTo(User, {
    foreignKey: 'user_id'
});

Review.belongsTo(Location, {
    foreignKey: 'location_id'
});

module.exports = { User, Review, Location }
