import PropTypes from 'prop-types';
import ContactItem from '../Contactitem/ContactItem';
import s from '../ContacList/ContactList.module.css';
const ContactList = ({ contacts, onDeleteContact }) => (
  <ul>
    {contacts.map(({ id, name, number }) => (
      <li key={id} className={s.item}>
        <ContactItem
          id={id}
          name={name}
          number={number}
          onDeleteContact={onDeleteContact}
        />
      </li>
    ))}
  </ul>
);

export default ContactList;

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.string.isRequired).isRequired
  ).isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};
