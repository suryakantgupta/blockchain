const Client = require('bitcoin-core')
var config = {
    network: 'testnet',
    username: 'surya',
    password: 'suryakant',
    port: '18332'

};

var rpc = new Client(config)

rpc.listUnspent().then((help)=>console.log(help))
//console.log(rpc.listunspent())