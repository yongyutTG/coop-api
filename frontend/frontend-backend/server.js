require('dotenv').config();

const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(cors());
app.use(express.json());


// MEMBER API
app.get('/api/members/:memid/full',

    async (req, res) => {

        try {

            const response = await axios.get(

                `${process.env.COOP_API_URL}/api/members/${req.params.memid}/full`,

                {
                    headers: {
                        'x-api-key':
                            process.env.COOP_API_KEY
                    }
                }
            );

            res.json(response.data);

        } catch (err) {

            console.error(err.message);

            res.status(500).json({
                status: 'error',
                message: 'Cannot connect coop-api'
            });
        }
    }
);
console.log(process.env.COOP_API_URL);

app.listen(4000, () => {

    console.log(
        'Frontend Backend running on 4000'
    );
});