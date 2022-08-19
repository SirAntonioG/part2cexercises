import { useState, useEffect } from "react";
import personService from "./services/persons";
import Persons from "./Components/Persons";
import PersonForm from "./Components/PersonForm";
import Filter from "./Components/Filter";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [filteredByName, setFilteredByName] = useState([]);
  const [filterStatus, setFilterStatus] = useState(false);

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const nameAlreadyAdded = persons.some((person) => person.name === newName);
  const personsToShow = filterStatus ? filteredByName : persons;

  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
      // id: persons.length + 1,
    };

    personService.create(newPerson).then((returnedPerson) => {
      nameAlreadyAdded
        ? window.alert(`${newName} is already added to phonebook`)
        : setPersons(persons.concat(returnedPerson));

      setNewName("");
      setNewNumber("");
      setFilterStatus(false);
      setFilterValue("");
    });
  };
  const handleNameChange = (event) => {
    // console.log(event.target.value);
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    // console.log(event.target.value);
    setNewNumber(event.target.value);
  };
  const handleFilterChange = (event) => {
    setFilterValue(event.target.value);
    const regexp = new RegExp(event.target.value, "i");
    setFilteredByName(persons.filter((person) => regexp.test(person.name)));
    event.target.value === "" ? setFilterStatus(false) : setFilterStatus(true);
  };

  const deletePersonClick = (id) => {
    const personToDelete = persons.find((person) => person.id === id);
    window.confirm(`Are you sure you want to delete ${personToDelete.name}?`);
    personService.update(id, personToDelete).then((returnedPerson) => {
      setPersons(persons.filter((person) => person.id !== personToDelete.id));
    });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filterValue} onChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm
        onSubmit={addPerson}
        nameValue={newName}
        nameOnChange={handleNameChange}
        numberValue={newNumber}
        numberOnChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} deletePerson={deletePersonClick} />
    </div>
  );
};

export default App;
