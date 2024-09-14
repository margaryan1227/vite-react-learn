import './JournalAddButton.css';
import CardButton from '../card-button/CardButton.jsx';

function JournalAddButton() {
	return (
		<CardButton className="journal-add">
			<img className="add-icon" src="/plus-icon.svg" alt="Add new"/>
			Add New Note
		</CardButton>
	);
}

export default JournalAddButton;
