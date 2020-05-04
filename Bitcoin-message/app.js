const bitcoin =require('bitcoinjs-lib')
const bitcoinMessage = require('bitcoinjs-message')


//var keyPair = bitcoin.ECPair.fromWIF('0380e13342de0e9a33bd9e8e5bb0f6cbd9acee68b79ea0a8e299aed920d5a19bc3')
//var privateKey = keyPair.privateKey




const address = 'bc1qlzf28s47dtw3y4gzaxg9swj868p4n864arzddg'
const message = 'Suryakant'
const privateKey = 'p2wpkh:KwMNRZutJo1Ht4MzrExzK67LD4Ff17HmZGiab4AAR48etrXZYX3d'

var signature = bitcoinMessage.sign(message,privateKey,address)

console.log(signature.toString('base64'))

//console.log(bitcoinMessage.verify(message,address,signature));