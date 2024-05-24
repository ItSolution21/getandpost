

//import express from 'express';

const express = require('express'); 
const data = require('./MOCK_DATA.json');
const fs = require('fs');
const app = express(); 

const PORT = 3456;

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use(express.urlencoded({extended : false}));


app.get("/api/users",(req, res)=>{
    return res.json(data);
})

app.get('/api/users/:id', (req, res) => {
    const id = Number(req.params.id);
    console.log(id);
    const user = data.find(user => user.id === id);
    return res.json(user);
})

app.post('/api/users', (req, res)=>{
    const body = req.body;
    console.log(body);
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(body), (err) => {
        if (err) throw err;
        console.log('Saved!');
        return res.json({status : "success"});
    });
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})