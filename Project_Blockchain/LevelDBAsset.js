const assesDB = require('level')
const data = './assetdata'
class LevelDBAsset{
    constructor(){
        this.db=assesDB(data)
    }
    saveNewRequestValidation(address){
        const message = `${address}:assetRegister`

        const data = {
            address: address,
            message: message
        }
        this.db.put(data.address,JSON.stringify(data));
        return data;
    }

    getvalue(address){
        return new Promise((resolve,reject)=>{
            this.db.get(address,(err,value)=>{
                if(err){
                    reject(err)
                }else{
                    resolve(value)
                }
            
            })
            
        })
        
    }

    putValue(address,value){
        this.db.put(address,value)
    }


    delete(address){
        this.db.del(address,(err)=>console.log(err))
    }

/*
    async getPendingAddressRequest(address){
        return new Promise((resolve,reject)=>{
            this.db.get(address,(err,value)=>{
                if(value === undefined){
                    return reject(new Error('Address not found'))
                }else if (err){
                    return reject(err)
                }

                value=JSON.parse(value);
                const data={
                    address: address,
                    message: value.message
                }
                resolve(data);
            })
        })
    }
    */


    getData(){
        return new Promise((resolve,reject) => {
            let all = []
            this.db.createReadStream().on('data', (data) => {
                
                all.push(data)
                //console.log(data)
            }).on('error' , (error) => {
                reject(error)
            }).on('close' , () =>{
                resolve(all)
            })
        })
    }





}

module.exports.LevelDBAsset = LevelDBAsset;