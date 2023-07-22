import './App.css'

import Lex from './lex/lex';

function App() {
	return (
		<Lex
			value={[
				{ type: 'text', value: 'foo' },
				{ type: 'mention', value: 'Jane Smith' },
				{ type: 'mention', value: 'Jane Smith2' },
				{ type: 'mention', value: 'Jane Smith3' },
				{ type: 'text', value: 'bar' },
			]}
		/>
	)
}

export default App
