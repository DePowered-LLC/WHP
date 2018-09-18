const bcrypt = require('bcrypt');
async function cryptPass(val) {
    const salt = await bcrypt.genSalt(11);
    return await bcrypt.hash(val, salt);
}

class Auth {
    login() {
        this.db.User.findOne({email: this.data.email}, async (err, user) => {
            if(err) this.send(err, 500);
            else if (!user) this.send('no_account');
            else if(!await bcrypt.compare(this.data.pass, user.pass)) this.send('wrong_password');
            else {
                this.session.user = {
                    email: user.email,
                    balance: user.balance
                };

                this.session.save(err => {
                    if(err) this.send(err, 500);
                    else this.send('success');
                });
            }
        });
    }

    register() {
        if(this.data.pass != this.data.passr) {
            this.send('passwords_doesnt_match');
        } else if(this.data.pass.length < 8 || this.data.pass.length > 32) {
            this.send('password_length');
        } else {
            this.data.pass = this.data.pass.trim();
            this.data.email = this.data.email.trim();
            this.db.User.findOne({email: this.data.email}, async (err, user) => {
                if(err) this.send(err, 500);
                else if(user) this.send('email_taken');
                else {
                    user = {};
                    user.email = this.data.email;
                    user.first_name = this.data.first_name;
                    user.last_name = this.data.last_name;
                    user.pass = await cryptPass(this.data.pass);
                    this.db.User.create(user, err => {
                        if(err) this.send(err, 500);
                        else this.send('success');
                    });
                }
            });
        }
    }

    session() { this.send(this.session.user); }

    logout() {
        delete this.session.user;
        this.session.save(err => {
            if(err) this.send(err, 500);
            else this.send('success');
        });
    }
}

module.exports = Auth;