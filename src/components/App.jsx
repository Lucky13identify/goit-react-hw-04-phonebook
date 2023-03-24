import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { ContactList } from './contactList/ContactList';
import { ContactForm } from './сontactForm/ContactForm';

export function App() {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts')) ?? ''
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const changeFilter = e => {
    setFilter(e.target.value);
  };

  const onDelete = id => {
    setContacts(prevState => prevState.filter(itemId => itemId.id !== id));
  };

  const testName = data => {
    for (const item of contacts) {
      if (item.name === data.name) {
        console.log('YES');
        return;
      }
    }
    setContacts(prevState => [
      ...prevState,
      {
        id: nanoid(),
        name: data.name,
        number: data.number,
      },
    ]);
  };

  const filterArr = contacts.filter(contact => {
    return contact.name.toLowerCase().includes(filter.toLocaleLowerCase());
  });

  return (
    <div className="main-div">
      <h1>Phonebook</h1>
      <ContactForm filter={changeFilter} testName={testName} />
      <h2>Contacts</h2>
      <ul>
        <ContactList arr={filterArr} deleteF={onDelete} />
      </ul>
    </div>
  );
}
