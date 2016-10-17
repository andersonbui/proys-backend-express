var express = require("express");
var router = express.Router();

router.get("/",(req,res,next)=>{
    let nombre = req.query.nombre;
    res.send({msg:"entro en get",nombre});
});

router.post("/",(req,res,next)=>{
    let body = req.body;
    body.msg = "entro en el post";
    res.send(body);
    
});

router.put("/:id",(req,res,next)=>{
    let body = req.body;
    body.msg = "entro en el put";
    body.id = req.params.id;
    res.send(body);
    
});

router.delete("/:id",(req,res,next)=>{
    let id = req.params.id;
    res.send({msg:"entro en delete",id});
    
});

module.exports = router;