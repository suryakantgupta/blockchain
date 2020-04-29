const SHA256 = require('crypto-js/sha256');
const BlockClass = require('./block');

class BlockController{
    constructor(app){
        this.app=app;
        this.blocks=[];
        this.initializeMockData();
        this.getBlockByIndex();
        this.postNewBlock();
    }

    getBlockByIndex(){
        this.app.get("/api/block/:index",(req,res)=>{
            const {index} = req.params;
            res.JSON(this.blocks[index]);
        });
    }

    postNewBlock(){
        this.app.post("/api/block",(req,res)=>{
res.send("Done");
        });
    }

    initializeMockData(){
        if(this.blocks.length==0){
            for(let index=0;index<10;index++){
                let blockAux=new BlockClass.Block(`Test Data #${index}`)
                blockAux.height=index;
                blockAux.hash=SHA256(JSON.stringify(blockAux)).toString();
                this.blocks.push(blockAux);
            }
        }
    }
}
module.exports = (app)=>{return new BlockController(app);}