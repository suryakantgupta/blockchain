const BlockChain = require('./Blockchain.js');
const Block = require('./Block.js');

let myBlockChain = new BlockChain.Blockchain();

setTimeout(function(){
   console.log("Waiting...")
},11000);

(function theLoop (i) {
	setTimeout(function () {
		let blockTest = new Block.Block("Test Block - " + (i + 1));
		// Be careful this only will work if your method 'addBlock' in the Blockchain.js file return a Promise
		myBlockChain.addBlock(blockTest).then((result) => {
			//console.log(result);
			i++;
            if(i < 10){
                theLoop(i)
            }
            //else{
           //     let block = myBlockChain.getBlock(0)
           //    console.log(JSON.parse(block))
           // };
		});
	}, 1000);
  })(0);

setTimeout(() => myBlockChain.validateChain(), 13000);