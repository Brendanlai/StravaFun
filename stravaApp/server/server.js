require("dotenv").config();
const express = require('express');
const db = require("./db")

const morgan = require('morgan');
const app = express();

// middleware - order of middleware MATTERS (executes top to bottom)
// app.use(morgan("dev"))
app.use(express.json())

// get all user
app.get("/api/v1/users", async (req, res) => {
    try {
        const results = await db.query("SELECT * from users");
        console.log(results);
        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data: {
                user: results.rows
            }
        });
        
    } catch (err) {
        console.log(err)
    }
});

// get specific user
app.get("/api/v1/users/:userId", async (req, res) => {
    try {
        const results = await db.query("SELECT * from users where id = $1", [
            req.params.userId
        ]);
        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data: {
                user: results.rows
            }
        });
        
    } catch (err) {
        console.log(err)
    }
});

// create user
app.post("/api/v1/users", async (req, res) => {
    try {
        const results = await db.query("INSERT INTO users (name, email, location) values ($1, $2, $3) RETURNING *",[
            req.body.name, req.body.email, req.body.location]);
        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data: {
                user: results.rows[0]
            }
        });
        
    } catch (err) {
        console.log(err)
    }
});

// update user
app.put("/api/v1/users/:userId", async (req, res) => {
    try {
        const results = await db.query("UPDATE users SET name = $1, email = $2, location = $3 WHERE id = $4 RETURNING *",[
            req.body.name, req.body.email, req.body.location, req.params.userId]);
        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data: {
                user: results.rows[0]
            }
        
        });
        
    } catch (err) {
        console.log(err)
    }
});

// delete user
app.delete("/api/v1/users/:userId", async (req, res) => {
    try {
        const results = await db.query("DELETE FROM users where id = $1", [req.params.userId]);
        res.status(200).json({
            status: "success",
        });
        
    } catch (err) {
        console.log(err)
    }
});

// Set up
const port = process.env.PORT ||  8000;

app.listen(port, () => {
    console.log(`App is running and listening on ${port}`);
});

