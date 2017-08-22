const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser')

const app = express();

// add your code here
var mock = [
    {
      todoItemId: 0,
      name: 'an item',
      priority: 3,
      completed: false
    },
    {
      todoItemId: 1,
      name: 'another item',
      priority: 2,
      completed: false
    },
    {
      todoItemId: 2,
      name: 'a done item',
      priority: 1,
      completed: true
    }
];
app.use(bodyParser.json())
app.get('/', (req, res) => {
    
    res.status(200).send({"status": "ok"})
})

app.get('/api/TodoItems', (req, res) => {
    
    res.json(mock);
})

app.get('/api/TodoItems/:number', (req,res) =>{
    for(var k=0; k < mock.length; k++){
        if(mock[k].todoItemId==req.params.number){
            res.json(mock[k]);
        }
    }

})

app.post('/api/TodoItems', (req, res) =>{

    var checker = true;

    for(var i=0; i < mock.length; i++){
        if(mock[i].todoItemId===req.body.todoItemId){
            mock[i] = req.body;
            checker = false;
        }
    }
    if(checker){
        mock.push(req.body)
    }
    res.status(201).json(req.body)
})

app.delete('/api/TodoItems/:number', (req, res) =>{
    for(var j=0; j < mock.length; j++){
        if(mock[j].todoItemId==req.params.number){
            res.json(mock[j]);
            mock.splice(j,1);
        }
    }
})


module.exports = app;
