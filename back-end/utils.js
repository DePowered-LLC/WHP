const fs = require('fs');
const {exec: exec_cb} = require('child_process');

class Utils {
    static async exec() {
        return new Promise((resolve, reject) => {
            const child = exec_cb.apply(null, arguments);
            child.addListener('error', reject);
            child.addListener('exit', resolve);
        });
    }
    
    static mkdirs(list) {
        return new Promise((resolve, reject) => {
            const keys = Object.keys(list);
            let currentKeyID = 0;
            (function nextDirectory() {
                const key = keys[currentKeyID];
                fs.mkdir(list[key], err => {
                    if(err && err.code != 'EEXIST') {
                        reject({key, err});
                        return;
                    } else if(currentKeyID == keys.length - 1) {
                        resolve();
                        return;
                    }
                    currentKeyID++;
                    nextDirectory();
                });
            })();
        });
    }
}

module.exports = Utils;