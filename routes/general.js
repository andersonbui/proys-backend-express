var express = require("express");
var router = express.Router();
var where = '-';

/**
 * ejemplo de consulta a: http://127.0.0.1:8080/general/select
 * {
	    "nombretabla":"profesor",
	    "nombreatributos":["idusuario","oficina"],
	    "atributos":{
		    "idusuario": "1",
		    "oficina": "321"
	    }
    }
 */
router.post("/select", (req, res, next) => {
    let body = req.body;
    let tabla = body.nombretabla;

    var consulta = "SELECT * FROM " + tabla + " ";

    if (body.nombreatributos != null && body.atributos != null) {
        let where = "";
        let listaatribs = [];
        //arma la condicon where
        for (i = 0; i < body.nombreatributos.length; i++) {
            let colname = body.nombreatributos[i];
            where += (i == 0 ? " " : " and ") + body.nombreatributos[i] + " = '" + body.atributos[colname] + "'";
        }
        //une la condicion where al resto de la sentencia delete
        consulta = "SELECT * FROM " + tabla + " WHERE " + where;
    }

    req.db.query(consulta, (err, results) => {
        if (err) {
            res.status(500).send({ msg: "Error en consulta r" });
        } else {
            if (results.length > 0) {
                res.send(results);
            } else {
                res.status(404).send({ msg: " no encontrado" });
            }
        }
    });
});

/**
 * ejemplo insertar a:  http://localhost:8080/general/insert/profesor
 * 
 * cuerpo: {"nombre":"aaaaa","telefono":"","email":"","oficina":"123"}
 */
router.post("/insert/:tabla", (req, res, next) => {
    let tabla = req.params.tabla;
    let body = req.body;
    req.db.query("INSERT INTO " + tabla + " SET ? ", body, (err, result) => {
        if (err) {
            res.send({ success: false, body });
        } else {
            res.send({ success: true, body });
        }
    });

});

/**
 * ejemplo consulta al: http://localhost:8080/general/delete
 * body:
 * {	"nombretabla":"profesor",
	    "nombreatributos":["nombre","oficina"],
	    "atributos":{
            "nombre": "aaaaa",
            "oficina": "123"
        }
    }
 */
router.post("/delete", (req, res, next) => {
    let body = req.body;
    let tabla = body.nombretabla;

    var consulta = "DELETE FROM " + tabla + " where false ";

    if (body.nombreatributos != null && body.atributos != null) {
        let where = "";
        let listaatribs = [];
        //arma la condicon where
        for (i = 0; i < body.nombreatributos.length; i++) {
            let colname = body.nombreatributos[i];
            where += (i == 0 ? " " : " and ") + body.nombreatributos[i] + " = '" + body.atributos[colname] + "'";

        }
        //une la condicion where al resto de la sentencia delete
        consulta = "DELETE FROM " + tabla + " WHERE " + where;
    }

    console.log("consulta delete: " + consulta);
    //ejecuta sentencia
    req.db.query(consulta, (err, results) => {
        if (err) {
            res.status(500).send({ msg: "No se realizao el delete:", err });
        } else {
            if (results.affectedRows > 0) {
                res.send(results);
            } else {
                res.status(404).send({ msg: " no encontrado", results });
            }
        }
    });
});
/**
 * ejemplo consulta a: http://localhost:8080/general/update
 * cuerpo: 
 * {
	"nombretabla":"profesor",
	"nombreatributos":["nombre","oficina"],
	"atributos":{
		"nombre": "aaaaa",
		"oficina": "123"
	},
	"actualizacion":{
    	"nombre": "Sergio Boraz",
    	"telefono": "123123",
    	"email": "sergiob@gmail.com",
		"oficina": "1234"
	}
}
 */
router.post("/update", (req, res, next) => {
    let body = req.body;
    let tabla = body.nombretabla;
    var cuerpo = {};

    var consulta = "UPDATE " + tabla + " SET ? where false ";

    if (body.nombreatributos != null && body.atributos != null && body.actualizacion != null) {
        let where = "";
        let listaatribs = [];
        cuerpo = body.actualizacion;
        //arma la condicon where
        for (i = 0; i < body.nombreatributos.length; i++) {
            let colname = body.nombreatributos[i];
            where += (i == 0 ? " " : " and ") + body.nombreatributos[i] + " = '" + body.atributos[colname] + "'";

        }
        //une la condicion where al resto de la sentencia delete
        consulta = "UPDATE " + tabla + " SET ? WHERE " + where;
    }
    //res.send({ msg: "No se realizao el update:"+consulta });
    console.log("consulta delete: " + consulta);
    //ejecuta sentencia
    req.db.query(consulta, [cuerpo], (err, results) => {
        if (err) {
            res.status(500).send({ msg: "No se realizao el update:", err });
        } else {
            if (results.affectedRows > 0) {
                res.send(results);
            } else {
                res.status(404).send({ msg: " no encontrado", results });
            }
        }
    });
});

module.exports = router;
