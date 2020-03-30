const SHA256 =require('crypto-js/sha256');

class Block{
    constructor(data){
        this.id=0;
        this.nonce=144444;
        this.body=data;
        this.hash="";
    }


generateHash(){
    let self=this;
    var promise =new Promise(function(resolve,reject){
        var ans=JSON.stringify(self);
        self.hash = SHA256(ans);

        if(self.hash){
            resolve(self);
        }
        else{
            reject(Error("It Broke"));
        }
    });
return promise;

}
}

module.exports.Block = Block;