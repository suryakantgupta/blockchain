const bitcoinMessage = require('bitcoinjs-message');
const LevelDBAsset = require('./LevelDBAsset')
const assetdata = new LevelDBAsset.LevelDBAsset()
class Validator{
    constructor(req){
        this.req=req;
    }

    ValidateAddress(){
        //console.log(this.req.body.address)
        if(!this.req.body.address){
            throw new Error('No address provided')
        }
        return true;
    }

    ValidateSignature(){
        if(!this.req.body.signature){
            throw new Error('No signature provided')
        }
        return true;
    }
    

    ValidateAsset(){
        const { asset } = this.req.body;

        const {encodedDocument} = asset;

        if(!this.ValidateAddress() || !encodedDocument){
            throw new Error('Enter all Parameter')
        }

        /*
        if(){
            throw new Error('Invalid Asset Info')
        }
    
    
        */



    }

   async isValid(){
       let value = await assetdata.getvalue(this.req.body.address)
       value = JSON.parse(value)
       if(value.messageSignature==='valid'){
        assetdata.delete(this.req.body.address)   
            return true;
       }else{
           return false;
       }
    }
    async verifySignature(address,signature){
       let value = await assetdata.getvalue(address)
       value = JSON.parse(value)
       let message=value.message
       //console.log(message , address , signature)
       let verify = bitcoinMessage.verify(message,address,signature)
       console.log(verify)
       if(verify){
            value.messageSignature='valid'
            //assetdata.delete(address)
        }else{
            value.messageSignature='invalid'
        }
        //console.log(value)
        assetdata.putValue(address,JSON.stringify(value))
       return verify
      
    }

    async saveNewReq(address){
        return assetdata.saveNewRequestValidation(address)
    }

    async getPenAddReq(address){
        return assetdata.getPendingAddressRequest(address)
    }

    async getdata(){
        return assetdata.getData()
    }







}

module.exports = Validator;