// var a = 10;
// var b = 90;
// console.log(a + b); 
// var add =function(a, b){
//     return a + b;
// }
//var add = (a, b) => {return a + b};
// var add = (a, b) => a + b;
// var result = add(10, 90);
// console.log(result);
// (function(){
//     console.log('Hello Binmaya');
// })();



// var fs = require('fs');
// var os = require('os');
// var user = os.userInfo();
// //console.log(user);
// // console.log(user.username);
// fs.appendFile('greeting.txt', 'Hi ' + user.username + '!\n', () => {
//     console.log('file is created');
// });

// var _ = require('lodash');
// var data = ['Person', 'Person', 1, 2, 1, 2, 'name', 'age', '2'];
// var filter = _.uniq(data);
// console.log(filter);
// console.log(_.isString(true));


// function callbck(){
//     console.log('callback function is called');
// }

// const add = function(a, b, callback){
//     var result = a + b;
//     console.log('result is ' + result);
//     callback();
// }
// add(20, 30000, callbck);

// const add = function(a, b, binmaya){
//     var result = a + b;
//     console.log('result is ' + result);
//     binmaya();
// }
// add(20, 30000, function(){
//     console.log('callback function is called');
// });

//add(20, 30000, () => console.log('callback function is called'));

// const notes = require('./notes.js');
// console.log('server file is started');
// var age = notes.age;
// var result = notes.addNumber(age+10, 90);
// console.log(result);


//json

// const jsonstring = '{"name": "Binmaya", "age": 25, "city": "Bhubaneswor"}';
// const obj = JSON.parse(jsonstring);
// console.log(obj);

// const objectToConvert = {
//     "name": "Binmaya",
//     "age": 25, 
//     "city": "Bhubaneswor"
// };
// const json = JSON.stringify(objectToConvert);
// console.log(json);

const express = require('express');
const app = express();
const database = require('./db');
require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
const MenuItems = require('./models/MenuItems');
const PORT=process.env.PORT || 3000;

app.get('/', function (req, res) {
  res.send('Hello World')
})




const personRoutes = require('./routes/personeRoutes');
const menuItemsRoutes = require('./routes/menuItemsRoutes');
app.use('/person',personRoutes);
app.use('/menu-items',menuItemsRoutes);

app.listen(PORT,() => {
    console.log('server is started at port 3000');
});
