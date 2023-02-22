const bodyParser = require("body-parser");
const express = require("express");
const app = express();

const multer = require('multer'); //Form

app.use(express.static('.'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, './upload');
    },
    filename: function(req, file, callback){
        callback(null, `${Date.now()}_${file.originalname}`);
    }
});

const upload = multer({storage}).single('arquivo');

app.get('/teste', (req, res) => res.send('OK!'));
app.post('/upload', (req, res) => {
    upload(req, res, err => {
        if(err) return res.end('Ocorreu um erro');
    });
    res.end('Concluído com sucesso');
});
app.post('/formulario', (req, res) => {
    res.send({
        ...req.body,
        id: 7
    })
})
app.get('/parOuImpar', (req, res) => {
    // req.body recebe do front
    // req.query recebe do front ?numero=1
    // req.params recebe do front => '/parOuImpar/:numero
    const par = parseInt(req.query.numero) % 2 === 0;
    req.send({
        resultado: par ? 'par' : 'impar'
    });
})
app.listen(8080, () => console.log('Executando...'));