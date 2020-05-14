const express = require('express')
const bodyParser = require('body-parser')



const Block = require('./Block')
const Blockchain = require('./Blockchain')
const Validator = require('./AssetValidator')

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

async function ValidateAddress(req,res,next){
    try{
    const Addressvalidation = new Validator(req);
    Addressvalidation.ValidateAddress();
    next();
    }catch(error){
        res.json({
            message: error.message
        })
    };
}

async function ValidateSignature(req,res,next){
    try{
    const Signaturevalidation = new Validator(req);
    Signaturevalidation.ValidateSignature();
    next();
    }catch(error){
        res.json({
            message: error.message
        })
    };
}

async function ValidateAsset(req,res,next){
    try{
    const Assetvalidation = new Validator(req);
    Assetvalidation.ValidateAsset();
    next();
    }catch(error){
        res.json({
            message: error.message
        })
    };
}





app.get('/block/:index',(req,res)=>{
    let i = req.params.index;
    console.log(i)
    let block = Blockchain.getBlock(i)
    block.then((result)=>{
        res.send(JSON.parse(result))
    }).catch((err)=>{
        console.log(err)
        res.end()
    })
});


app.get('/block/address/:address',(req,res)=>{
    let i = req.params.address;
    //console.log(i)
    let block = Blockchain.getBlockByAddress(i)
    block.then((result)=>{
        res.send(result)
    }).catch((err)=>{
        console.log(err)
        res.end()
    })
});

app.get('/block/hash/:hash',(req,res)=>{
    let i = req.params.hash;
    //console.log(i)
    let block = Blockchain.getBlockByHash(i)
    block.then((result)=>{
        res.send(result)
    }).catch((err)=>{
        console.log(err)
        res.end()
    })
});

app.post('/block',(req,res)=>{
let body = ({address , asset} = req.body);
if(body!=null){
let block = Blockchain.addBlock(new Block(body))
block.then((result)=>{
    res.send(result)
}).catch((err)=>{
    console.log(err)
    res.end()
})
}else{
    res.end()
}
});

app.listen(3000)
console.log('server started on 3000')