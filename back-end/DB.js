import mongoose, {Schema} from 'mongoose';

class DB {
    constructor(host, db, user, pass, port = 27017) {
        this.conn = mongoose.connect(`mongodb://${user?`${user}:${pass}@`:''}${host}:${port}/${db}`, {
            useNewUrlParser: true
        }).then(conn => {
            console.log(`[DB] Connected to ${db} at ${host}${user?'@'+user:''}`);
            this.conn = conn;
        });
        return new Proxy(this, {
            get(obj, name) {
                if(name == '__this') return obj;
                if(name in obj.conn.models) return obj.conn.models[name];
                let schema = require(`./models/${name}.js`).default;
                return mongoose.model(name, new Schema(schema));
            }
        });
    }
}

export default DB;