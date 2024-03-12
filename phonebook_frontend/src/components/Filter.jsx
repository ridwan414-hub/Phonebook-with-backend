import { useState } from 'react';
const Filter = (props) => {
  const { persons } = props;
  const [searchText, setSearchText] = useState('');

  const filteredPeople = persons.filter((person) =>
    person.name.toLowerCase().includes(searchText.toLowerCase())
  );
  // console.log('filteredPeople :>> ', filteredPeople);

  const handleSearchField = (event) => {
    setSearchText(event.target.value);
  };

  return (
    <div>
      This is filtered section. search :{' '}
      <input type="text" onChange={handleSearchField} value={searchText} />
      {searchText && (
        <ul>
          {filteredPeople.map((person) => (
            <li key={person.id}>{person.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Filter;
