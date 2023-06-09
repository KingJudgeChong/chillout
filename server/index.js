require("dotenv").config();

const auth = require("./middleware/auth");
const { generateToken } = require("./generateToken.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const express = require("express");
const cors = require("cors");
const app = express();

const bodyParser = require("body-parser");

const PORT = 8000;

const Pool = require("pg").Pool;

const pool = new Pool({
  user: process.env.user,
  host: process.env.host,
  database: process.env.database,
  password: process.env.password,
  port: process.env.port,
});

app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.post("/add-user", async (request, response) => {
  const { username, email, firstName, lastName, contactNo, password } =
    request.body;
  const encryptedPassword = await bcrypt.hash(password, 10);
  pool.query(
    "INSERT INTO users (username, email, first_name, last_name, contact_no, password) VALUES ($1, $2, $3, $4, $5, $6) RETURNING user_id, username, email",
    [username, email, firstName, lastName, contactNo, encryptedPassword],
    (error, results) => {
      if (error) {
        throw error;
      }
      const user = results.rows[0];
      const token = jwt.sign(
        { user_id: user.user_id, username: user.username, email: user.email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      user.token = token;
      response.status(201).send(user);
    }
  );
});

app.post("/verify", (request, response) => {
  const token = request.body.token;
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    console.log(decoded);

    response.status(200).send("verified");
  } catch (error) {
    console.log("jwt invalid");
    response.status(401).send("not verified");
  }
});

app.post("/auth", (request, response) => {
  console.log("hit accessing auth route ");
  console.log(request.body);
  const usernameOrEmail = request.body.usernameOrEmail;
  const password = request.body.password;

  pool.query(
    "SELECT user_id, username, email, password FROM users WHERE username = $1 OR email = $1",
    [usernameOrEmail],
    async (error, results) => {
      if (error) {
        throw error;
      }
      if (results.rows.length == 0) {
        console.log("No username");
        return response.status(401).send(`Can't find username!`);
      }
      const { user_id, username, email } = results.rows[0];
      const user = { user_id, username, email };
      const userPassword = results.rows[0].password;
      const isValidPassword = await bcrypt.compare(password, userPassword);
      if (isValidPassword) {
        const token = generateToken(user);
        return response.status(200).send({ token, ...user });
      } else {
        response.status(401).send("Wrong password provided");
      }
    }
  );
});


app.use(auth);
app.post("/posts", async (request, response) => {
  const { section, description, datetime, venue, max_users } = request.body;
  try {
    await pool.query("BEGIN")
    const createdPostResult = await pool.query(
      "INSERT INTO posts (category_type_id, description, start_at, venue, created_at, updated_at, max_users, user_id) VALUES ($1, $2, $3, $4, NOW(), NOW(), $5, $6) RETURNING post_id, user_id",
      [section, description, datetime, venue, max_users, request.user.user_id],
    );
    const createdPost = createdPostResult.rows[0]
    await pool.query(
      "INSERT INTO post_users (post_id, user_id, joined_at) VALUES ($1, $2, NOW())",
      [createdPost.post_id, request.user.user_id,]
    ) 
    await pool.query("COMMIT")
    response.json(createdPost);
  } catch (error) {
    console.error(error)
    response.status(500).send("Something went wrong");
  }
});

app.post("/join-user", (request, response) => {
  const { post_id } = request.body;
  try {
      pool.query(
        "INSERT INTO post_users (post_id, user_id, joined_at) VALUES ($1, $2, NOW())", 
        [post_id, request.user.user_id],
      (error, results) => {
        if (error) {
          throw error;
        }
        response.status(201).send("User joined!");
      }
    );
  } catch (error) {
    console.log("jwt invalid");
    response.status(401).send("not verified");
  }
});

app.delete('/posts/:post_id/post_users', (request, response) => {
  const { post_id } = request.params
  pool.query('DELETE FROM post_users WHERE user_id = $1 AND post_id = $2', [request.user.user_id, post_id], (error, results) => {
      if (error){
          throw error
      }
      response.status(200).send(`User in post_id = ${post_id} with user_id = ${request.user.user_id} is deleted`)
  })
})

app.delete('/posts/:post_id', async (request, response) => {
  const { post_id } = request.params
  try {
    await pool.query('DELETE FROM posts WHERE post_id = $1 AND user_id = $2', [post_id, request.user.user_id])
    response.status(200).send(null)
  }
  catch (error) {
    console.error(error)
  }
})

app.put("/posts/:post_id/", async (request, response) => {
const { post_id } = request.params
const { section, description, datetime, venue, max_users } = request.body;
  try {
    await pool.query(
      "UPDATE posts SET category_type_id = $1, description = $2, start_at = $3, venue = $4, max_users = $5, updated_at = NOW() WHERE user_id = $6 AND post_id = $7 RETURNING user_id, post_id",
      [section, description, datetime, venue, max_users, request.user.user_id, post_id],);
    response.status(200).send("POST UPDATED!")
    }
    catch (error) {
      console.error(error)
    }
})

app.get("/post_users/:post_id", async (request, response) => {
  const { post_id } = request.params
  try {
    const postUsersResults = await pool.query(
      "SELECT p.*, u.username FROM post_users p INNER JOIN users u ON p.user_id = u.user_id WHERE post_id = $1",
      [post_id],
    )
    response.json(postUsersResults.rows)
  }
  catch (error) {
    console.error(error)
  }
})

app.get("/posts-locations", async (request, response) => {
  try {
    const postVenueResults = await pool.query(
    "SELECT venue FROM posts",
  [],
   )
   response.json(postVenueResults.rows)
    }
    catch (error) {
      console.error(error)
    }
})

app.get("/posts", (request, response) => {
  const { categoryId, categoryTypeId } = request.query;
  if (categoryId && categoryTypeId) {
    pool.query(
      `SELECT      c.name AS "category"
                , c.id AS "category_id"
                , ct.name AS "interest"
                , ct.photo_img AS "photo_img"
                , p.*
                , u.username
                , COUNT(DISTINCT pu.post_user_id) AS "ongoing_count"
                , pu2.post_user_id IS NOT NULL AS "is_joined_already"
        FROM        posts p
        INNER JOIN  category_types ct
        ON          p.category_type_id = ct.id
        INNER JOIN  categories c
        ON          ct.category_id = c.id
        LEFT JOIN   users u
        ON          p.user_id = u.user_id
        LEFT JOIN   post_users pu
        ON          p.post_id = pu.post_id
        LEFT JOIN   post_users pu2
        ON          p.post_id = pu2.post_id AND pu2.user_id = $3
        WHERE       p.start_at >= NOW()
        AND         c.id = $1
        AND         ct.id = $2
        GROUP BY    c.name
                  , ct.name
                  , ct.photo_img
                  , p.*
                  , p.post_id
                  , u.username
                  , pu2.post_user_id
                  , c.id
        ORDER BY    p.start_at ASC;`,
      [categoryId, categoryTypeId, request.user.user_id],
      (error, results) => {
        if (error) {
          console.log(error);
          return response.json([]);
        }
        response.json(results.rows);
      }
    );
  } else if (categoryId) {
    pool.query(
      `SELECT      c.name AS "category"
                , ct.name AS "interest"
                , c.id AS "category_id"
                , ct.photo_img AS "photo_img"
                , p.*
                , u.username
                , COUNT(DISTINCT pu.post_user_id) AS "ongoing_count"
                , pu2.post_user_id IS NOT NULL AS "is_joined_already"
        FROM        posts p
        INNER JOIN  category_types ct
        ON          p.category_type_id = ct.id
        INNER JOIN  categories c
        ON          ct.category_id = c.id
        LEFT JOIN   users u
        ON          p.user_id = u.user_id
        LEFT JOIN   post_users pu
        ON          p.post_id = pu.post_id
        LEFT JOIN   post_users pu2
        ON          p.post_id = pu2.post_id AND pu2.user_id = $2
        WHERE       p.start_at >= NOW()
        AND         c.id = $1
        GROUP BY    c.name
                  , ct.name
                  , ct.photo_img
                  , p.*
                  , p.post_id
                  , u.username
                  , pu2.post_user_id
                  , c.id
        ORDER BY    p.start_at ASC;`,
      [categoryId, request.user.user_id],
      (error, results) => {
        if (error) {
          console.log(error);
          return response.json([]);
        }
        response.json(results.rows);
      }
    );
  } else if (categoryTypeId) {
    pool.query(
      `SELECT      c.name AS "category"
                , ct.name AS "interest"
                , c.id AS "category_id"
                , ct.photo_img AS "photo_img"
                , p.*
                , u.username
                , COUNT(DISTINCT pu.post_user_id) AS "ongoing_count"
                , pu2.post_user_id IS NOT NULL AS "is_joined_already"
        FROM        posts p
        INNER JOIN  category_types ct
        ON          p.category_type_id = ct.id
        INNER JOIN  categories c
        ON          ct.category_id = c.id
        LEFT JOIN   users u
        ON          p.user_id = u.user_id
        LEFT JOIN   post_users pu
        ON          p.post_id = pu.post_id
        LEFT JOIN   post_users pu2
        ON          p.post_id = pu2.post_id AND pu2.user_id = $2
        WHERE       p.start_at >= NOW()
        AND         ct.id = $1
        GROUP BY    c.name
                  , ct.name
                  , ct.photo_img
                  , p.*
                  , p.post_id
                  , u.username
                  , pu2.post_user_id
                  , c.id
        ORDER BY    p.start_at ASC;`,
      [categoryTypeId, request.user.user_id],
      (error, results) => {
        if (error) {
          console.log(error);
          return response.json([]);
        }
        response.json(results.rows);
      }
    );
  } else {
    pool.query(
      `SELECT      c.name AS "category"
                , ct.name AS "interest"
                , c.id AS "category_id"
                , ct.photo_img AS "photo_img"
                , p.*
                , u.username
                , COUNT(DISTINCT pu.post_user_id) AS "ongoing_count"
                , pu2.post_user_id IS NOT NULL AS "is_joined_already"
        FROM        posts p
        INNER JOIN  category_types ct
        ON          p.category_type_id = ct.id
        INNER JOIN  categories c
        ON          ct.category_id = c.id
        LEFT JOIN   users u
        ON          p.user_id = u.user_id
        LEFT JOIN   post_users pu
        ON          p.post_id = pu.post_id
        LEFT JOIN   post_users pu2
        ON          p.post_id = pu2.post_id AND pu2.user_id = $1
        WHERE       p.start_at >= NOW()
        GROUP BY    c.name
                  , ct.name
                  , ct.photo_img
                  , p.*
                  , p.post_id
                  , u.username
                  , pu2.post_user_id
                  , c.id
        ORDER BY    p.start_at ASC;`,
      [request.user.user_id],
      (error, results) => {
        if (error) {
            console.log(error)
            return response.status(500).send(error)
          }
        console.log(results.rows)
        response.json(results.rows);
      }
    );
  }
});

app.get("/categories/:id/category_types", (request, response) => {
  const category_id = request.params.id;
  pool.query(
    "SELECT * FROM category_types WHERE category_id=$1",
    [category_id ? category_id : null],
    (error, results) => {
      if (error) {
        console.error(error);
        return response.status(500).send(error);
      }
      response.json(results.rows);
    }
  );
});

app.get("/categories", (request, response) => {
  pool.query("SELECT * FROM categories", [], (error, results) => {
    response.json(results.rows);
  });
});

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
  console.log(`Listening to PORT ${PORT}...`);
});
