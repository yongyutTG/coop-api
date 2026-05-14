const express = require('express');
const cors = require('cors');
const memberRoute = require('./modules/member-full/routes/member-full.route');
const app = express();

app.set('trust proxy', 1);
const validateApiKey = require('./middlewares/apiKey');

app.use(cors());
app.use(express.json());

//protect API
//app.use('/api', validateApiKey);
app.use('/api/members', memberRoute);
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,  // 15 นาที
    max: 100  
});
app.use(limiter);
module.exports = app;


