var express = require("express");
var router = express.Router();
var where = '-';

//var consulta = "SHOW KEYS FROM " + tabla + " WHERE key_name = 'PRIMARY'";

//router.get("/unid/:tabla/:colname-:valor", (req, res, next) => {
router.get("/unid/:tabla", (req, res, next) => {
    let tabla = req.params.tabla;
    let colname = req.query.colname;
    let valor = req.query.valor;
    let consulta = "SELECT * FROM " + tabla + " ";

    if (!((typeof (req.query.valor) == "undefined") || (typeof (req.query.colname) == "undefined"))) {
        consulta += " WHERE " + colname + " = " + valor;
    }

    req.db.query(consulta, (err, results) => {
        if (err) {
            res.status(500).send({ msg: "Error en consulta r" });
        } else {
            if (results.length > 0) {
                res.send(results);
            } else {
                res.status(404).send({ msg: table + " no encontrado" });
            }
        }
    });
});

//router.get("/unid/:tabla/:colname-:valor", (req, res, next) => {
router.post("/select", (req, res, next) => {
    let body = req.body;
    let tabla = body.nombretabla;

    let consulta = "SELECT * FROM " + tabla + " ";

    if (body.nombreatributos != null && body.atributos != null && body.atributos[body.nombreatributos] != null) {
        let colname = body.nombreatributos[0];
        let valor = body.atributos[colname];
        consulta += " WHERE " + colname + " = '" + valor + "'";
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

router.post("/delete", (req, res, next) => {
    let body = req.body;
    let tabla = body.nombretabla;

    let consulta = "DELETE FROM " + tabla + " WHERE  false";

    if (body.nombreatributos != null && body.atributos != null ) {
        let where = "";
        let listaatribs = [];
        for (i = 0; i < nombreatributos.length; i++) {
            let colname = body.nombreatributos[i];
            where += (i == 0 ? " " : " & ") + body.nombreatributos[i] + " = " + body.atributos[colname];
            //listaatribs.push(body.atributos[colname]);
        }
        //let valor = body.atributos[colname];
        consulta = "DELETE FROM " + tabla + " WHERE " + where;
    }

    console.log("consulta delete: " + consulta);
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

module.exports = router;
