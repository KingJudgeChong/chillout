require('dotenv').config()

const auth = require('./middleware/auth')
const { generateToken } = require('./generateToken.js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
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

app.post('/add-user', async (request, response) => {
    const { username, email, firstName, lastName, contactNo, password } = request.body
    const encryptedPassword =  await bcrypt.hash(password, 10)
    pool.query('INSERT INTO users (username, email, first_name, last_name, contact_no, password) VALUES ($1, $2, $3, $4, $5, $6) RETURNING user_id, username, email', [username, email, firstName, lastName, contactNo, encryptedPassword], (error, results) => {
        if (error) {
            throw error;
        }
        const user = results.rows[0]
        const token = jwt.sign(
            { user_id: user.user_id, username: user.username, email: user.email },
            process.env.TOKEN_KEY,
            {
              expiresIn: "2h",
            }
          );
          user.token = token
        response.status(201).send(user)
    })
})

app.post('/verify', (request, response) => {
    const token = request.body.token
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY)
        console.log(decoded)
        
        response.status(200).send('verified')
    }
    catch (error){
        console.log('jwt invalid')
        response.status(401).send('not verified')
    }

})

app.post('/auth', (request, response) => {
    console.log("hit accessing auth route ")
    console.log(request.body)
    const usernameOrEmail = request.body.usernameOrEmail
    const password = request.body.password
    
    
    pool.query("SELECT user_id, username, email, password FROM users WHERE username = $1 OR email = $1", [usernameOrEmail], async (error, results) => {
        if (error) {
            throw error;
            
        }
        if (results.rows.length == 0) {
            console.log('No username')
            return response.status(401).send(`Can't find username!`)
        }
        const { user_id, username, email  } = results.rows[0]
        const user = { user_id, username, email } 
        const userPassword = results.rows[0].password
        const isValidPassword = await bcrypt.compare(password, userPassword)  
        if (isValidPassword){
            const token = generateToken(user)
            return response.status(200).send({token, ...user})
            
        }
        else {
            response.status(401).send('Wrong password provided')
        }

    })   
})

app.use(auth)
app.post('/posts', (request, response) => {
    const { section, description, datetime, venue, created_at } = request.body
    try {
        pool.query("INSERT INTO posts (category_type_id, description, start_at, venue, created_at, user_id) VALUES ($1, $2, $3, $4, $5, $6)", [section, description, datetime, venue, created_at, request.user.user_id], (error, results) => {
            if (error) {
                throw error;
            }
            response.status(201).send('Post added!')
        })
    }
    catch (error){
        console.log('jwt invalid')
        response.status(401).send('not verified')
    }
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