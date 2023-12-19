import express from 'express';

const app = express()
//create handlers
app.use('/', (req, res) => {
    console.log('Root route hit');

    res.send("Hello, youuuu!");
})

app.listen(3000, () => {
    console.log('Hola Sheila, Server listening on port 3000');
})
