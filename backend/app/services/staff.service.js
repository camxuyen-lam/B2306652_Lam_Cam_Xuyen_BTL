class StaffService {
    constructor(client) {
        this.Staff = client.db().collection("nhanvien");
    }
    async create(payload) {
        const result = await this.Staff.findOneAndUpdate(
            { MSNV: payload.MSNV },
            { $set: { 
                MSNV: payload.MSNV, HoTenNV: payload.HoTenNV, 
                Password: payload.Password, ChucVu: payload.ChucVu,
                DiaChi: payload.DiaChi, SoDienThoai: payload.SoDienThoai 
            } },
            { returnDocument: "after", upsert: true }
        );
        return result;
    }
}
module.exports = StaffService;  