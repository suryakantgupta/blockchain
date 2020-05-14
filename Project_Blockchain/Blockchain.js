const SHA256 = require('crypto-js/sha256');
const levelSandBox = require('./LevelSandbox.js');
const Block = require('./Block.js');

class Blockchain{
    
    constructor(){
        this.blockdata = new levelSandBox.LevelSandbox();
        this.getBlockHeight().then((height)=>{
            //console.log(height)
            if(height<0){
                this.generateGenesisBlock();
            }
        })
    }

   async generateGenesisBlock(){
        let gBlock = new Block("Genesis Block") ;
        //const onResolved = (h)=>console.log(h+"try")
        //const onRejected = (error)=>console.log(error)
        //this.getBlockHeight().then(onResolved,onRejected)
        gBlock.time = new Date().getTime().toString().slice(0,-3);
        let height = await this.getBlockHeight()
        //console.log(height)
        gBlock.height = height+1
       // console.log(gBlock.height)
        gBlock.hash = SHA256(JSON.stringify(gBlock)).toString();
        //console.log(gBlock.hash)
        this.blockdata.addLevelDBData(gBlock.height,JSON.stringify(gBlock))
    }

    async getBlockHeight(){
        return await this.blockdata.getBlockcount().catch((error)=>console.log(error))
    }

   async addBlock(blockTest){
        let height = await this.getBlockHeight()
        //console.log(height)
        let block =await this.getBlock(height)
        //console.log(block)
       let obj = JSON.parse(block)
      blockTest.previousHash=obj.hash
        blockTest.time = new Date().getTime().toString().slice(0,-3)
        blockTest.height = height+1
       // blockTest.height=self.height
        blockTest.hash = SHA256(JSON.stringify(blockTest)).toString();
        //console.log(blockTest.hash)
        return this.blockdata.addLevelDBData(blockTest.height,JSON.stringify(blockTest))
    }

    async getBlock(height){
        return await this.blockdata.getLevelDBData(height).catch((error)=>console.log(error))
    }

    async getBlockByAddress(address){
        return await this.blockdata.getDataByAddress(address).catch((error)=>console.log(error))
    }

    async getBlockByHash(hash){
        return await this.blockdata.getDataByhash(hash).catch((error)=>console.log(error))
    }


async validateBlock(blockHeight){

    let block = await this.getBlock(blockHeight)
    let obj = JSON.parse(block)
    let blockHash = obj.hash

    obj.hash = "";
    let validBlockHash = SHA256(JSON.stringify(obj)).toString();
    if(blockHash===validBlockHash){
        return true
    }
    else{
        return false
    }

}

async validateChain(){
    let errorLog =[]
    let previousBlockHash = ""
    let isValidBlock = false
    let blockHeight = await this.getBlockHeight()
    //console.log(blockHeight)
    for(let i=0;i<blockHeight;i++){
//console.log(i)
        let block = await this.getBlock(i)
        let obj = JSON.parse(block)
        isValidBlock = this.validateBlock(obj.height)
        
        if(!isValidBlock){
            errorLog.push(i)
        }
        if(obj.previousHash !== previousBlockHash){
            errorLog.push(i)
        }
        previousBlockHash = obj.hash

        if(i===(blockHeight-1)){
            if(errorLog.length > 0){
                console.log(`Block errors = ${errorLog.length}`)
                console.log(`Blocks: ${errorLog}`)
            }
            else{
                console.log("No Errors")
            }
        }
    }
}
}

module.exports = new Blockchain();