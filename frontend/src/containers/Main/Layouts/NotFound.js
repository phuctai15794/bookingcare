import React from 'react';
import { NavLink } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { PATHS } from '../../../utils';
import './NotFound.scss';

class NotFound extends React.Component {
	render() {
		return (
			<>
				<div className="error-template">
					<h1>Oops!</h1>
					<h2>
						<FormattedMessage id="app.not-found-title" />
					</h2>
					<div className="error-details">
						<FormattedMessage id="app.not-found-message" />
					</div>
					<div className="error-actions">
						<NavLink className="btn btn-primary" to={PATHS.MAIN.HOME}>
							<FormattedMessage id="app.back-to-home" />
						</NavLink>
					</div>
				</div>
			</>
		);
	}
}

export default NotFound;
