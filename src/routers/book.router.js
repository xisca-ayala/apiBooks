const {Router} = require("express");
const router = Router();
const bookCtrl = require("../controller/book.controller.js"); 

router.get("/book/:id", bookCtrl.getUserBooks);

router.get("/book/:id_user/:id_book", bookCtrl.getUserBook);

router.post("/book", bookCtrl.createBook);

router.put("/book", bookCtrl.updateBook);

router.delete("/book/:id", bookCtrl.deleteBook);



module.exports = router; 