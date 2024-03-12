import { useEffect, useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personService from './services/personService';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState(null);
    const [errorMessage, setErrorMessage] = useState('some error happened...');
  

useEffect(() => {
    personService
      .getAll()
    .then(initialPersons =>setPersons(initialPersons))
}, []);

if (!persons) {
   return null;
}
  console.log('frontend',persons);




  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={errorMessage} />
      <Filter persons={persons} setPersons={setPersons}></Filter>

      <h2>Add a new</h2>
      <PersonForm
        persons={persons}
        setPersons={setPersons}
        setErrorMessage={setErrorMessage}
        // setNewNumber={setNewNumber}
        // setNewName={setNewName}
      ></PersonForm>

      <h2>Numbers</h2>

      {persons.map((person) => (
        <Persons
          key={person.id}
          name={person.name}
          number={person.number}
          id={person.id}
          persons={persons}
          setPersons={setPersons}
          setErrorMessage={setErrorMessage}
        ></Persons>
      ))}
    </div>
  );
};

export default App;
