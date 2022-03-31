const express = require("express");
const path = require("path");
const router = express.Router();

router.use(express.static(path.join(__dirname,'../../../front')))

router.use((req, res, next) => {
    res.header({ 'Access-Control-Allow-Origin' : '*' })
    next()
})

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

exports.initializeRoutes = () => {
    return router;
}