const employeeRouter = require('./routes/employeeRoute');
const express = require('express');
const cors = require('cors');
const path = require('path');
require('./connection');
const app = express();

const PORT = process.env.PORT || 8000;
app.use('/dyn',express.static(path.join(__dirname, 'public')));

app.use(express.static(path.join(__dirname, '/dist/employee')));

console.log(path.join(__dirname, 'multerData'),"---------------dirname");
app.use(cors());
app.use(express.json());
app.use('/',employeeRouter);

app.listen(PORT, ()=> {
    console.log('connection on port: ', PORT);
})

