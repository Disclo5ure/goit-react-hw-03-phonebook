import React from 'react';
import { nanoid } from 'nanoid';
import { Input } from './Input';
import { ContactList } from './ContactList';
import { Filter } from './Filter';

export class App extends React.Component {
  state = {
    contacts: [],
    filter: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = form.elements.name.value;
    const number = form.elements.number.value;
    let contacts = this.state.contacts;
    if (
      contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    )
      alert(`${name} is already in contacts.`);
    else {
      contacts.push({ name: name, number: number, id: nanoid() });
      this.setState({ contacts: contacts });
    }
  };

  handleFilter = e => {
    this.setState({ filter: e.target.value.toLowerCase() });
  };

  getFilteredContacts = () =>
    this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter)
    );

  handleDelete = name => {
    const newContacts = this.state.contacts.filter(
      contact => contact.name !== name
    );
    this.setState({ contacts: newContacts });
  };

  render() {
    return (
      <div className="container">
        <h1>Phonebook</h1>
        <form className="form" onSubmit={this.handleSubmit}>
          <h3>Name</h3>
          <Input
            name="name"
            type="text"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          />
          <h3>Number</h3>
          <Input
            name="number"
            type="tel"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          />
          <button type="submit" className="button">
            Add contact
          </button>
        </form>
        <h2>Contacts</h2>
        <Filter handleFilter={this.handleFilter} />
        <ContactList
          contacts={this.getFilteredContacts()}
          handleDelete={this.handleDelete}
        />
      </div>
    );
  }
}
