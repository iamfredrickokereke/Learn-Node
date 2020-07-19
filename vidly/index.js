const express = require('express');

const app = express();

// default route
app.get('/', (request, response) => { response.send('Welcome to Vidly Rental service!!!')})

// app.get()

// app.post()

// app.put()

// app.delete()

const port = process.env.PORT || 3000;

app.listen(port, () => {console.log(`Server is running on port ${port} `);
})

