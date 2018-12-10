class T {
    undefined () {
        const mongo = this.db.mongo('test');
        const user = {};
        user.email = 'mail@sobaka.ru';
        user.name = [1, 2];
        user.pass = 'testpass';
        mongo.User.create(user, err => {
            if(err) this.send(err, 500);
            else this.send('success');
        });
    }
}

module.exports = T;