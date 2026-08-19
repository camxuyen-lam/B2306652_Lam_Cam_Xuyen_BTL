const { ObjectId } = require("mongodb");

class BorrowService {
    constructor(client) {
        this.Borrow = client.db().collection("theodoimuonsach");
    }

    async find(filter) {
        const cursor = await this.Borrow.find(filter);
        return await cursor.toArray();
    }

    async updateStatus(id, status) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = {
            $set: { 
                TrangThai: status,
                NgayCapNhat: new Date() 
            }
        };
        return await this.Borrow.findOneAndUpdate(filter, update, { returnDocument: "after" });
    }
}

module.exports = BorrowService;