const { response } = require('express')
const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide passwod as argument')
    process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://fullstack:${password}@cluster0.uddmrpu.mongodb.net/phoneBook?retryWrites=true&w=majority&appName=Cluster0`
mongoose.set('strictQuery',false)
mongoose.connect(url)
const personSchema = new mongoose.Schema({
    name: String,
    number: String
})
const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
    Person.find({}).then(response => {
        console.log('PhoneBook: ')
        response.forEach(person => console.log(`${person.name} ${person.number}`));
        mongoose.connection.close()
    })
}
else {
    const person = new Person(
        {
            name: "Arto Hellas",
            number: "040-123456"
        })
    
    person.save().then(result => {
        console.log(`${result.name} ${result.number} saved successfully!`)
        mongoose.connection.close()
    })
}