const {Router} = require("express");
const router = Router();
const bookCtrl = require("../controller/book.controller.js"); 

router.get("/books", bookCtrl.getUserBooks);

// router.get("/books", bookCtrl.getUserBook);

router.post("/books", bookCtrl.createBook);

router.put("/books", bookCtrl.updateBook);

router.delete("/books", bookCtrl.deleteBook);

module.exports = router; 