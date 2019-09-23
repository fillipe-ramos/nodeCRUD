var express = require('express');
var bodyParser = require('body-parser');
var database  = require('./database/database');

const app = express();
app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({
    extended: true
  }));

app.get('/api/user', (request, response) => {
    response.status(200).send({
        success:'true',
        user: database,
    })
});

app.post('/api/user', (request, response) => {
    const newUser = {
        id: database[database.length-1].id + 1,
        firstName: request.body.firstName,
        lastName: request.body.lastName,
    };
    database.push(newUser);
    return response.status(201).send({
        success:'true',
        message: 'New user added succesfully',
    });
});


app.get('/api/user/:id', (request, response) => {
    var id = parseInt(request.params.id);
    var userFound = null;
    database.map((user) => {
        if(id === user.id){
            userFound = user;
        }
    });
    if(!userFound){
        return response.status(404).send({
            success: "false",
            message: "user not found",
        });
    }else{
        return response.status(200).send({
            success:'true',
            message: 'Retrieved user succesfully',
            user: userFound,
        });
    }
});

app.delete('/api/user/:id', (request, response) => {
    var id = parseInt(request.params.id);
    var deleted = false;

    database.map((user, index) => {
        if(id === user.id){
            database.splice(index, 1);
            deleted = true;
        }
    });
    if(!deleted){
        return response.status(404).send({
            success: "false",
            message: "user not found",
        });
    }else{

        
        return response.status(200).send({
            success:'true',
            message: 'deleted user succesfully',
        });
    }
})

app.put('/api/user/:id', (request, response) => {
    var id = parseInt(request.params.id);
    var userFound = false;
    database.map((user, index) => {
        if(id === user.id){
            const newUser = {
                id: user.id,
                firstName: request.body.firstName,
                lastName: request.body.lastName,
            };
            userFound = true;
            database.splice(index, 1, newUser);
        }
    });
    if(!userFound){
        return response.status(404).send({
            success: "false",
            message: "user not found",
        });
    }else{        
        return response.status(200).send({
            success:'true',
            message: 'Updated user succesfully',
        });
    }

})

const PORT = 3000;

app.listen(PORT, () => {
    console.log("Running on port: ", PORT);
})