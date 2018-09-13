const bcrypt = require('bcrypt');
const saltLength = 11;

module.exports = {
    email: { type: String, required: true },
    pass: {
        type: String,
        required: true,
        set(val) {
            return bcrypt.hashSync(val, bcrypt.genSaltSync(saltLength));
        }
    },
    balance: { type: Number, default: 0 }
};