'use strict';

const editor = require('../lib/edit-file') ;
const path = require('path');
describe('file modules' , () => {

  describe('using promise ' , () => {
    it('check if i can read the file as a string' , () => {
      let file = `${__dirname}/../../data/person.json`;
      return editor.readerFunctionPromise(file)
        .then( (data) => { 
          expect(typeof(data.toString().trim())).toEqual('string');
        });
    });

    it('check if Accepts a file name as a command line parameter' , () => {
      let file = `${__dirname}/../../data/person.json`;
      let fileName = path.basename(file);
      process.argv.push(fileName);
      expect(process.argv[process.argv.length-1]).toEqual(fileName);
    });



    // to alter some values i need to read the file convert it then make my changes then convert it to buffer   
    // to send it again to the file 

    it('Alter firstname value in the object file', () => {
      let file = `${__dirname}/../../data/person.json`;
      return editor.readerFunctionPromise(file)
        .then( (data) => { 
          let jsonData = JSON.parse(data.toString().trim());
          return jsonData ;
        })
        .then((data) => {
          data.firstName = 'Mohammed' ;
          let buffData = Buffer.from(JSON.stringify(data));
          return editor.writerFunctionPromise(file, buffData);
        })
        .then(() => {
          return editor.readerFunctionPromise(file)
            .then( (data) => { 
              let jsonData = JSON.parse(data.toString().trim());
              return expect(jsonData.firstName).toEqual('Mohammed');
            });
        })
        .catch((error) => { return error ;}) ;
        
    });

    it('Make sure the other values remain the same after altering', () => {
      let file = `${__dirname}/../../data/person.json`;
      return editor.readerFunctionPromise(file)
        .then( (data) => { 
          let jsonData = JSON.parse(data.toString().trim());
          return jsonData ;
        })
        .then((data) => {
          data.firstName = 'Mohammed' ;
          let buffData = Buffer.from(JSON.stringify(data));
          return editor.writerFunctionPromise(file, buffData);
        })
        .then(() => {
          return editor.readerFunctionPromise(file)
            .then( (data) => { 
              let jsonData = JSON.parse(data.toString().trim());
              return expect(jsonData.lastName).toEqual('Scissorhands');
            });
        })
        .catch((error) => { return error ;}) ;
          
    });

    it('Data format do not change after using the write method', () => {
      let file = `${__dirname}/../../data/person.json`;
      return editor.readerFunctionPromise(file)
        .then( (data) => { 
          let jsonData = JSON.parse(data.toString().trim());
          return jsonData ;
        })
        .then((data) => {
          data.firstName = 'Mohammed' ;
          let buffData = Buffer.from(JSON.stringify(data));
          return editor.writerFunctionPromise(file, buffData);
        })
        .then(() => {
          return editor.readerFunctionPromise(file)
            .then( (data) => { 
              let jsonData = data.toString().trim();
              return expect(typeof(jsonData)).toEqual('string');
            });
        })
        .catch((error) => { return error ;}) ;
            
    });
  


    
  });  

});