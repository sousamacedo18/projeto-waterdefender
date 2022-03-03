const express = require('express');
const router = express.Router();
const mysql = require("../mysql").pool;


// todos as nascentes
router.get('/',(req,res, next)=>{
  
    mysql.getConnection((error, conn)=>{
        if(error){return res.status(500).send({error:error})}
        conn.query(
            `
            SELECT * FROM fontes
            `,
            (error,resultado,fields)=>{
                if(error) {return res.status(500).send({error:error})}
               
                const response ={
                    rows:resultado.length,
                    token:"solrac1982",
                    fontes:resultado.map(font=>{
                        return{
                                        
                            id:font.id,
                            user:font.user,
                            username:font.username,
                            useravatar:font.useravatar,
                            redesocial:font.redesocial,
                            status:font.status,
                            percentual:font.percentual,
                            latitude:font.latitude,
                            longitude:font.longitude,
                            fontename:font.fontename,
                            cordenadas:font.cordenadas,
                            foto_2:font.foto_2,
                            foto_5:font.foto_5,
                            token:font.token,
                            datacadastro:font.datacadastro,
                            request:{
                                tipo: 'GET',
                                descriacao:' buscar todos as nascente cadastradas',
                                url:'http//localhost:3333/fonte/'+font.id
                            }
                        }
                    })
                    
          
                }
                
                return res.status(200).send(response);
            }
            )
          

    });

});


//salvar novos dados da nascente
router.post('/',(req,res,next)=>{
    
    const{
        user,
        username,
        useravatar,
        redesocial,
        status,
        percentual,
        categoria,
        fontename,
        latitude,
        longitude,
        foto_2,
        foto_5,
        token
    }= req.body;
      
    mysql.getConnection((error, conn)=>{
       
            conn.query(
                `INSERT INTO 
                fontes(
                    user,
                    username,
                    useravatar,
                    redesocial,
                    status,
                    percentual,
                    categoria,
                    fontename,
                    latitude,
                    longitude,
                    foto_2,
                    foto_5,
                    token
                )
                values (?,?,?,?,?,?,?,?,?,?,?,?,?)  
                `,[
                    user,
                    username,
                    useravatar,
                    redesocial,
                    status,
                    percentual,
                    categoria,
                    fontename,
                    latitude,
                    longitude,
                    foto_2,
                    foto_5,
                    token  
                ],
                   (error, result, fields)=>{
                  
                       conn.release();
                       if(error){
                          
                        return   res.status(500).send({
                               error:error,
                               response: null
                           });
                       }
                       if(result.length==0){
                          
                           return res.status(404).send({
                              
                            mensagem:"Não foi possivel salvar os dados"
                               })
                       }
                       res.status(201).send({
                        mensagem:"Fonte Salva com Sucesso!",
                        id:result.insertId
                    })
                   }
            )
    })

});


router.patch('/',(req,res, next)=>{
    mysql.getConnection((error, conn)=>{
        const{id,
            user,username,
            userafatar,redesocial,
            status,percentual,
            categoria,fontename,
            cordenadas,foto_2,
            foto_5,token
        }= req.body;

        if(error){return res.status(500).send({error:error})}
        conn.query(
                `UPDATE  fontes
                   set   user       =?,
                         username   =?,
                         userafatar =?,
                         redesocial =?,
                         categoria  =?
                         fontename  =?,
                         cordenadas =?,
                         foto_2    = ?,
                         foto_5    =?,
                         token     =?
                    WHERE id       =? `,
                    [
                        user,username,
                        userafatar,redesocial,
                        status,percentual,
                        categoria,fontename,
                        cordenadas,foto_2,
                        foto_5,token,
                        id
                    ],
                    (error,resultado,fields)=>{
                        conn.release();
                      
                    if(error){ return res.status(500).send({error:error})}
                    res.status(202).send({
                        mensagem:"Fonte alterada com sucesso!"
                    })
                }  
             )
      });
});

router.delete('/:id',(req,res, next)=>{
    const id = req.params.id;
    res.status(201).send({
        mensagem:'Fonte excluída com  sucesso ',
        id:id
    })
});
module.exports = router;