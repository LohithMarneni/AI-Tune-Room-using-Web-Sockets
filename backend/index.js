require('dotenv').config();
const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const cors=require("cors");
const corsOptions=require("./config/corsOption");
const connectDB=require("./config/dbConn");
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
const PORT = process.env.PORT || 3500;
// Connect to MongoDB
connectDB();

// custom middleware logger
app.use(logger);

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

//serve static files
app.use('/', express.static(path.join(__dirname, '/public')));
//middleware for cookies
app.use(cookieParser());
// built-in middleware for json 
app.use(express.json());
app.use(cors(corsOptions));
app.use('/auth', require('./routes/authRoute'));

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});
app.use(errorHandler);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));