import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { FormattedMessage, injectIntl } from 'react-intl';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFloppyDisk, faTimes } from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { HtmlRaw, Constants, Functions } from '../../../utils';
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
			note: '',
			contentHTML: '',
			contentMarkdown: '',
			addressClinic: '',
			nameClinic: '',
			isEdit: false,
			selectDoctors: {
				list: [],
				selected: null,
			},
			selectPrices: {
				list: [],
				selected: null,
			},
			selectPayments: {
				list: [],
				selected: null,
			},
			selectProvinces: {
				list: [],
				selected: null,
			},
			selectSpecialties: {
				list: [],
				selected: null,
			},
			selectClinics: {
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

	handleOnChangeSelect = async (selectedOption, type) => {
		if (type === 'doctors') {
			const { getDetailDoctor } = this.props;
			await getDetailDoctor(selectedOption.value);

			this.setState({
				doctorId: selectedOption.value,
				selectDoctors: {
					...this.state.selectDoctors,
					selected: selectedOption,
				},
				message: {
					text: '',
					type: '',
				},
			});
		} else {
			const keySelect = Functions.toCapitalizCase(type);

			this.setState({
				[`select${keySelect}`]: {
					...this.state[`select${keySelect}`],
					selected: selectedOption,
				},
				message: {
					text: '',
					type: '',
				},
			});
		}
	};

	handleOnChangeInput = (event, type) => {
		this.setState({
			[type]: event.target.value,
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
		const { doctors, prices, payments, provinces, specialties, clinics } = this.props;
		const optionsDoctors = this.buildSelect(doctors, 'Doctor');
		const optionsPrices = this.buildSelect(prices, 'Price');
		const optionsPayments = this.buildSelect(payments, 'Payment');
		const optionsProvince = this.buildSelect(provinces, 'Province');
		const optionsSpecialty = this.buildSelect(specialties, 'Specialty');
		const optionsClinic = this.buildSelect(clinics, 'Clinic');

		this.setState({
			doctorId: '',
			description: '',
			contentHTML: '',
			contentMarkdown: '',
			note: '',
			addressClinic: '',
			nameClinic: '',
			isEdit: false,
			selectDoctors: {
				list: optionsDoctors || [],
				selected: null,
			},
			selectPrices: {
				list: optionsPrices || [],
				selected: null,
			},
			selectPayments: {
				list: optionsPayments || [],
				selected: null,
			},
			selectProvinces: {
				list: optionsProvince || [],
				selected: null,
			},
			selectSpecialties: {
				list: optionsSpecialty || [],
				selected: null,
			},
			selectClinics: {
				list: optionsClinic || [],
				selected: null,
			},
			message: {
				text: '',
				type: '',
			},
		});
	};

	buildSelect = (options, type) => {
		const { language } = this.props;
		const keyLang = Functions.toCapitalizCase(language);

		return (
			!_.isEmpty(options) &&
			((type === 'Doctor' &&
				options.map((doctor) => ({
					value: doctor.id,
					label:
						language === Constants.LANGUAGES.VI
							? `${doctor.firstName} ${doctor.lastName}`
							: language === Constants.LANGUAGES.EN
							? `${doctor.lastName} ${doctor.firstName}`
							: '',
				}))) ||
				(['Price', 'Payment', 'Province'].includes(type) &&
					options.map((item) => ({
						value: item.keyMap,
						label:
							(type === 'Price' && Functions.formatPrice(`${item[`value${keyLang}`]}`, language)) ||
							`${item[`value${keyLang}`]}`,
					}))) ||
				(['Specialty', 'Clinic'].includes(type) &&
					options.map((item) => ({
						value: item.id,
						label: item.name,
					}))))
		);
	};

	async componentDidMount() {
		const { fetchDoctors, fetchAllCode, fetchSpecialties, fetchClinics } = this.props;
		await fetchDoctors();
		await fetchAllCode('PRICE');
		await fetchAllCode('PAYMENT');
		await fetchAllCode('PROVINCE');
		await fetchSpecialties();
		await fetchClinics();
	}

	componentDidUpdate(prevProps) {
		const { language, doctors, doctorDetail, prices, payments, provinces, specialties, clinics, messageDoctor } =
			this.props;

		if (prevProps.doctors !== doctors || prevProps.language !== language) {
			const optionsDoctors = this.buildSelect(doctors, 'Doctor');

			this.setState({
				selectDoctors: {
					...this.state.selectDoctors,
					list: optionsDoctors || [],
				},
			});
		}

		if (prevProps.prices !== prices || prevProps.language !== language) {
			const optionsPrices = this.buildSelect(prices, 'Price');

			this.setState({
				selectPrices: {
					...this.state.selectPrices,
					list: optionsPrices || [],
				},
			});
		}

		if (prevProps.payments !== payments || prevProps.language !== language) {
			const optionsPayments = this.buildSelect(payments, 'Payment');

			this.setState({
				selectPayments: {
					...this.state.selectPayments,
					list: optionsPayments || [],
				},
			});
		}

		if (prevProps.provinces !== provinces || prevProps.language !== language) {
			const optionsProvince = this.buildSelect(provinces, 'Province');

			this.setState({
				selectProvinces: {
					...this.state.selectProvinces,
					list: optionsProvince || [],
				},
			});
		}

		if (prevProps.specialties !== specialties) {
			const optionsSpecialty = this.buildSelect(specialties, 'Specialty');

			this.setState({
				selectSpecialties: {
					...this.state.selectSpecialties,
					list: optionsSpecialty || [],
				},
			});
		}

		if (prevProps.clinics !== clinics) {
			const optionsClinic = this.buildSelect(clinics, 'Clinic');

			this.setState({
				selectClinics: {
					...this.state.selectClinics,
					list: optionsClinic || [],
				},
			});
		}

		if (prevProps.doctorDetail !== doctorDetail) {
			const optionsDoctors = this.buildSelect(doctors, 'Doctor');
			const optionsPrices = this.buildSelect(prices, 'Price');
			const optionsPayments = this.buildSelect(payments, 'Payment');
			const optionsProvince = this.buildSelect(provinces, 'Province');
			const optionsSpecialty = this.buildSelect(specialties, 'Specialty');
			const optionsClinic = this.buildSelect(clinics, 'Clinic');
			const keyLang = Functions.toCapitalizCase(language);
			let selectedPrice = null,
				selectedPayment = null,
				selectedProvince = null,
				selectedSpecialty = null,
				selectedClinic = null;

			if (doctorDetail.infoData.priceData.keyMap) {
				selectedPrice = {
					value: doctorDetail.infoData.priceData.keyMap,
					label: `${doctorDetail.infoData.priceData[`value${keyLang}`]}`,
				};
			}

			if (doctorDetail.infoData.paymentData.keyMap) {
				selectedPayment = {
					value: doctorDetail.infoData.paymentData.keyMap,
					label: `${doctorDetail.infoData.paymentData[`value${keyLang}`]}`,
				};
			}

			if (doctorDetail.infoData.provinceData.keyMap) {
				selectedProvince = {
					value: doctorDetail.infoData.provinceData.keyMap,
					label: `${doctorDetail.infoData.provinceData[`value${keyLang}`]}`,
				};
			}

			if (doctorDetail.infoData.provinceData.keyMap) {
				selectedProvince = {
					value: doctorDetail.infoData.provinceData.keyMap,
					label: `${doctorDetail.infoData.provinceData[`value${keyLang}`]}`,
				};
			}

			if (doctorDetail.infoData.specialtyData.id) {
				selectedSpecialty = {
					value: doctorDetail.infoData.specialtyData.id,
					label: doctorDetail.infoData.specialtyData.name,
				};
			}

			if (doctorDetail.infoData.clinicData.id) {
				selectedClinic = {
					value: doctorDetail.infoData.clinicData.id,
					label: doctorDetail.infoData.clinicData.name,
				};
			}

			this.setState({
				doctorId: doctorDetail.doctorId,
				description: doctorDetail.markdownData.description || '',
				contentHTML: doctorDetail.markdownData.contentHTML || '',
				contentMarkdown: doctorDetail.markdownData.contentMarkdown || '',
				note: doctorDetail.infoData.note || '',
				addressClinic: doctorDetail.infoData.addressClinic || '',
				nameClinic: doctorDetail.infoData.nameClinic || '',
				selectDoctors: {
					list: optionsDoctors || [],
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
				selectPrices: {
					list: optionsPrices || [],
					selected: selectedPrice,
				},
				selectPayments: {
					list: optionsPayments || [],
					selected: selectedPayment,
				},
				selectProvinces: {
					list: optionsProvince || [],
					selected: selectedProvince,
				},
				selectSpecialties: {
					list: optionsSpecialty || [],
					selected: selectedSpecialty,
				},
				selectClinics: {
					list: optionsClinic || [],
					selected: selectedClinic,
				},
				isEdit: true,
				message: {
					text: '',
					type: '',
				},
			});
		}

		if (prevProps.messageDoctor !== messageDoctor) {
			if (messageDoctor.type === 'success') {
				const optionsDoctors = this.buildSelect(doctors, 'Doctor');
				const optionsPrices = this.buildSelect(prices, 'Price');
				const optionsPayments = this.buildSelect(payments, 'Payment');
				const optionsProvince = this.buildSelect(provinces, 'Province');
				const optionsSpecialty = this.buildSelect(specialties, 'Specialty');
				const optionsClinic = this.buildSelect(clinics, 'Clinic');

				this.setState({
					doctorId: '',
					description: '',
					contentHTML: '',
					contentMarkdown: '',
					note: '',
					addressClinic: '',
					nameClinic: '',
					isEdit: false,
					selectDoctors: {
						list: optionsDoctors || [],
						selected: null,
					},
					selectPrices: {
						list: optionsPrices || [],
						selected: null,
					},
					selectPayments: {
						list: optionsPayments || [],
						selected: null,
					},
					selectProvinces: {
						list: optionsProvince || [],
						selected: null,
					},
					selectSpecialties: {
						list: optionsSpecialty || [],
						selected: null,
					},
					selectClinics: {
						list: optionsClinic || [],
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
	}

	render() {
		const {
			selectDoctors,
			selectPrices,
			selectPayments,
			selectProvinces,
			selectSpecialties,
			selectClinics,
			contentMarkdown,
			nameClinic,
			addressClinic,
			note,
			description,
			message,
			isEdit,
		} = this.state;
		const { intl } = this.props;
		const selectLang = {
			placeholderDoctors: intl.formatMessage({ id: 'form.others.list-of-doctors' }),
			placeholderPrices: intl.formatMessage({ id: 'form.others.list-of-prices' }),
			placeholderPayments: intl.formatMessage({ id: 'form.others.list-of-payments' }),
			placeholderProvinces: intl.formatMessage({ id: 'form.others.list-of-provinces' }),
			placeholderSpecialties: intl.formatMessage({ id: 'form.others.list-of-specialties' }),
			placeholderClinics: intl.formatMessage({ id: 'form.others.list-of-clinics' }),
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
									placeholder={selectLang.placeholderDoctors}
									value={selectDoctors.selected}
									options={selectDoctors.list}
									isSearchable
									noOptionsMessage={() => selectLang.noMatched}
									onChange={(selectedOption) => this.handleOnChangeSelect(selectedOption, 'doctors')}
								/>
							</div>
							<div className="col-3 mb-3">
								<label className="fw-bold mb-1">
									<FormattedMessage id="form.actions.choose-a-price" />:
								</label>
								<Select
									placeholder={selectLang.placeholderPrices}
									value={selectPrices.selected}
									options={selectPrices.list}
									isSearchable
									noOptionsMessage={() => selectLang.noMatched}
									onChange={(selectedOption) => this.handleOnChangeSelect(selectedOption, 'prices')}
								/>
							</div>
							<div className="col-3 mb-3">
								<label className="fw-bold mb-1">
									<FormattedMessage id="form.actions.choose-a-payment" />:
								</label>
								<Select
									placeholder={selectLang.placeholderPayments}
									value={selectPayments.selected}
									options={selectPayments.list}
									isSearchable
									noOptionsMessage={() => selectLang.noMatched}
									onChange={(selectedOption) => this.handleOnChangeSelect(selectedOption, 'payments')}
								/>
							</div>
							<div className="col-3 mb-3">
								<label className="fw-bold mb-1">
									<FormattedMessage id="form.actions.choose-a-province" />:
								</label>
								<Select
									placeholder={selectLang.placeholderProvinces}
									value={selectProvinces.selected}
									options={selectProvinces.list}
									isSearchable
									noOptionsMessage={() => selectLang.noMatched}
									onChange={(selectedOption) =>
										this.handleOnChangeSelect(selectedOption, 'provinces')
									}
								/>
							</div>
							<div className="col-3 mb-3">
								<label className="fw-bold mb-1">
									<FormattedMessage id="form.actions.choose-a-specialty" />:
								</label>
								<Select
									placeholder={selectLang.placeholderSpecialties}
									value={selectSpecialties.selected}
									options={selectSpecialties.list}
									isSearchable
									noOptionsMessage={() => selectLang.noMatched}
									onChange={(selectedOption) =>
										this.handleOnChangeSelect(selectedOption, 'specialties')
									}
								/>
							</div>
							<div className="col-3 mb-3">
								<label className="fw-bold mb-1">
									<FormattedMessage id="form.actions.choose-a-clinic" />:
								</label>
								<Select
									placeholder={selectLang.placeholderClinics}
									value={selectClinics.selected}
									options={selectClinics.list}
									isSearchable
									noOptionsMessage={() => selectLang.noMatched}
									onChange={(selectedOption) => this.handleOnChangeSelect(selectedOption, 'clinics')}
								/>
							</div>
							<div className="col-6 mb-3">
								<label className="fw-bold mb-1" htmlFor="nameClinic">
									<FormattedMessage id="form.attributes.nameClinic" />:
								</label>
								<input
									type="text"
									className="form-control"
									id="nameClinic"
									name="nameClinic"
									required
									value={nameClinic}
									onChange={(event) => this.handleOnChangeInput(event, 'nameClinic')}
								/>
							</div>
							<div className="col-12 mb-3">
								<label className="fw-bold mb-1" htmlFor="addressClinic">
									<FormattedMessage id="form.attributes.addressClinic" />:
								</label>
								<input
									type="text"
									className="form-control"
									id="addressClinic"
									name="addressClinic"
									required
									value={addressClinic}
									onChange={(event) => this.handleOnChangeInput(event, 'addressClinic')}
								/>
							</div>
							<div className="col-6 mb-3">
								<label className="fw-bold mb-1" htmlFor="note">
									<FormattedMessage id="form.attributes.note" />:
								</label>
								<textarea
									className="form-control"
									id="note"
									name="note"
									rows="5"
									value={note}
									onChange={(event) => this.handleOnChangeInput(event, 'note')}
								></textarea>
							</div>
							<div className="col-6 mb-3">
								<label className="fw-bold mb-1" htmlFor="description">
									<FormattedMessage id="form.attributes.description" />:
								</label>
								<textarea
									className="form-control"
									id="description"
									name="description"
									rows="5"
									value={description}
									onChange={(event) => this.handleOnChangeInput(event, 'description')}
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
		messageDoctor: state.doctor.message,
		doctors: state.doctor.doctors,
		doctorDetail: state.doctor.doctorDetail,
		prices: state.allCode.prices.data,
		payments: state.allCode.payments.data,
		provinces: state.allCode.provinces.data,
		specialties: state.specialty.specialties,
		clinics: state.clinic.clinics,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchDoctors: () => dispatch(actions.fetchDoctors()),
		fetchAllCode: (type) => dispatch(actions.fetchAllCode(type)),
		fetchSpecialties: () => dispatch(actions.fetchSpecialties()),
		fetchClinics: () => dispatch(actions.fetchClinics()),
		updateInfoDoctor: (data) => dispatch(actions.updateInfoDoctor(data)),
		getDetailDoctor: (id) => dispatch(actions.getDetailDoctor(id)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(DoctorManage));
