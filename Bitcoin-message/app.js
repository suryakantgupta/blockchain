const Client = require('bitcoinjs-message')



/*
var config = {
    network: 'testnet',
    username: 'surya',
    password: 'suryakant',
    port: '18332'

};
*/
//var rpc = new Client(config)

//rpc.listUnspent().then((help)=>console.log(help))
//console.log(rpc.listunspent())
message='Suryakant';
address='1L6Z1e6jtonuVHUcrNmDwMixmaSqyY5scH';
sig='H3rQM1OJE85vsVqJ9GstOsWXyVUVK3/erEzqWecMNSGcRPbxtNAxeIDohzJCcdU+QOpnrHhHQ7PP6l9t6i8c8ZM='

console.log(Client.verify(message,address,sig));