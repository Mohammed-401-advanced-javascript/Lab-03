'use strict' ;


const fs = require('fs') ;
const util = require('util') ;



// read with promise method
const readTheFile = util.promisify(fs.readFile) ;
const readerFunctionPromise = (file) => {
  return readTheFile(file)
    .then( (data) => {
      return data ;
    })
    .catch(error => error);
};


//write on the file 
const writeOnFile = util.promisify(fs.writeFile) ;
const writerFunctionPromise = (file , data) => {
  return writeOnFile(file , data);
};



module.exports = { readerFunctionPromise ,writerFunctionPromise };