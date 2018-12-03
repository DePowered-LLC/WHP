const bcrypt = require('bcrypt');
async function cryptPass(val) {
    const salt = await bcrypt.genSalt(11);
    return await bcrypt.hash(val, salt);
}

class Auth {
    async login() {
        try { var user = await this.db.User.findOne({email: this.data.email.trim()}); }
        catch(err) { this.send(err, 500); return; }
        
        if (!user) this.send('no_account');
        else if(!await bcrypt.compare(this.data.pass, user.pass)) this.send('wrong_password');
        else {
            this.session.user = {
                _id: user._id,
                uid: user.uid,
                email: user.email,
                balance: user.balance,
                name: user.name
            };

            this.session.save(err => {
                if(err) this.send(err, 500);
                else this.send('success');
            });
        }
    }

    async register() {
        if(this.data.pass != this.data.passr) {
            this.send('passwords_doesnt_match');
        } else if(this.data.pass.length < 8 || this.data.pass.length > 32) {
            this.send('password_length');
        } else {
            this.data.pass = this.data.pass.trim();
            this.data.email = this.data.email.trim();

            try { var user = await this.db.User.findOne({email: this.data.email}); }
            catch(err) { this.send(err, 500); return; }

            if(user) this.send('email_taken');
            else {
                user = {};
                user.email = this.data.email;
                user.name = [this.data.first_name, this.data.last_name];
                user.pass = await cryptPass(this.data.pass);
                this.db.User.create(user, err => {
                    if(err) this.send(err, 500);
                    else this.send('success');
                });
            }
        }
    }

    session() { this.send(this.session.user || false); }

    logout() {
        this.session.destroy(err => {
            if(err) this.send(err, 500);
            else this.send('success');
        });
    }
}

module.exports = Auth;