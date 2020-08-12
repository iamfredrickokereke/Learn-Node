const express = require('express');
const router = express.Router();



router.get('/', (request, response) => { 

    if (request.url == '/') {
      // return response.send('Welcome to Vidly Rental service!!!')

      return response.render('index', { title: 'Simple Express router', message: 'This is my first pug rendering'})
    }else{
        return response.send('oops not found')
    }

})


module.exports = router;