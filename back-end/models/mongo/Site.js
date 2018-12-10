const {ObjectId} = require('mongoose').Schema.Types;

module.exports = {
    owner: {ref: 'User', type: ObjectId, required: true},
    domain: {type: String, required: true},
    status: {type: String, required: true}
};