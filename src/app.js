const express = require("express");
const cors = require("cors");
const errorHandling = require("./error/errorHandling");
const userRouters = require("./routers/user.routers");
const bookRouters = require("./routers/book.routers");

const app = express();

app.set('port', process.env.PORT || 3000);

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(userRouters);
app.use(bookRouters);
app.use(errorHandling);

// app.get("/", function(req, res){
//     res.status(200).send({ok: true,
//         message: 'Recibido!'});
// });

// app.get("/bye", function(req, res){
//     res.status(200).send({ok: true,
//         message: 'Adios!'});
// });

module.exports = app; 