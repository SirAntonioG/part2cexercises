import { useState } from "react";
import Persons from "./Components/Persons";
import PersonForm from "./Components/PersonForm";
import Filter from "./Components/Filter";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [filteredByName, setFilteredByName] = useState([]);
  const [filterStatus, setFilterStatus] = useState(false);

  const nameAlreadyAdded = persons.some((person) => person.name === newName);
  const personsToShow = filterStatus ? filteredByName : persons;

  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };
    nameAlreadyAdded
      ? window.alert(`${newName} is already added to phonebook`)
      : setPersons(persons.concat(newPerson));

    setNewName("");
    setNewNumber("");
    setFilterStatus(false);
    setFilterValue("");
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
      <Persons persons={personsToShow} />
    </div>
  );
};

export default App;
