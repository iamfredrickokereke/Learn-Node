const express = require('express');

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.get('/', (request, response) => {
    response.send('Hello world');
} )

const port = process.env.PORT || 4000;

app.listen(port, () => {console.log(`Server is running on port ${port}`);
})