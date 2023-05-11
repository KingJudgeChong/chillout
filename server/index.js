require('dotenv').config()

const express = require('express')
const cors = require('cors')
const app = express()

const bodyParser = require('body-parser')

const PORT = 8000

const Pool = require('pg').Pool

const pool = new Pool({
    user: process.env.user,
    host: process.env.host,
    database: process.env.database,
    password: process.env.password,
    port: process.env.port
})

app.use(cors({
    origin: ["http://localhost:3000"]}))


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

// get, put, post, delete
// app.get('/', (request, response) => {
//     // response.send()
//     response.json("Hello World")
// })

// app.get('/all-users', (request, response) => {
//     pool.query('SELECT * FROM users', (error, results) => {
//         if (error) {
//             throw error;
//         }
//         response.status(200).json(results.rows)
//     })
// })

// app.get('/all-userss', (request, response) => {
//     pool.query('SELECT * FROM users', (error, results) => {
//         if (error) {
//             throw error;
//         }
//         response.status(200).json(results.rows)
//     })
// })

// app.get('/get-user/:id', (request, response) => {
//     const id = request.params.id

//     pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
//         if (error) {
//             throw error;
//         }
//         response.status(200).json(results.rows)
//     })
// })

//post
app.post('/add-user', (request, response) => {
    const { username, email, password } = request.body

    pool.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3)', [username, email, password], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(201).send('User added')
    })
})

app.post('/auth', (request, response) => {
    console.log("hit accessing auth route ")
    console.log(request.body)
    const usernameOrEmail = request.body.usernameOrEmail
    const password = request.body.password

    pool.query("SELECT password FROM users WHERE username = $1 OR email = $1", [usernameOrEmail], (error, results) => {
        if (error) {
            throw error;
            
        }
        if (results.rows.length == 0) {
            response.status(401).send(`Can't find username!`)
            console.log('No username')
        }
        
        else if (password === results.rows[0].password){
            response.status(200).send('User authenticated correct password provided')
            
        }
        else {
            response.status(401).send('Wrong password provided')
        }

    })   
})


app.post('/posts', (request, response) => {

    const { section, description, datetime, venue, created_at } = request.body

    pool.query("INSERT INTO posts (category_type_id, description, start_at, venue, created_at) VALUES ($1, $2, $3, $4, $5)", [section, description, datetime, venue, created_at], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(201).send('Post added!')
    })
})


app.get('/posts', (request, response) => {
    pool.query(`
    SELECT      c.name AS "category"
                , ct.name AS "interest"
                , ct.photo_img AS "photo_img"
                , p.*
                , u.username
    FROM        posts p
    INNER JOIN  category_types ct
    ON          p.category_type_id = ct.id
    INNER JOIN  categories c
    ON          ct.category_id = c.id
    LEFT JOIN   users u
    ON          p.user_id = u.user_id
    WHERE       p.start_at >= NOW()
    ORDER BY    p.start_at ASC;`, [], (error, results) =>{
        response.json(results.rows)
    })
})

app.get('/categories/:id/category_types', (request, response) => {
    const category_id = request.params.id

    pool.query("SELECT * FROM category_types WHERE category_id=$1", [category_id], (error, results) =>{
    
        response.json(results.rows)
    })
})

app.get('/categories', (request, response) => {
    pool.query("SELECT * FROM categories", [], (error, results) =>{
        response.json(results.rows)
        
    })
})



//put is use for whole data changes
// app.put('/update-user/:id', (request, response) => {
//     const id = request.params.id
//     const { name, email } = request.body

//     pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3', [name, email, id], (error, results) => {
//         if (error){
//             throw error
//         }
//         response.status(200).send('User updated')
//     })
// })

//patch is use for partial data only

//delete
// app.delete('/delete-user/:id', (request, response) => {
//     const id = request.params.id

//     pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
//         if (error){
//             throw error
//         }
//         response.status(200).send(`User with id = ${id} is deleted`)
//     })
// })



app.listen(PORT, () => {
    console.log(`Listening to PORT ${PORT}...`)
})