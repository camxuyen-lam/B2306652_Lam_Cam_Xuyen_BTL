import createApiClient from "./api.service";

class BorrowService {
    constructor(baseUrl = "/api/borrow") {
        this.api = createApiClient(baseUrl);
    }
    async getAll() {
        return (await this.api.get("/")).data;
    }
    async createRequest(data) {
        return (await this.api.post("/request", data)).data;
    }
    async returnBook(id) {
        return (await this.api.put(`/${id}/return`)).data;
    }
    async approveBorrow(id) {
    return (await this.api.put(`/${id}/approve`)).data;
}
async rejectBorrow(id) { return (await this.api.put(`/${id}/reject`)).data; }
    async returnBook(id) { return (await this.api.put(`/${id}/return`)).data; }
async reportLostUser(id) {
    return (await this.api.put(`/${id}/user-lost`)).data;
}
async userConfirmPayment(id) {
    return (await this.api.put(`/${id}/user-paid`)).data;
}
async adminConfirmFine(id) {
    return (await this.api.put(`/${id}/admin-confirm`)).data;
}
}

export default new BorrowService();