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
        //console.log(req.body.address)
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


app.post('/requestValidation',[ValidateAddress],async (req,res)=>{
    
    const validation = new Validator(req)
    const address = req.body.address
    //try{
     //   data = await validation.getPenAddReq(address)
    //}catch(error){
    data = await validation.saveNewReq(address)
    //}
    res.json(data);
    await validation.getdata()
})

app.post('/validate-signature',[ValidateAddress,ValidateSignature],async (req,res)=>{
    const validation = new Validator(req);
    const address = req.body.address;
    const signature = req.body.signature;
    //try{
       let verify=await validation.verifySignature(address,signature)
    //}catch(error){
    //    res.json(error.message)
    //}
    res.send(`Signature is ${verify}`)
    //await validation.getdata()
    //console.log(verify)
})








app.get('/block/:index',(req,res)=>{
    let i = req.params.index;
    //console.log(i)
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

app.get('/asset',async (req,res)=>{
    let i = req.params.index;
    //console.log(i)
    let asset = new Validator(req)
    let data = asset.getdata()
    data.then((result)=>{
        res.send(result)
    }).catch((err)=>{
        console.log(err)
        res.end()
    })
    /*
    block.then((result)=>{
        res.send(JSON.parse(result))
    }).catch((err)=>{
        console.log(err)
        res.end()
    })
    */
});










app.post('/block',[ValidateAsset],async (req,res)=>{
    const validation = new Validator(req)
    let response = await validation.isValid()
    if(response){
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
    res.send("Enter Missing Parameters")
}
    }else{
        res.send("Please validate signature first")
    }
});

app.listen(3000)
console.log('server started on 3000')