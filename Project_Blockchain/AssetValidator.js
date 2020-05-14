const levelSandBox = require('level')


class Validator{
    constructor(req){
        this.req=req;
    }

    ValidateAddress(){
        if(!this.req.body.adddress){
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

        const {dec, ra, story} = asset;

        if(!this.req.ValidateAddress || !asset){
            throw new Error('Enter all Parameter')
        }

        if(typeof dec !== 'string' ||
        dec.length==0 ||
        typeof ra !== 'string' ||
        ra.length==0 ||
        typeof story !=='string'||
        story.length==0){
            throw new Error('Invalid Asset Info')
        }





    }






}

module.exports = Validator;