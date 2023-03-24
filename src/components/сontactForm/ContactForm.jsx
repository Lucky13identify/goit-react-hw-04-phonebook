import PropTypes from 'prop-types';
import { useState } from 'react';
import { Form, Button, Input } from './ContactForm.styled';

export function ContactForm({ filter, testName }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const addItem = e => {
    switch (e.target.name) {
      case 'name':
        setName(e.target.value);
        break;

      case 'number':
        setNumber(e.target.value);
        break;

      default:
        console.log('Invalid');
    }
  };

  return (
    <div className="container">
      <Form
        onSubmit={e => {
          e.preventDefault();
          testName({ name, number });
        }}
      >
        <Input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          onChange={addItem}
          required
        />
        <Input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          onChange={addItem}
          required
        />
        <Button type="submit">Add contact</Button>
      </Form>
      <Input type="text" name="filter" onChange={filter}></Input>
    </div>
  );
}

ContactForm.propTypes = {
  submit: PropTypes.func,
  addItem: PropTypes.func,
};
