const express = require('express')
const bodyParser = require('body-parser')



const Block = require('./Block')
const Blockchain = require('./Blockchain')

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

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

app.post('/block',(req,res)=>{
let data = req.body
if(data.body!=null){
let block = Blockchain.addBlock(new Block(data.body))
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