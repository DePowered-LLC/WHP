class Auth {
    register() {
        if(this.data.pass != this.data.passr) {
            this.send('passwords_doesnt_match');
        } else if(this.data.pass.length < 8 || this.data.pass.length > 32) {
            this.send('password_length');
        } else {
            this.data.pass = this.data.pass.trim();
            this.data.email = this.data.email.trim();
            this.db.User.findOne({email: this.data.email}, (err, res) => {
                if(err) this.send(err, 500);
                else if(res) this.send('email_taken');
                else this.db.User.create(this.data, err => {
                    if(err) this.send(err, 500);
                    else this.send('success');
                });
            });
        }
    }
}

module.exports = Auth;