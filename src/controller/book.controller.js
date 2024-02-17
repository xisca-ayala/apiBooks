const {pool} = require("../database");
const Response = require("../models/response");
const Book = require("../models/book");

const getUserBooks = async (req, res) => {
    console.log('BEGIN GET USER BOOKS');
    let response = new Response (false, 200, "Éxito en el proceso de devolver libros", null);
    try{
        let sql = "SELECT * FROM book WHERE id_user = '" + req.params.id_user + "'";
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
    }
}

const getUserBook = async (req, res) => {
    let response = new Response (false, 200, "Éxito en el proceso de devolver libro", null);
    try{
        let sql = "SELECT * FROM book WHERE id_user = " + req.params.id_user + " AND id_book = '" + req.params.id_book + "'";
        let [result] = await pool.query(sql);
        if(result.length){
            response.data = result;
        }else{
            response.err = true; 
            response.message = "Fallo en el proceso de devolver libro";
            response.code = 400; 
        }
        res.send(response);
    }catch(err){
        console.error(err);
    }
}

const createBook = async (req, res) => {
    let response = new Response(false, 200, "Libro creado con éxito", null);
    let book = new Book(null, 
                    id_user, 
                    req.body.title, 
                    req.body.type,
                    req.body.author,
                    req.body.price,
                    req.body.photo);
    try{
        let sql = "INSERT INTO book (id_user, title, type, author, price, photo) " +
         "VALUES ('" + book.title + "','" +
                    book.type + "','" +
                    book.author + "','" +
                    book.price + "'," +
                    book.photo + "')"; 
        let [result] = await pool.query(sql);
        if(result.length){
            response.data = result;
        } else {
           response.message = "Fallo al intentar añadir un nuevo libro";
           response.code = 400; 
           response.err = true; 
        }
        res.send(response);
    }catch(err){
        console.error(err);
    }
}

const updateBook = async (req, res) => {
    let response = new Response(false, 200, "Libro creado con éxito", null);
    let book = new Book(null, 
        id_user, 
        req.body.title, 
        req.body.type,
        req.body.author,
        req.body.price,
        req.body.photo);
    try{
        let params = [
                    req.body.id_book, 
                    req.body.id_user,
                    req.body.title,
                    req.body.type, 
                    req.body.author,
                    req.body.price,
                    req.body.photo]
        let sql = "UPDATE book SET  " +
        "title = COALESCE(?, title), " +
        "type = COALESCE (?, type), " +
        "author = COALESCE(?, author), " +
        "price = COALESCE(?, price), " +
        "photo = COALESCE(?, photo) WHERE id_book =? " +
        "AND id_user = ?"; 
        let[result] = await pool.query(sql, params);
        if(result.length){
            response.data = result;
        } else {
           response.message = "Fallo al intentar modificar un libro";
           response.code = 400; 
           response.err = true; 
        }
        res.send(result);
    }catch (err){
        console.error(err);
    }
}



const deleteBook = async (req, res) => {
    let response = new Response(false, 200, "Libro creado con éxito", null);
    try{
        let sql = sql = "DELETE FROM book WHERE id_book = " + req.params.id_book;
        let[result] = await pool.query(sql);
    }catch(err){
        console.error(err);
    }
}


module.exports = { getUserBooks, 
                getUserBook,
                createBook,
                updateBook,
                deleteBook
                 }