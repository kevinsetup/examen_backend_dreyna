const express = require('express');
const router = express();
const pool = require('../../database');
const postsController = {};

postsController.insert = async (req, res, next) => {
    try {
        const { titulo, descripcion } = req.body;
        console.log(descripcion)
        await pool.query(`INSERT INTO posts(titulo, descripcion) values($1,$2)`, [titulo, descripcion])
        res.status(200).json({ Mensaje: "Agregado correctamente" })
    } catch (error) {
        console.log(error)
    }
}
postsController.readAll = async (req, res, next) => {
    try {
        const posts = await pool.query('select * from posts')
        res.status(200).json({ posts: posts.rows })
    } catch (error) {
        console.log(error)
    }
}
postsController.readFindById = async (req, res, next) => {
    try {
        const { id } = req.params;
        console.log(id)
        const posts = await pool.query('select * from posts where idpost = $1', [id])
        res.status(200).json({ posts: posts.rows[0] })
    } catch (error) {
        console.log(error)
    }
}
postsController.delete = async (req, res, next) => {
    try {
        const { id } = req.params;
        console.log(id)
       await pool.query('delete from posts where idpost = $1', [id])
       res.status(200).json({ Mensaje: "Eliminado correctamente" })
    } catch (error) {
        console.log(error)
    }
}
postsController.update = async (req, res, next) => {
    try {
        const { titulo , descripcion } = req.body;
        const { id } = req.params;
        console.log(id)
        const posts = await pool.query('update posts set titulo = $1, descripcion = $2 where idpost = $3 ', [titulo, descripcion, id])
        res.status(200).json({ Message : "Editado Correctamente" })
    } catch (error) {
        console.log(error)
    }
}



module.exports = postsController;