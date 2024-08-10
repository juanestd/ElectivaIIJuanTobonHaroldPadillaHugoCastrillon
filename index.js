const express = require("express");
const app = express();
const port = 3000;

app.get('/', (request, response) => {
    res.send('Hola, esta es una petición sencilla');
});
    
app.listen(port, () => {
    console.log(`this app listening to ${port}`);
});
