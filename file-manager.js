require('dotenv').config();

const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const { Readable } = require('stream');

var app = express();
var port = process.env.PORT || 8082;

app.use(bodyParser.json());

app.post('/save', (req, res) => {
  if(req.body.originalname){
    var buf = Buffer.from(req.body.buffer);
    let infoStream = bufferToStream(buf);
    let writeStream = fs.createWriteStream("./SAVE/" + req.body.originalname);
    infoStream.pipe(writeStream);
    res.send({msg:"Archivo recibido"});
    console.log("Archivo recibido: " + req.body.originalname);
  }else{
    res.status(404).send({msg:"Archivo nombre equivocado"});
  }
});

app.get('/get/**', (req, res) => {
  console.log("Archivo seleccionado: " + req.query.archivo);
  let readStream = fs.createReadStream("./SAVE/"+req.query.archivo+".zeus");
  var bufs = [];
  readStream.on('data', function(d){ bufs.push(d); });
  readStream.on('end', function(){var buf = Buffer.concat(bufs);
                                  console.log("Archivo enviado: " + req.query.archivo);
                                  res.send({archivo:req.query.archivo, buffer:buf});
                                });
});

console.log('Servicio de guardado y copia de archivos: ' + port);
app.listen(port);

function bufferToStream(binary) {
  const readableInstanceStream = new Readable({
    read() {
      this.push(binary);
      this.push(null);
    }
  });
  return readableInstanceStream;
}
