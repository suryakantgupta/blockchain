const SHA256 = require('crypto-js/sha256');
const levelSandBox = require('./LevelSandbox.js');
const block = require('./Block.js');

class Blockchain{
    
    constructor(){
        this.blockdata = new levelSandBox.LevelSandbox();
        this.generateGenesisBlock(new block.Block("Genesis Block"));
        this.height=0;
        this.getBlockHeight().then((result)=>{
            this.height=result
        })
    }

    generateGenesisBlock(gBlock){
        let self = this;
        gBlock.time = new Date().getTime().toString().slice(0,-3);
        gBlock.height = self.height
        gBlock.hash = SHA256(JSON.stringify(gBlock)).toString();
        //console.log(gBlock.hash)
        self.blockdata.addLevelDBData(0,JSON.stringify(gBlock))
    }

    getBlockHeight(){
        let self = this
        return self.blockdata.getBlockcount()
    }

    addBlock(blockTest){
        let self = this
    self.getBlock(self.height).then((blok)=>{
        let obj =JSON.parse(blok)
        blockTest.previousHash=obj.hash
        
        blockTest.time = new Date().getTime().toString().slice(0,-3)

        self.height += 1
        blockTest.height=self.height
        blockTest.hash = SHA256(JSON.stringify(blockTest)).toString();
        //console.log(blockTest.hash)

        self.blockdata.addLevelDBData(blockTest.height,JSON.stringify(blockTest))
    
    })
    }

    getBlock(height){
        let self = this;
        return self.blockdata.getLevelDBData(height)
    }


validateBlock(blockHeight){
    let self = this
    self.getBlock(blockHeight).then((blok)=>{
        let obj = JSON.parse(blok)
        let blockHash = obj.hash
        //console.log(obj.hash)
        obj.hash = '';
        let validBlockHash = SHA256(JSON.stringify(obj)).toString();
//console.log(validBlockHash)
        if(blockHash==validBlockHash){
            //console.log("truee")
            return true;
        }
        else{
            console.log('Invalid Block')
            return false;
        }

    })

}

validateChain(){
    let self=this;
    var isValid=false;
    self.getBlockHeight().then((bh)=>{
        for(let i=0;i<bh;i++){
        //isValid=self.validateBlock(i)
        console.log(self.validateBlock(i))
        if(isValid){
            console.log("Blockchain Valid")
        }
        }
            }).catch((err) => { console.log(err);})
        }
}

module.exports.Blockchain = Blockchain;