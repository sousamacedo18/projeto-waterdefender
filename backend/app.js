const express = require('express');
const app = express();

const cors = require("cors");
//app.use(express.static('assets'));

const { response } = require('express');
const multer   = require("multer");
const path     = require("path");
const morgan      = require('morgan');
const bodyParser  = require('body-parser');
const rotaFontes  = require('./routes/fontes');
const rotaPosts   = require('./routes/posts');



app.use(morgan('dev'));
app.use('/assets',express.static('assets'));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());



const fs = require('fs');


app.use((req,res,next)=>{
    res.header('Acces-Control-Allow-Origin','*');
    res.header('Acces-Control-Allow-Header',
    'Origin, X-Requerested-With, Content-Type, Accept, Authorization'
    );
    
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE');
        app.use(cors(
            
        ));
        return res.status(200).send({

        })
    }
    next();
})


app.use('/fonte',rotaFontes);
app.use('/posts',rotaPosts);


app.use((error,req,res,next)=>{
    const erro = new Error('Não encontrado!');
    erro.status=404;
    console.log("aqui esta o erro:"+erro.status);
    next(erro);
});
app.use((error,req,res,next)=>{
    const erro = new Error('Não encontrado!');
    erro.status(error.status || 500);
    return res.send({
        erro:{
            mensagem: error.message+"esse foi o erro!"
        }
    });
});

module.exports= app;