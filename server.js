var express = require("express")
var Sequelize = require("sequelize")
var nodeadmin = require("nodeadmin")
var cors = require("cors");
var translated = require("google-translate-api");

//connect to mysql database
var sequelize = new Sequelize({
    database: 'jurnal',
    username: 'root',
    password: null,
    dialect:'mysql',
    host:'localhost',
    operatorsAliases: false
})

sequelize.authenticate().then(function(){
    console.log('Success')
})

//define a new Model
var Lists = sequelize.define('lists', {
    name: Sequelize.STRING,
    language: Sequelize.STRING
})

var Notes = sequelize.define('notes', {
    list_id: Sequelize.INTEGER,
    day: Sequelize.STRING,
    description: Sequelize.STRING
})


Notes.belongsTo(Lists, {foreignKey: 'list_id', targetKey: 'id'})


var app = express()

app.use('/nodeamin', nodeadmin(app))

//access static files

app.use(express.static(__dirname))
//app.use('/admin', express.static('admin'))

app.use(express.json())                       // to support JSON-encoded bodies
app.use(express.urlencoded({extended: true})) // to support URL-encoded bodies
app.use(cors())

app.get('/traducere', function(request, response) {
    
    //console.log(request.query.val)
    translated(request.query.val, {from: 'ro', to:'en'}).then(res => {
        response.status(200).send(res.text);
    });
    
    
})

app.get('/', function(request, response) {
    Notes.findAll(
        {
            include: [{
                model: Lists,
                where: { id: Sequelize.col('notes.list_id') }
            }]
        }
        
        ).then(
            function(notes) {
                response.status(200).send(notes)
            }
        )
})

// get a list of categories
app.get('/lists', function(request, response) {
    Lists.findAll().then(function(lists){
        response.status(200).send(lists)
    })
        
})


// get one category by id
app.get('/lists/:id', function(request, response) {
    Lists.findOne({where: {id:request.params.id}}).then(function(list) {
        if(list) {
            response.status(200).send(list)
        } else {
            response.status(404).send()
        }
    })
})


app.get('/lists/:id/denumire', function(request, response) {
    Lists.findOne({where: {id:request.params.id}}).then(function(list) {
            response.status(200).send(list.name)
    })
})

//create a new list
app.post('/lists', function(request, response) {
    Lists.create(request.body, {fields : ['name', 'language']}).then(function(list) {
        response.status(201).send(list)
    })
})

app.put('/lists/:id', function(request, response) {
    Lists.findById(request.params.id).then(function(list) {
        if(list) {
            list.update(request.body, {fields : ['name', 'language']}).then(function(list){
                response.status(201).send(list)
            }).catch(function(error) {
                response.status(200).send(error)
            })
        } else {
            response.status(404).send('Not found')
        }
    })
})

app.delete('/lists/:id', function(request, response) {
    Lists.findById(request.params.id).then(function(list) {
        if(list) {
            list.destroy().then(function(){
                response.status(204).send()
            })
        } else {
            response.status(404).send('Not found')
        }
    })
})

app.get('/notes', function(request, response) {
    Notes.findAll().then(
            function(notes) {
                response.status(200).send(notes)
            }
        )
})

app.get('/notes/:id', function(request, response) {
    Notes.findById(request.params.id).then(
            function(note) {
                response.status(200).send(note)
            }
        )
})

app.get('/notes/:id/description', function(request, response) {
    Notes.findById(request.params.id).then(
            function(note) {
                response.status(200).send(note.description)
            }
        )
})

app.get('/notes/:id/date', function(request, response) {
    Notes.findById(request.params.id).then(
            function(note) { 
                response.status(200).send(note.day)
            }
        )
})


app.post('/notes', function(request, response) {
    Notes.create(request.body, {fields : ['list_id', 'day', 'description']}).then(function(note) {
        response.status(201).send(note)
    })
})

app.put('/notes/:id', function(request, response) {
    Notes.findById(request.params.id).then(function(note) {
        if(note) {
            note.update(request.body,{fields : ['list_id', 'day', 'description']}).then(function(note){
                response.status(201).send(note)
            }).catch(function(error) {
                response.status(200).send(error)
            })
        } else {
            response.status(404).send('Not found')
        }
    })
})

app.delete('/notes/:id', function(request, response) {
    Notes.findById(request.params.id).then(function(note) {
        if(note) {
            note.destroy().then(function(){
                response.status(204).send()
            })
        } else {
            response.status(404).send('Not found')
        }
    })
})

app.get('/lists/:id/notes', function(request, response) {
    Notes.findAll({where:{list_id: request.params.id},
            include: [{
                model: Lists,
                where: { id: Sequelize.col('notes.list_id') }
            }]
        }).then(
            function(notes) {
                response.status(200).send(notes)
                
            }
        )
})

app.listen(8080)