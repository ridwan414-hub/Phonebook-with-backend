import { useState } from 'react';
import personService from '../services/personService';

const PersonForm = (props) => {
  const { persons, setPersons, setErrorMessage } = props;
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  // console.log(persons);

  const addName = (event) => {
    event.preventDefault();

    const personsObject = {
      name: newName,
      number: newNumber,
    };

    const names = persons.find((person) => person.name === personsObject.name);
    const numbers = persons.find(
      (person) => person.number === personsObject.number
    );

    if (!names && !numbers) {
      personService
        .create(personsObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setErrorMessage(`'${newName}' added to the server`);
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        })
        .catch((error) => {
          setErrorMessage(`'${newName}'was not added to the server`);
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        });
      setNewName('');
      setNewNumber('');
    } else {
      const person = persons.filter((person) => person.name === newName);

      const personToAdd = person[0];
      const updatedPerson = { ...personToAdd, number: newNumber };
      if (names) {
        if (persons.length !== 0) {
          if (
            window.confirm(
              `${personsObject.name} is already added to the phonebook, replace the old number with a new one ?`
            )
          ) {
            personService
              .update(updatedPerson.id, updatedPerson)
              .then((returnedPerson) => {
                setPersons(
                  persons.map((personItem) =>
                    personItem.id !== personToAdd.id
                      ? personItem
                      : returnedPerson
                  )
                );
                setNewName('');
                setNewNumber('');
                setErrorMessage(
                  `The server has updated "${newName}"'s phone number`
                );
                setTimeout(() => {
                  setErrorMessage(null);
                }, 5000);
              })
              .catch((error) => {
                console.log(error);
                setErrorMessage(
                  `Information of ${newName} has already been removed from server`
                );
              });
          }
        }
      }
    }
  };
  //taking name from the name field
  const handleNameField = (event) => {
    setNewName(event.target.value);
  };
  //taking number from input number field
  const handleNumberField = (event) => {
    setNewNumber(event.target.value);
  };

  return (
    <div>
      <form onSubmit={addName}>
        name: <input onChange={handleNameField} value={newName} required />
        <div>
          number:
          <input onChange={handleNumberField} value={newNumber} required />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;
