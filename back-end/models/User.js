module.exports = {
    increment: 'uid',
    email: {type: String, required: true},
    name: [{type: String, requires: true}],
    pass: {type: String, required: true},
    balance: {type: Number, default: 0},
};