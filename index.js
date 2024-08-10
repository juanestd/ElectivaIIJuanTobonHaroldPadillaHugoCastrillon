const express = require("express");
const app = express();
const port = 3000;

const router = require('./routes/apiRoutes');

app.use(express.json());
app.use('/api', router);
    
app.listen(port, () => {
    console.log(`this app listening to ${port}`);
});
