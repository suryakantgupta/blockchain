const level = require('level');
const chainDB = "./chaindata" ;
class LevelSandbox{
    constructor(){
        this.db = level(chainDB);
    }

    addLevelDBData(key,value){
        let self = this;
        return new Promise((resolve,reject) => {
            self.db.put(key,value,(error) => {
                if(error){
                reject(error)
                }
                //console.log(`Added Block #${key}`)
                resolve(`Added Block #${key}`)
                
            })
        })
    }
    getLevelDBData(key){
        let self = this;
        return new Promise((resolve,reject) => {
            self.db.get(key,(error,value)=>{
                if(error){
                    reject(error)
                }
                //console.log(`Block requested ${value}`)
                resolve(value)
            })
        })

    }
    getDataByAddress(address){
        let self=this;
        let blocks=[]
        let block;
        return new Promise((resolve,reject)=>{
            self.db.createReadStream().on('data',(data)=>{
                block=JSON.parse(data.value)
                //console.log(data.value)
                if(block.body.address === address){
                    //console.log(data)
                   // resolve(data.value)
                    blocks.push(block);
                }
            }).on('error',error =>{
                return reject(error);
                
            }).on('close' , ()=>{
                return resolve(blocks)
            });

        })
    }
    getDataByhash(hash){
        let self=this;
        let blocks=[]
        let block;
        return new Promise((resolve,reject)=>{
            self.db.createReadStream().on('data',(data)=>{
                block=JSON.parse(data.value)
                if(block.hash === hash){
                    //resolve(data)
                    blocks.push(block);
                }
            }).on('error',error =>{
                return reject(error);
                
            }).on('close' , ()=>{
                return resolve(blocks)
            });
            
        })
    }

    getBlockcount(){
        let self = this;
        return new Promise((resolve,reject) => {
            let height = -1
            self.db.createReadStream().on('data', (data) => {
                height++
            }).on('error' , (error) => {
                reject(error)
            }).on('close' , () =>{
                resolve(height)
            })
        })
    }
}


module.exports.LevelSandbox = LevelSandbox;