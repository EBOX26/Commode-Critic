const { User } = require('../models')

// here is some seed data on users. 
const userData =
[
    {
        "username": "user1",
        "password": "password1"
    },
    {
        "username": "user2",
        "password": "password2"
    },
    {
        "username": "user3",
        "password": "password3"
    },
    {
        "username": "user4",
        "password": "password4"
    },
    {
        "username": "user5",
        "password": "password5"
    }
]

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser