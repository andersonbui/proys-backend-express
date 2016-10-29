var express = require("express");
var router = express.Router();

router.get("/",(req,res,next)=>{
    //let nombre = req.query.nombre;
    req.db.query("SELECT * FROM profesor",(err,results)=>{
        if(err){
            res.status(500).send({msg:"Error en consulta"});
        }else{
            if(results.length > 0){
                res.send(results);
            }else{
                res.status(404).send([]);
            }
        }
    });
    //res.send({msg:"entro en get",nombre});
});

router.get("/:id",(req,res,next)=>{
    let id = req.params.id;
    req.db.query("SELECT * FROM usuario WHERE idusuario = ?",[id],(err,results)=>{
        if(err){
            res.status(500).send({msg:"Error en consulta"});
        }else{
            if(results.length > 0){
                res.send(results[0]);
            }else{
                res.status(404).send({msg:"Usuario no encontrado"});
            }
        }
    });
    //res.send({msg:"entro en get",nombre});
});

router.post("/",(req,res,next)=>{
    let body = req.body;
   req.db.query("INSERT INTO usuario SET ?",body,(err,result)=>{
        if(err){
            res.send({success:false});
        }else{
           res.send({success:true});
        }
    });

});

router.put("/:id",(req,res,next)=>{
    let body = req.body;
    let id = req.params.id;
    req.db.query("UPDATE usuario SET ? WHERE idusuario = ? ",[body,id],(err,result)=>{
    if(err){
            res.send({success:false});
        }else{
           res.send({success:true});
        }
    });

});

router.delete("/:id",(req,res,next)=>{
    let id = req.params.id;
    req.db.query("DELETE FROM usuario WHERE idusuario = ? ",[id],(err,result)=>{
    if(err){
            res.send({success:false});
        }else{
           res.send({success:true});
        }
    });
});

router.post("/login",(req,res,next)=>{
    let body = req.body;
    req.db.query("SELECT * FROM usuario WHERE user = ? AND pass = ?",[body.user,body.pass],(err,result)=>{
    if(err){
            res.send({success:false,err:"error"});
        }else{
            if(result.length > 0){
                let user = result[0];
                delete user.pass;
                //delete user.user;
                //encriptacion CryptoJS
                //Para crear token de sesion JSONToken
                res.send({success:true,user:user})
            }else{
                res.send({success:false,msg:"contrasenia o usuario incorrecto"});
            }
        }
    });
})

module.exports = router;
