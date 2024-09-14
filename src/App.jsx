import './App.css';
import JournalItem from './components/journal-item/JournalItem';
import CardButton from './components/card-button/CardButton.jsx';
import LeftPanel from './layouts/left-panel/LeftPanel.jsx';
import Body from './layouts/body/Body.jsx';
import Header from './components/header/Header.jsx';
import JournalList from './components/journal-list/JournalList.jsx';
import JournalAddButton from './components/journal-add-button/JournalAddButton.jsx';
import {useState} from 'react';

function App() {
	const data = [{
		title: 'Preparing to update courses',
		text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa ipsum magni minus porro qui suscipit totam ullam!',
		date: new Date()
	}, {
		title: 'Climbing the mountains',
		text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa ipsum magni minus porro qui suscipit totam ullam!',
		date: new Date()
	}];

	const [inputData, setInputData] = useState('');

	const inputChange = (e) => {
		const { value} = e.target;
		setInputData(value);
	};

	return (
		<div className="app">
			<LeftPanel>
				<Header />
				<JournalAddButton />
				<JournalList>
					<CardButton>
						<JournalItem title={data[0].title} text={data[0].text} date={data[0].date}/>
					</CardButton>
					<CardButton>
						<JournalItem title={data[1].title} text={data[1].text} date={data[1].date}/>
					</CardButton>
				</JournalList>
			</LeftPanel>
			<Body>
				<input type="text" value={inputData} onChange={inputChange} />
			</Body>

		</div>
	);
}

export default App;
