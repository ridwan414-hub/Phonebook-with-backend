import personService from '../services/personService';

const Persons = (props) => {
  const {
    name,
    number,
    id,
    persons,
    setPersons,
    setErrorMessage,
  } = props;

  const handleDeletButton = (id) => {
    window.confirm('Are you sure you want to delete?');
    personService
      .remove(id)
      .then((ResponseData) => {
        setPersons(persons.filter((p) => p.id !== id));
        setErrorMessage(`The surver has deleted the Data`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      })
      .catch((error) => {
        alert(`the note '${note.content}' was already deleted from server`);
        setPersons(persons.filter((n) => n.id !== id));
      });
    };

  return (
    <li className="persons">
      {name} {number}{' '}
      <button onClick={() => handleDeletButton(id)}>delete</button>
    </li>
  );
};

export default Persons;
