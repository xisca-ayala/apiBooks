const {pool} = require("../database");
const Response = require("../models/response");
const User = require("../models/user");

const createUser = async (req, res) => {
    let response = new Response (false, 200, "Usuario creado correctamente", null);
    let user = new User(null, 
                        req.body.name, 
                        req.body.last_name,
                        req.body.email, 
                        req.body.photo, 
                        null);
    try{
        let sqlEmail = "SELECT email FROM user WHERE email = '" + user.email + "'";
        let [checkEmail] = await pool.query(sqlEmail);
        if(checkEmail.length){
            response.err = true;
            response.message = 'Ya existe un usuario con este email';
        } else {
            let sql = "INSERT INTO user (name, last_name, email, photo, password)" +
            "VALUES ('" + user.name + "', '" +
            user.last_name + "', '" +
            user.email + "','" +
            user.photo + "','" +
            user.password + "')";
            await pool.query(sql);
            let sqlUser = "SELECT id_user FROM user WHERE email = '" + user.email + "'";
            let [userId] = await pool.query(sqlUser);
            user.id_user = userId[0].id_user;
            response.data = user;
        }
        res.send(response);
    }catch(err){
        console.error(err);
    }
}

const login = async (req, res) => {
    let response = new Response(false, 200, "Login correcto", null);
    try{
        let sql = "SELECT * FROM user WHERE user.email = '" + req.body.email + "' AND user.password = '" + req.body.password + "'";
        let [result] = await pool.query(sql);
        if(result.length){
            response.data = new User(result[0].id_user, result[0].name, result[0].last_name, result[0].email, result[0].photo, null);
        } else {
            response.err = true;
            response.message = "Login incorrecto";
            response.code = 400; 
        }
        res.send(response);
    }catch(err){
        console.error();(err);
    }
}

module.exports = { createUser, login }
