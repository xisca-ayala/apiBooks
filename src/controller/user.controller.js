const {pool} = require("../database");

const createUser = async (req, res) => {
    try{
        let sql = "INSERT INTO user (name, last_name, email, photo, password)" +
        "VALUES ('" + req.body.name + "', '" +
        req.body.last_name + "', '" +
        req.body.email + "','" +
        req.body.photo + "','" +
        req.body.password + "')";
        let[result] = await pool.query(sql);
        res.send(result);
    }catch(err){
        console.error(err);
    }
}




module.exports = {
    createUser,
    
}
