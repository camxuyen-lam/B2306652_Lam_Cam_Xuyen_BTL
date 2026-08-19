const { ObjectId } = require("mongodb");

class BookService {
    constructor(client) {
        this.Book = client.db().collection("sach");
    }

    extractBookData(payload) {
    const book = {
        MaSach: payload.MaSach,
        TenSach: payload.TenSach,
        DonGia: payload.DonGia,
        SoQuyen: payload.SoQuyen,
        NamXuatBan: payload.NamXuatBan,
        MaNXB: payload.MaNXB,
        TacGia: payload.TacGia,
        TheLoai: payload.TheLoai, 
        HinhAnh: payload.HinhAnh, 
    };
        Object.keys(book).forEach(
            (key) => book[key] === undefined && delete book[key]
        );
        return book;
    }

    async create(payload) {
        const book = this.extractBookData(payload);
        return await this.Book.findOneAndUpdate(
            { MaSach: book.MaSach },
            { $set: book },
            { returnDocument: "after", upsert: true }
        );
    }

    async find(filter) {
        const cursor = await this.Book.find(filter);
        return await cursor.toArray();
    }

    async findById(id) {
        return await this.Book.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractBookData(payload);
        delete update._id; 

        return await this.Book.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
    }

    async delete(id) {
        return await this.Book.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }
}

module.exports = BookService;