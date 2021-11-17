const express = require('express');
const router = express();
const pool = require('../../database');
const jwtGenerator = require('../../utils/jwtGenerator');
const helper = require('../../lib/helpers')
const userController = {};

const { verifyToken } = require('../../middleware/authorization');

//Register

userController.register = async (req, res, next) => {
    try {

        const { username, password } = req.body;

        const user = await pool.query('SELECT * FROM usuarios WHERE username = $1', [username]);
        if (user.rows.length !== 0) {
            return res.status(401).json({ Error: 'Usuario existente' })
        }

        const passwordEncrypted = await helper.encryptPassword(password);

        const newUser = await pool.query('INSERT INTO usuarios( username, password) values($1,$2) RETURNING *'
            , [username, passwordEncrypted]);



        //generating out jwt token
        const accessToken = jwtGenerator.AccesToken(newUser.rows[0].iduser);
        const RefreshToken = jwtGenerator.RefreshToken(newUser.rows[0].iduser);
        res.json({ accessToken: accessToken, refreshToken: RefreshToken });





    } catch (error) {
        console.log(error);

    }
}

//login route
userController.login = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        const user = await pool.query('Select * from usuarios where username = $1', [username]);
        console.log(user.rows[0].idusuario)
        if (user.rows.length === 0) {
            res.status(400).json({
                error: 'Password or Email is incorrect'
            })
        }
        const validPassword = await helper.matchPassword(password, user.rows[0].password);
        if (!validPassword) {
            res.status(400).json({
                error: 'Password or Email is incorrect'
            })
        }


        const role = await pool.query(`select r.nombre rol from usuarios_roles ur inner join usuarios u on u.idusuario = ur.usuarios_id 
         inner join roles r on r.idrol = ur.roles_id where u.username =  $1` , [user.rows[0].username])
        console.log(role)

        const token = jwtGenerator.AccesToken(user.rows[0].idusuario);
        const refreshToken = jwtGenerator.RefreshToken(user.rows[0].idusuario);


        res.status(200).json({
            user: [
                {
                    id: user.rows[0].idusuario,
                    rol: role.rows[0].rol,
                }
            ]
            ,
            accessToken: token,
            refreshToken: refreshToken
        });





    } catch (error) {
        console.log(error);
    }
}

userController.verify = async (req, res, next) => {
    try {
        res.json(true);
    } catch (error) {
        res.json(false)
    }
}


router.get('/admin', verifyToken, async (req, res, next) => {
    try {
        res.json({ Bienvenida: 'Bienvenida comisión' });
    } catch (error) {

    }
})











module.exports =
    userController
    ;