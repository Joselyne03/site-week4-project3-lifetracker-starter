const express = require('express'); //Import the Express.js framework
const cors = require('cors'); // Import the CORS middleware
const morgan = require('morgan'); // Import the Morgan middleware for logging
const { PORT } = require("./config");
const authRoutes = require("./routes/auth");
const security = require('./middleware/security')

const {BadRequestError, NotFoundError} = require("./utils/errors");
const app = express();


app.use(cors()); // Enable CORS middleware to handle cross-origin requests
app.use(express.json()); // Parse incoming requests with JSON payloads
app.use(morgan("tiny")); // Use Morgan middleware with 'dev' format for request logging
app.use("/auth", authRoutes);
//for every requestcheck if a token exist
app.use(security.extractUserFromJwt);
app.use((req,res,next) => {
    next(new NotFoundError())
})

app.use((err,req,res,next)=> {
    const status = err.status || 500
    const message = err.message 

    return res.status(status).json ({
        error: {message,status },
    })
})

// app.get('/', (err,req,res,next) => {
//     if (err) {
//         console.error("Error starting the server: ", err);
//         res.status(500).json({
//           error: "An error occured while retrieving cars. Internal server error",
//         });
//       } else {
//             res.status(200).json({ ping: "pong" });
//       }
// })
app.get('/', (req,res,next) => {
    return res.status(200).json({ ping: "pong" })
})
app.listen(PORT, () => {
  console.log(`Server is running http://localhost:${PORT}`);
})
