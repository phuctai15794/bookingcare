import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFloppyDisk, faTimes } from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { HtmlRaw, Constants } from '../../../utils';
import * as actions from '../../../store/actions';
import SystemStyles from '../../../styles/System.module.scss';

// Init a markdown parser
const mdParser = new MarkdownIt();

class DoctorManage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			doctorId: '',
			description: '',
			contentHTML: '',
			contentMarkdown: '',
			isEdit: false,
			select: {
				list: [],
				selected: null,
			},
			message: {
				text: '',
				type: '',
			},
		};
	}

	handleOnChangeEditor = ({ html, text }) => {
		this.setState({
			contentHTML: html,
			contentMarkdown: text,
			message: {
				text: '',
				type: '',
			},
		});
	};

	handleOnChangeSelect = async (selectedOption) => {
		const { getDetailDoctor } = this.props;
		await getDetailDoctor(selectedOption.value);

		this.setState({
			doctorId: selectedOption.value,
			select: {
				...this.state.select,
				selected: selectedOption,
			},
			message: {
				text: '',
				type: '',
			},
		});
	};

	handleOnChangeDesciption = (event) => {
		this.setState({
			description: event.target.value,
			message: {
				text: '',
				type: '',
			},
		});
	};

	handleSave = async () => {
		const { updateInfoDoctor } = this.props;
		await updateInfoDoctor(this.state);
	};

	handleCancel = async () => {
		const { doctors } = this.props;
		const optionsDoctor = this.buildDoctorsSelect(doctors);

		this.setState({
			doctorId: '',
			description: '',
			contentHTML: '',
			contentMarkdown: '',
			isEdit: false,
			select: {
				list: optionsDoctor || [],
				selected: null,
			},
			message: {
				text: '',
				type: '',
			},
		});
	};

	buildDoctorsSelect = (doctors) => {
		const { language } = this.props;

		return (
			doctors &&
			doctors.map((doctor) => ({
				value: doctor.id,
				label:
					language === Constants.LANGUAGES.VI
						? `${doctor.firstName} ${doctor.lastName}`
						: language === Constants.LANGUAGES.EN
						? `${doctor.lastName} ${doctor.firstName}`
						: '',
			}))
		);
	};

	async componentDidMount() {
		const { fetchDoctors } = this.props;
		await fetchDoctors();
	}

	componentDidUpdate(prevProps) {
		const { language, doctors, doctorDetail, messageDoctor } = this.props;

		if (prevProps.doctors !== doctors || prevProps.language !== language) {
			const optionsDoctor = this.buildDoctorsSelect(doctors);

			this.setState({
				select: {
					...this.state.select,
					list: optionsDoctor || [],
				},
			});
		}

		if (prevProps.messageDoctor !== messageDoctor) {
			if (messageDoctor.type === 'success') {
				const optionsDoctor = this.buildDoctorsSelect(doctors);

				this.setState({
					doctorId: '',
					description: '',
					contentHTML: '',
					contentMarkdown: '',
					isEdit: false,
					select: {
						list: optionsDoctor || [],
						selected: null,
					},
					message: {
						text: '',
						type: '',
					},
				});

				toast.success(<HtmlRaw>{`${messageDoctor.text}`}</HtmlRaw>);
			} else if (messageDoctor.type === 'error') {
				toast.error(<HtmlRaw>{`${messageDoctor.text}`}</HtmlRaw>);
			}

			this.setState({
				message: messageDoctor,
			});
		}

		if (prevProps.doctorDetail !== doctorDetail) {
			const optionsDoctor = this.buildDoctorsSelect(doctors);

			this.setState({
				doctorId: doctorDetail.doctorId,
				description: doctorDetail.markdownData.description || '',
				contentHTML: doctorDetail.markdownData.contentHTML || '',
				contentMarkdown: doctorDetail.markdownData.contentMarkdown || '',
				select: {
					list: optionsDoctor || [],
					selected: {
						value: doctorDetail.id,
						label:
							language === Constants.LANGUAGES.VI
								? `${doctorDetail.firstName} ${doctorDetail.lastName}`
								: language === Constants.LANGUAGES.EN
								? `${doctorDetail.lastName} ${doctorDetail.firstName}`
								: '',
					},
				},
				isEdit: true,
				message: {
					text: '',
					type: '',
				},
			});
		}
	}

	render() {
		const { select, contentMarkdown, description, message, isEdit } = this.state;
		const { intl } = this.props;
		const selectLang = {
			placeholder: intl.formatMessage({ id: 'form.others.list-of-doctor' }),
			noMatched: intl.formatMessage({ id: 'app.no-results-found' }),
		};

		return (
			<>
				<div className={SystemStyles.titleMain}>
					<FormattedMessage id="menu.admin.user-management.types.doctor" />
				</div>
				<div className={SystemStyles.contentMain}>
					{message.type !== '' ? (
						<div className={`alert alert-${message.type === 'error' ? 'danger' : message.type}`}>
							{message.text}
						</div>
					) : (
						''
					)}
					<form action="#" method="POST" onSubmit={(event) => event.preventDefault()}>
						<div className="row mb-3">
							<div className="col-3 mb-3">
								<label className="fw-bold mb-1">
									<FormattedMessage id="form.actions.choose-a-doctor" />:
								</label>
								<Select
									placeholder={selectLang.placeholder}
									value={select.selected}
									options={select.list}
									isSearchable
									noOptionsMessage={() => selectLang.noMatched}
									onChange={this.handleOnChangeSelect}
								/>
							</div>
							<div className="col-12 mb-3">
								<label className="fw-bold mb-1" htmlFor="description">
									<FormattedMessage id="form.attributes.description" />:
								</label>
								<textarea
									className="form-control"
									id="description"
									name="description"
									rows="5"
									value={description}
									onChange={(event) => this.handleOnChangeDesciption(event)}
								></textarea>
							</div>
							<div className="col-12">
								<label className="fw-bold mb-1">
									<FormattedMessage id="form.attributes.content" />:
								</label>
								{
									<MdEditor
										style={{ height: '400px' }}
										renderHTML={(text) => mdParser.render(text)}
										onChange={this.handleOnChangeEditor}
										value={contentMarkdown}
									/>
								}
							</div>
						</div>
						<button
							type="button"
							className="btn btn-sm btn-primary px-3 py-2"
							onClick={() => this.handleSave()}
						>
							<i>
								<FontAwesomeIcon className="me-2" icon={faFloppyDisk} />
							</i>
							<FormattedMessage id="form.actions.save" />
						</button>
						{isEdit && (
							<button
								type="button"
								className="btn btn-sm btn-danger px-3 py-2 ms-2"
								onClick={() => this.handleCancel()}
							>
								<i>
									<FontAwesomeIcon className="me-2" icon={faTimes} />
								</i>
								<FormattedMessage id="form.actions.cancel" />
							</button>
						)}
					</form>
				</div>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		language: state.app.language,
		loadingDoctor: state.doctor.loading,
		messageDoctor: state.doctor.message,
		doctors: state.doctor.doctors,
		doctorDetail: state.doctor.doctorDetail,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchDoctors: () => dispatch(actions.fetchDoctors()),
		updateInfoDoctor: (data) => dispatch(actions.updateInfoDoctor(data)),
		getDetailDoctor: (id) => dispatch(actions.getDetailDoctor(id)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(DoctorManage));
