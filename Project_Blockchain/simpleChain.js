const BlockChain = require('./Blockchain.js');
const Block = require('./Block.js');

let myBlockChain = new BlockChain.Blockchain();

setTimeout(function(){
   console.log("Waiting...")
},10000);

(function theLoop(i){
    setTimeout(function(){
        let blockTest = new Block.Block("Test Block - " + (i+1));
        myBlockChain.addBlock(blockTest) //.then(() => {
            //console.log(result);
            i++;
            if(i<10){
                theLoop(i)
            }
            else{
                myBlockChain.getBlock(3).then((block) => {
                    console.log(JSON.parse(block));
                }).catch((err) => { console.log(err);})

            }
     //   })
    },100)
})(0)

setTimeout(() => myBlockChain.validateChain(), 11000);