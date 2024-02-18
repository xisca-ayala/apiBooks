const {pool} = require("../database");
const Response = require("../models/response");
const Book = require("../models/book");

const getUserBooks = async (req, res) => {
    let response = new Response (false, 200, "Éxito en el proceso de devolver libros", null);
    if(req.query.id_book){
        try{
            let sql = "SELECT * FROM book WHERE id_user = " + req.query.id_user + " AND id_book = '" + req.query.id_book + "'";
            let [result] = await pool.query(sql);
            if(result.length){
                response.data = result;
                console.log(result);
                response.message = "Éxito en el proceso de devolver libro";
            }else{
                response.err = true; 
                response.message = "No existe un libro con este id";
                response.code = 404; 
            }
            res.send(response);
        }catch(err){
            console.error(err);
            response.err = true; 
            response.message = "Fallo en el proceso de devolver libro";
            response.code = 400; 
            res.send(response);
        }
    } else {
        try{
            let sql = "SELECT * FROM book WHERE id_user = '" + req.query.id_user + "'";
            let [result] = await pool.query(sql);
            if(result.length) {
                response.data = result; 
            }else{
                response.err = true;
                response.message = "Fallo en el proceso de devolver libros"
                response.code = 400; 
            }
            res.send(response);
        }catch(err){
            console.log(err);
            response.err = true;
            response.message = "Fallo en el proceso de devolver libros"
            response.code = 400; 
            res.send(response);
        }
    }
}

const createBook = async (req, res) => {
    let response = new Response(false, 200, "Libro creado con éxito", null);
    let book = new Book(null, 
                    req.body.id_user, 
                    req.body.title, 
                    req.body.type,
                    req.body.author,
                    req.body.price,
                    req.body.photo);
    try{
        let sql = "INSERT INTO book (id_user, title, type, author, price, photo) " +
         "VALUES ('" + book.id_user + "','" +
                    book.title + "','" +
                    book.type + "','" +
                    book.author + "','" +
                    book.price + "','" +
                    book.photo + "')"; 
        let [result] = await pool.query(sql);
        res.send(response);
    }catch(err){
        response.message = "Fallo al intentar añadir un nuevo libro";
        response.code = 400; 
        response.err = true; 
        console.error(err);
        res.send(response);
    }
}

const updateBook = async (req, res) => {
    let response = new Response(false, 200, "Libro modificado con éxito", null);
    let book = new Book(req.body.id_book, 
        req.body.id_user, 
        req.body.title, 
        req.body.type,
        req.body.author,
        req.body.price,
        req.body.photo);
    try{
        let params = [
                    book.title,
                    book.type, 
                    book.author,
                    book.price,
                    book.photo,
                    book.id_book, 
                    book.id_user]
        let sql = "UPDATE book SET  " +
        "title = COALESCE(?, title), " +
        "type = COALESCE (?, type), " +
        "author = COALESCE(?, author), " +
        "price = COALESCE(?, price), " +
        "photo = COALESCE(?, photo) WHERE id_book = ? " +
        "AND id_user = ?"; 
        let[result] = await pool.query(sql, params);
        console.log(sql);
        console.log(params);
        console.log(result);
        response.data = book;
        res.send(response);
    }catch (err){
        console.error(err);
        response.message = "Fallo al intentar modificar un libro";
        response.code = 400; 
        response.err = true; 
        res.send(response);
    }
}

const deleteBook = async (req, res) => {
    let response = new Response(false, 200, "Libro eliminado con éxito", null);
    try{
        let sql = "DELETE FROM book WHERE id_book = " + req.query.id_book;
        let[result] = await pool.query(sql);
        res.send(response);
    }catch(err){
        console.error(err);
        response.message = "Fallo al intentar eliminar un libro";
        response.code = 400; 
        response.err = true; 
        res.send(response);
    }
}

module.exports = { getUserBooks,
                createBook,
                updateBook,
                deleteBook
                 }