

const be = require('blockexplorer')

function getBlock(index){

    be.blockIndex(index).then((result)=> {
        let hashAux = JSON.parse(result).blockHash;
        var block = new be.block(hashAux);
        console.log(block);
    }).catch((err) => {
        throw err;
    })
}

(function theLoop(i){
    window.setTimeout(function() {
        getBlock(i);
        i++;
        if(i<3) theLoop(i);
    },3600);
})
(0);