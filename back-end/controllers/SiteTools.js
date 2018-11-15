const fs = require('fs');
const {ncp} = require('ncp');
const {exec, mkdirs} = require('../utils');

module.exports = {
    createConfig(siteData) {
        return new Promise((resolve, reject) => {
            fs.readFile(siteData.ROOT + '/site_template/apache.conf', (err, conf) => {
                if(err) {
                    reject(['Can`t read config_template.conf', err]);
                    return;
                }

                conf = conf.toString();
                Object.keys(siteData).forEach(key => {
                    conf = conf.split('{' + key + '}').join(siteData[key]);
                });

                fs.writeFile(`/etc/apache2/sites-available/u${siteData.id}_${siteData.domain}.conf`, conf, async err => {
                    if(err) {
                        reject(['Can`t create config', err]);
                        return;
                    }
                    resolve();
                });
            }); 
        });
    },

    async createDirectories(siteData) {
        try {
            await mkdirs({
                'user`s root'  : `/home/u${siteData.id}`,
                'domain`s root': `/home/u${siteData.id}/${siteData.domain}`,
                'public_html'  : `/home/u${siteData.id}/${siteData.domain}/public_html`,
                'logs'         : `/home/u${siteData.id}/${siteData.domain}/logs`
            });
        } catch(e) {
            throw ['Can`t create '+e.key+' directory', e.err];
        }
    },

    copyTemplate(siteData) {
        return new Promise((resolve, reject) => {
            ncp(siteData.ROOT + '/site_template/public_html', `/home/u${siteData.id}/${siteData.domain}/public_html`, err => {
                if(err) reject(['copy_template_error', err]);
                else resolve();
            });
        })
    },

    async enable(siteData) {
        try {
            await exec('chown -R www-data:www-data /home/u' + siteData.id + '/' +siteData.domain);
            await exec('chmod -R 770 /home/u' + siteData.id + '/'+siteData.domain);
            await exec(`a2ensite u${siteData.id}_${siteData.domain}`);
            await exec('service apache2 reload');
        } catch(err) {
            throw ['enable_error', err];
        }
    }
};