import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');
  const [nameState, setNameState] = useState('');
  const [numberState, setNumberState] = useState('');

  useEffect(() => {
    const storedContacts = JSON.parse(localStorage.getItem('contacts'));
    if (storedContacts) {
      setContacts(storedContacts);
    }
  }, []);

  useEffect(() => {
    const contactsToBeStored = JSON.stringify(contacts);
    localStorage.setItem('contacts', contactsToBeStored);
  }, [contacts]);

  const handleChange = e => {
    const { name, value } = e.target;
    if (name === 'name') {
      setNameState(value);
    } else {
      setNumberState(value);
    }
  };

  const handleChangeFilter = e => {
    const { value } = e.target;
    setFilter(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    const id = nanoid();
    const isExist = contacts.find(contact => contact.name === nameState);
    isExist
      ? alert(`${nameState} already exists in contacts.`)
      : setContacts(prevContacts => [
          ...prevContacts,
          { name: nameState, number: numberState, id: id },
        ]);
    form.reset();
  };

  const handleFiltering = () => {
    let filtered = contacts.filter(el =>
      el.name.toLowerCase().includes(filter.toLowerCase())
    );
    return filtered;
  };

  const handleDelete = e => {
    const nameToDelete = e.target.id;
    setContacts(contacts.filter(name => name.id !== nameToDelete));
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onChange={handleChange} onSubmit={handleSubmit} />
      <h2>Contacts</h2>
      <Filter onChange={handleChangeFilter} />
      <ContactList contacts={handleFiltering()} onDelete={handleDelete} />
    </div>
  );
};
