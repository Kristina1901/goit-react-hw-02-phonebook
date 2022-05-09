import { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Section from '../Section/Section';
import Container from '../Container/Container';
import ContactForm from '../ContactForm/ContactForm';
import Filter from '../Filter/Filter';
import ContactList from '../ContacList/ContactList';
import s from '../App/App.module.css';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
    name: '',
    number: '',
  };

  repeatCheck = newName => {
    return this.state.contacts.find(({ name }) => name === newName);
  };
  showNotification = name => {
    alert(`${name} is already in contacts`);
  };
  addContact = ({ name, number }) => {
    if (!this.repeatCheck(name)) {
      const contact = {
        id: uuidv4(),
        name,
        number,
      };

      this.setState(({ contacts }) => ({
        contacts: [contact, ...contacts],
      }));
      return;
    }
    this.showNotification(name);
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  setFilterValue = e => {
    this.setState({ filter: e.currentTarget.value.trim() });
  };

  getResultSearch = () => {
    const { filter, contacts } = this.state;

    return contacts.filter(
      contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase()) ||
        contact.number.includes(filter)
    );
  };

  render() {
    const { filter } = this.state;
    const ResultSearch = this.getResultSearch();
    return (
      <>
        <header>
          <Container>
            <h1 className={s.title}>Phonebook</h1>
          </Container>
        </header>
        <Section nameForClass={'section'}>
          <div>
            <ContactForm onSubmit={this.addContact} />
          </div>
        </Section>
        <Section nameForClass={'sectionList'}>
          <h2 className={s.contact}>Contacts</h2>
          <Filter name={filter} onChange={this.setFilterValue} />
          {this.state.contacts[0] && ResultSearch[0] ? (
            <ContactList
              contacts={ResultSearch}
              onDeleteContact={this.deleteContact}
            />
          ) : (
            <p></p>
          )}
        </Section>
      </>
    );
  }
}

export default App;
