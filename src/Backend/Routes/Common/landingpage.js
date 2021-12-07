const express = require("express") ;
var router = express.Router() ;


router.get("/" , (req , res) => {
    console.log("Hello at landing page") ;
    res.send("<h1>Welcome to the Covid Saver app</h1>") ;
})

module.exports = router ;