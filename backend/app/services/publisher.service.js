class PublisherService {
    constructor(client) {
        this.Publisher = client.db().collection("nhaxuatban");
    }
    async create(payload) {
        const result = await this.Publisher.findOneAndUpdate(
            { MaNXB: payload.MaNXB },
            { $set: { MaNXB: payload.MaNXB, TenNXB: payload.TenNXB, DiaChi: payload.DiaChi } },
            { returnDocument: "after", upsert: true }
        );
        return result;
    }
    async find(filter) {
        const cursor = await this.Publisher.find(filter);
        return await cursor.toArray();
    }
}
module.exports = PublisherService;