/*const fs = require('fs');
module.exports = new Promise(done => {
    fs.access('/etc/apache2', fs.constants.R_OK | fs.constants.W_OK, err => {
        if(err) {
            console.log('> Can`t read/write in apache directory');
            console.log('> Try start with root privileges');
            process.exit();
            return;
        }
        done();
    });
});*/