const {ObjectId} = require('mongoose').Schema.Types;

module.exports = {
    user: {ref: 'User', type: ObjectId, required: true},
    domain: {type: String, required: true},
    status: {type: String, required: true}
};