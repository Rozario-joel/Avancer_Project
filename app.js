const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
const ProductRouter = require('./Routes/Products');
const Solution = require('./Routes/Solutions')
const Monitoring = require('./Routes/Monitoring')
const Variables = require('./Routes/Variables')

require('dotenv').config();
require('./Models/db');
const PORT = process.env.PORT 

app.get('/testing', (req, res) => {
    res.send('working fine');
});

app.use(bodyParser.json());
app.use(cors());
app.use('/auth', AuthRouter);
app.use('/prod', ProductRouter);

app.use('/auth', AuthRouter)

app.use('/deployment',Solution)
app.use('/monitor',Monitoring)

// not in use :⬇️

app.use('/update',Variables)

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})