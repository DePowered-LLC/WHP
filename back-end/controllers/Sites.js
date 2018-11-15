const SiteTools = require('./SiteTools');

class Sites {
    async ws_create() {
        if(!this.session.user) {
            this.end('forbidden', 403);
            return;
        }

        const siteData = {
            domain: this.data.domain,
            id: this.session.user.uid,
            ROOT: this.ROOT
        };

        try { var site = await this.db.Site.findOne({domain: siteData.domain}); }
        catch(err) { this.end(['db_error', err], 500); return; }

        if(site) this.end('domain_taken', 400);
        else {
            try {
                this.send('creating_config');
                await SiteTools.createConfig(siteData);
        
                site = {};
                site.user = this.session.user._id;
                site.domain = siteData.domain;
                site.status = 'configurated';

                this.send('creating_directories');
                await SiteTools.createDirectories(siteData);
                site.status = 'disabled';

                try { await SiteTools.copyTemplate(siteData); }
                catch(err) { this.send(err, 500); }

                await SiteTools.enable(siteData);
                site.status = 'enabled';
                this.end('success');
            } catch(err) {
                this.end(err, 500);
                return;
            }
        }
    }
}

module.exports = Sites;