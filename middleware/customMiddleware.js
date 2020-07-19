function log(req, res, next) {
    console.log('Logging to console');

    next();    
}