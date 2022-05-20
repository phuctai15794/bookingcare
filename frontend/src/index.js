import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import reduxStore, { persistor } from './redux';
import Language from './hoc/Language';
import RefreshTokenService from './services/RefreshTokenService';
import App from './containers/App';

ReactDOM.render(
	<React.StrictMode>
		<Provider store={reduxStore}>
			<Language>
				<App persistor={persistor} />
			</Language>
			<RefreshTokenService />
		</Provider>
	</React.StrictMode>,
	document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
