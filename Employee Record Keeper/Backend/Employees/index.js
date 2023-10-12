const employeeRouter = require('./routes/employeeRoute');
const employeeDocRouter = require('./routes/employeeDocsRoute');
const express = require('express');
const cors = require('cors');
const path = require('path');
require('./connection');
const app = express();

const PORT = process.env.PORT || 8000;
app.use('/dyn',express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'dist/employee')));
app.use(cors());
app.use(express.json());
app.use(employeeRouter);
app.use(employeeDocRouter);

app.listen(PORT, ()=> {
    console.log('connection on port: ', PORT);
})

