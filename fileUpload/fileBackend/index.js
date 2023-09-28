require('./connection');
const fileRouter = require('./routes/fileRoutes');
const express = require('express');
const cors = require('cors');
const app = express();

const port = process.env.PORT || 8000;
// cors allow all origins
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/', fileRouter);

app.listen(port, ()=> {
    console.log("server run at port no. :", port);
})
