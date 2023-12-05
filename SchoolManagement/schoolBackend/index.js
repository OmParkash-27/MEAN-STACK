const express = require('express');
require("./connection");
const studentRoute = require("./routes/studentRoute");
const teacherRoute = require("./routes/teacherRoute");
const subjectRoute = require("./routes/subjectRoute");
const studentAndSubRoute = require("./routes/studentAndSubRoute");
const studentAndTeaRoute = require("./routes/studentAndTeaRoute");
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/multerData", express.static(path.join(__dirname, "multerData")));
app.use(studentRoute);
app.use(teacherRoute);
app.use(subjectRoute);
app.use(studentAndSubRoute);
app.use(studentAndTeaRoute);

app.listen(port, ()=> {
    console.log("server use port no.", port);
});