require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./models/person.js')

app.use(express.json())
app.use(morgan(
    'METHOD: :method - URL: :url - STATUS: :status - RESPONSE TIME: :response-time[3] ms - POSTED DATA: :postData'
    ))
    morgan.token('postData', function (request) {
        return JSON.stringify(request.body)
    })
app.use(express.static('dist'))
app.use(cors())
let persons =
    
    [

    ]


app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})
app.get('/info', (request, response) => {
    const date = new Date();
    response.send(`<p>Phonebook has info for ${persons.length} people </p><br><p> ${date} </p>`);
})
app.post('/api/persons', (request, response) => {
    const body = request.body;
    
    const newPerson = new Person({
        name: body.name,
        number: body.number
    })
    console.log(newPerson);
    // const matchingName = persons.filter(p => p.name === newPerson.name);
    // console.log(matchingName);

    if (newPerson.name && newPerson.number) {
        // if (matchingName.length>0) {
        //     return response.status(400).json({
        //         error:'name must be unique'
        //     })
        // }
        // else
            newPerson.save().then(savedPerson => response.json(savedPerson))
        console.log('person saved');
    }
    else {
        return response.status(400).json({
            error: 'name or number missing'
        })
    }
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons=>response.json(persons))
})


app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)


    if (person) {
        response.json(person)
    } else {
        response.status(404).end();
    }
})
app.put(`/api/persons/:id`, (request, response) => {
    console.log(request.body.number);
    const newNumber = request.body.number;
    return response.json({
        message : "someone want to put"
    })


})



app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})


const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})