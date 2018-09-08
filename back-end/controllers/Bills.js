class Bills {
    all() {
        this.db.Bills.find({}, (err, data) => {
            if(err) {
                console.log(err);
                this.send('Can`t get bill list', 500);
                return;
            }
            this.send(data);
        });
    }

    add() {
        let bill = new this.db.Bills(Object.assign({
            balance: 0
        }, this.data));
        bill.save(err => {
            if(err) {
                console.error(err);
                this.send('Can`t add bill', 500);
                return;
            }
            this.send();
        });
    }
}

export default Bills;