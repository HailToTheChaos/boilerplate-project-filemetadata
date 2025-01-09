var express = require('express');
var cors = require('cors');
const path = require('path');
const multer = require('multer');
var app = express();

const upload = multer({ dest: 'uploads/' })

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});


/**
 * 1. Debes proporcionar tu propio proyecto, no la URL de ejemplo.
 * 2. Puedes enviar un formulario que incluya una carga de archivo.
 * 3. El campo de entrada del archivo de formulario tiene el atributo
 *  name establecido en upfile.
 * 4. Cuando envíes un archivo, recibirás él name, type y size del
 *  archivo en bytes dentro de la respuesta JSON.
 */
app.post('/api/fileanalyse', upload.single("upfile"),
    function (req, res, next) {
        let file = req.file

        if (file) {
            res.json({
                name: req.file.originalname,
                type: req.file.mimetype, size: req.file.size
            })
            next()
        }
    }
)


const port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('Your app is listening on port ' + port)
});
