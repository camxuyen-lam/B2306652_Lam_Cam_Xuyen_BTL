const { ObjectId } = require("mongodb");

class ReaderService {
    constructor(client) {
        this.Reader = client.db().collection("docgia");
    }

    extractReaderData(payload) {
        const reader = {
            MaDocGia: payload.MaDocGia,
            HoLot: payload.HoLot,
            Ten: payload.Ten,
            Email: payload.Email,
            Password: payload.Password,
            NgaySinh: payload.NgaySinh,
            Phai: payload.Phai,
            DiaChi: payload.DiaChi,
            DienThoai: payload.DienThoai,
        };
        Object.keys(reader).forEach(
            (key) => reader[key] === undefined && delete reader[key]
        );
        return reader;
    }

    async create(payload) {
        const reader = this.extractReaderData(payload);
        return await this.Reader.findOneAndUpdate(
            { MaDocGia: reader.MaDocGia },
            { $set: reader },
            { returnDocument: "after", upsert: true }
        );
    }

    async find(filter) {
        const cursor = await this.Reader.find(filter);
        return await cursor.toArray();
    }

    async findById(id) {
        return await this.Reader.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async delete(id) {
        return await this.Reader.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }
    async update(id, payload) {
    const filter = {
        _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };
    const update = this.extractReaderData(payload);
    delete update._id; 
    
    return await this.Reader.findOneAndUpdate(
        filter,
        { $set: update },
        { returnDocument: "after" }
    );
}
}

module.exports = ReaderService;