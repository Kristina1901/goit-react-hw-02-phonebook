import { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Section from './Section';
import Container from './Container';
import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from './ContactList';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  repeatCheck = newName => {
    return this.state.contacts.find(({ name }) => name === newName);
  };
  showNotification = name => {
    alert(`${name} is already contacts`);
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
            <h1>Phonebook</h1>
          </Container>
        </header>
        <Section nameForClass={'section'}>
          <div>
            <ContactForm onSubmit={this.addContact} />
          </div>
        </Section>
        <Section nameForClass={'sectionList'}>
          <h2>Contacts</h2>
          <Filter name={filter} onChange={this.setFilterValue} />
          {this.state.contacts[0] && ResultSearch[0] ? (
            <ContactList
              contacts={ResultSearch}
              onDeleteContact={this.deleteContact}
            />
          ) : (
            <p>There’s nothing here yet...</p>
          )}
        </Section>
      </>
    );
  }
}

export default App;
