const level = require('level');
const chainDB = './chaindata' ;
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
                console.log(`Added Block #${key}`)
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
                resolve(value)
            })
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