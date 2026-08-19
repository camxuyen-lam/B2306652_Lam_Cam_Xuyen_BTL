class CategoryService {
    constructor(client) {
        this.Category = client.db().collection("theloai");
    }
    async create(payload) {
        return await this.Category.findOneAndUpdate(
            { MaTheLoai: payload.MaTheLoai },
            { $set: { MaTheLoai: payload.MaTheLoai, TenTheLoai: payload.TenTheLoai } },
            { returnDocument: "after", upsert: true }
        );
    }
    async find(filter) {
        const cursor = await this.Category.find(filter);
        return await cursor.toArray();
    }
    async delete(id) {
        const { ObjectId } = require("mongodb");
        return await this.Category.findOneAndDelete({ _id: new ObjectId(id) });
    }
}
module.exports = CategoryService;