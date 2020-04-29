const http = require('http');
const SHA256 = require('crypto-js/sha256')
const port = 8080;

var blocks = [];
let block_1={"height":"0","body":"Blockchain Developer","time":1538509789};
let block_2={"height":"1","body":"Udacity Blockchain Developer Rock!","time":1538509789};

blocks.push(block_1);
blocks.push(block_2);

let block_2_hash=SHA256(JSON.stringify(blocks[1])).toString();


const app =http.createServer((request,response)=>{
    response.writeHead(200,{'Content-Type': "textjbvjkbdsjbvfs"});
    response.write(block_2_hash);
    response.end()
});

console.log("WebServer Started on port 8080");
app.listen(port);