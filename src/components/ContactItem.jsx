import PropTypes from 'prop-types';

const ContactItem = ({ id, name, number, onDeleteContact }) => (
  <>
    <a href="tel:{number}">
      <p>{name}</p>
      <div>
        <p>{number}</p>
      </div>
    </a>
    <button
      type="button"
      onClick={() => onDeleteContact(id)}
      aria-label="delete contact"
    >
      Delete
    </button>
  </>
);

export default ContactItem;

ContactItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};
