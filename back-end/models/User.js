module.exports = {
    email: {type: String, required: true},
    first_name: {type: String, requires: true},
    last_name: {type: String, requires: true},
    pass: {type: String, required: true},
    balance: {type: Number, default: 0}
};