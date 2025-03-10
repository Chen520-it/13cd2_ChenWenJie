const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql");
const connection = mysql.createConnection({
    host:"127.0.0.1",
    port:"3306",
    user:"root",
    password:"",
    database:"felveteli"
});

connection.connect(err =>{
    if(err){
        console.error('Adatbazis nincs osszekotve:', err);

    }
    else{
        console.log('Sikeres');
    }
});

app.use(cors());

app.get("/",(req, res) =>{
    res.send("Sikeres fut a backend")
})

app.listen(3000,() =>{
    console.log("Fut a szerver")
})

app.get("/osszpont", (req, res) =>{
    const database = " SELECT diakok.nev AS 'Tanuó neve', tagozatok.agazat AS 'Ágazat', (diakok.hozott+diakok.kpmagy+diakok.kpmat)AS 'Összes pontszám' FROM jelentkezesek INNER JOIN tagozatok ON jelentkezesek.tag = tagozatok.akod INNER JOIN diakok ON jelentkezesek.diak = diakok.oktazon;"
    connection.query(database, (err, result) =>{
        if(err){return res.json(err)}
        return res.json(result)
    })
})

app.get("/osszpont/osszpontszam", (req, res) =>{
    const database = ""
})

