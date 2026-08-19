const express = require("express");
const cors = require("cors");
const booksRouter = require("./app/routes/book.route"); // Thêm dòng này
const ApiError = require("./app/api-error"); // Tẹo nữa mình tạo file này sau
const readersRouter = require("./app/routes/reader.route");
const borrowRouter = require("./app/routes/borrow.route");
const publishersRouter = require("./app/routes/publisher.route");
const staffRouter = require("./app/routes/staff.route");
const categoriesRouter = require("./app/routes/category.route");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/books", booksRouter); // Thêm dòng này
// Đường dẫn mặc định để kiểm tra xem server chạy chưa

app.get("/", (req, res) => {
    res.json({ message: "Chào mừng bà đến với Hệ thống Quản lý mượn trả sách." });
});
app.use("/api/categories", categoriesRouter);
app.use("/api/readers", readersRouter); // Thêm dòng này

app.use("/api/publishers", publishersRouter);
app.use("/api/staff", staffRouter);
app.use("/api/borrow", borrowRouter);
module.exports = app;