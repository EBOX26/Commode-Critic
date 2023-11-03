const User = require('./User');
const Review = require('./Review');
const Location = require('./Location');

Review.belongsTo(User, {
    foreignKey: 'user_id'
});

// Insomnia trying to check for location data that does not have a route and isn't available
// Location.hasMany(Review, {
//     foreignKey: 'location_id'
// });

module.exports = { User, Review, Location }
