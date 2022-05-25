import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { FormattedMessage, injectIntl } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import * as actions from '../../../store/actions';
import { HtmlRaw } from '../../../utils';
import SystemStyles from '../../../styles/System.module.scss';

class UserList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			users: [],
		};
	}

	handleEditUser = (user) => {
		const { handleEditUser } = this.props;
		handleEditUser(user);
	};

	handleDestroyUser = (userId) => {
		const { intl, handleDestroyUser } = this.props;
		const confirmsLang = {
			title: intl.formatMessage({ id: 'app.notify' }),
			message: intl.formatMessage({ id: 'app.delete-confirmation' }),
		};

		confirmAlert({
			title: confirmsLang.title,
			childrenElement: () => {
				return (
					<>
						<HtmlRaw>{confirmsLang.message}</HtmlRaw>
					</>
				);
			},
			buttons: [
				{
					label: 'No',
					className: 'btn btn-sm btn-secondary',
				},
				{
					label: 'Yes',
					className: 'btn btn-sm btn-danger',
					onClick: () => {
						handleDestroyUser(userId);
					},
				},
			],
		});
	};

	async componentDidMount() {
		const { fetchUsers } = this.props;
		await fetchUsers();
	}

	async componentDidUpdate(prevProps) {
		const { users } = this.props;

		if (prevProps.users !== users) {
			this.setState({
				users,
			});
		}
	}

	render() {
		const { users } = this.state;
		const { loadingFetchUsers } = this.props;

		return (
			<>
				<div className={SystemStyles.titleMain}>
					<FormattedMessage id="menu.admin.user-management.types.user-list" />
				</div>
				<div className={SystemStyles.contentMain}>
					{loadingFetchUsers ? (
						<div className="alert alert-info">Loading data ...</div>
					) : !_.isEmpty(users) ? (
						<>
							<table className="table table-bordered">
								<thead>
									<tr>
										<th scope="col">#</th>
										<th scope="col">First name</th>
										<th scope="col">Last name</th>
										<th scope="col">Email</th>
										<th scope="col">Address</th>
										<th scope="col">Gender</th>
										<th scope="col">Phone</th>
										<th scope="col" className="text-center">
											Action
										</th>
									</tr>
								</thead>
								<tbody>
									{users.map((user, index) => {
										return (
											<tr key={user.id}>
												<th scope="row">{index + 1}</th>
												<td>{user.firstName}</td>
												<td>{user.lastName}</td>
												<td>{user.email}</td>
												<td>{user.address}</td>
												<td>{user.gender === 'M' ? 'Male' : 'Female'}</td>
												<td>{user.phone}</td>
												<td className="text-center">
													<button
														type="button"
														className="btn btn-sm btn-info text-white me-2"
														onClick={() => this.handleEditUser(user)}
													>
														<i>
															<FontAwesomeIcon icon={faPencilAlt} />
														</i>
													</button>
													<button
														type="button"
														className="btn btn-sm btn-danger text-white"
														onClick={() => this.handleDestroyUser(user.id)}
													>
														<i>
															<FontAwesomeIcon icon={faTrashAlt} />
														</i>
													</button>
												</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						</>
					) : (
						<div className="alert alert-warning">
							<FormattedMessage id="app.no-results-found" />
						</div>
					)}
				</div>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		users: state.user.users,
		loadingFetchUsers: state.user.actions.fetch.loading,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchUsers: () => dispatch(actions.fetchUsers()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(UserList));
