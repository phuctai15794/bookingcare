import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import _ from 'lodash';
import { FormattedMessage, injectIntl } from 'react-intl';
import Select from 'react-select';
import { HtmlRaw, Functions, Constants } from '../../../utils';
import * as actions from '../../../store/actions';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorProfile from '../Doctor/DoctorProfile';
import DoctorInfo from '../Doctor/DoctorInfo';
import MainStyles from '../../../styles/Main.module.scss';
import SpecialtyDetailStyles from './SpecialtyDetail.module.scss';

class SpecialtyDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			specialtyDetail: null,
			doctorIds: null,
			provinceIds: null,
			selectProvinces: {
				list: [
					{
						value: 'ALL',
						label: 'Toàn quốc',
					},
				],
				selected: null,
			},
			isShowInfo: false,
		};
	}

	handleShowHideInfo = () => {
		this.setState({
			isShowInfo: !this.state.isShowInfo,
		});
	};

	handleOnChangeSelect = async (selectedOption, type) => {
		const { match, history, getDetailSpecialty } = this.props;
		const id = match.params.id;
		const specialtyId = isNaN(id) ? id.split('?')[0] : id;
		const locationId = selectedOption.value;
		const keySelect = Functions.toCapitalizeCase(type);

		history.replace({
			pathname: `${Constants.PATHS.MAIN.SPECIALTY_DETAIL}/${specialtyId}${
				locationId && `?locationId=${locationId}`
			}`,
		});

		this.setState({
			[`select${keySelect}`]: {
				...this.state[`select${keySelect}`],
				selected: selectedOption,
			},
		});

		await getDetailSpecialty(specialtyId, locationId);
	};

	buildIds = (ids, type) => {
		return ids.map((id) => id[type]);
	};

	buildSelect = (options) => {
		const { language } = this.props;
		const keyLang = Functions.toCapitalizeCase(language);

		return !_.isEmpty(options)
			? options.map((item) => ({
					value: item.keyMap,
					label: `${item[`value${keyLang}`]}`,
			  }))
			: [];
	};

	async componentDidMount() {
		const { match, location, getDetailSpecialty, fetchAllCode } = this.props;
		const id = match.params.id;
		const specialtyId = isNaN(id) ? id.split('?')[0] : id;
		const queryParams = new URLSearchParams(location.search);
		const locationId = queryParams.get('locationId') || 'ALL';
		await fetchAllCode('PROVINCE');
		await getDetailSpecialty(specialtyId, locationId);
	}

	componentDidUpdate(prevProps) {
		const { language, location, specialtyDetail, provinces } = this.props;

		if (prevProps.specialtyDetail !== specialtyDetail) {
			this.setState({
				doctorIds: this.buildIds(specialtyDetail.doctorInfos, 'doctorId'),
				provinceIds: this.buildIds(specialtyDetail.doctorInfos, 'provinceId'),
				specialtyDetail,
			});
		}

		if (prevProps.provinces !== provinces || prevProps.language !== language) {
			const optionsProvince = this.buildSelect(provinces);
			const queryParams = new URLSearchParams(location.search);
			const locationId = queryParams.get('locationId') || 'ALL';
			const selectedProvince =
				locationId === 'ALL'
					? {
							value: 'ALL',
							label: 'Toàn quốc',
					  }
					: optionsProvince.filter((option) => option.value === locationId);

			this.setState({
				selectProvinces: {
					...this.state.selectProvinces,
					list: [...this.state.selectProvinces.list, ...optionsProvince],
					selected: selectedProvince,
				},
			});
		}
	}

	render() {
		const { specialtyDetail, isShowInfo, doctorIds, selectProvinces } = this.state;
		const { intl } = this.props;
		const selectLang = {
			placeholderProvinces: intl.formatMessage({ id: 'form.others.list-of-provinces' }),
			noMatched: intl.formatMessage({ id: 'app.no-results-found' }),
		};
		const image = specialtyDetail && specialtyDetail.image && Functions.bufferToBase64(specialtyDetail.image);

		return (
			<>
				{specialtyDetail ? (
					<div className={SpecialtyDetailStyles.specialtyDetail}>
						<div
							className={SpecialtyDetailStyles.specialtyDetailInformation}
							style={{ backgroundImage: `url(${image})` }}
						>
							<div className={SpecialtyDetailStyles.specialtyDetailInformationInner}>
								<div className={`${MainStyles.blockContent} ${SpecialtyDetailStyles.blockContent}`}>
									<h3 className={SpecialtyDetailStyles.specialtyDetailTitle}>
										{specialtyDetail.name}
									</h3>
									<div
										className={`${SpecialtyDetailStyles.specialtyDetailContent} ${
											isShowInfo && SpecialtyDetailStyles.active
										}`}
									>
										<HtmlRaw>{specialtyDetail.contentHTML}</HtmlRaw>
									</div>
									<span className={MainStyles.viewMore} onClick={() => this.handleShowHideInfo()}>
										{isShowInfo ? (
											<FormattedMessage id="app.hide-less" />
										) : (
											<FormattedMessage id="app.view-more" />
										)}
									</span>
								</div>
							</div>
						</div>
						<div className={SpecialtyDetailStyles.specialtyDetailDoctorList}>
							<div className={`${MainStyles.blockContent} ${SpecialtyDetailStyles.blockContent}`}>
								<div className={SpecialtyDetailStyles.specialtyDetailSearchBar}>
									<div className="row">
										<div className="col-3 mb-4">
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
									</div>
								</div>
								{doctorIds && doctorIds.length ? (
									doctorIds.map((doctorId) => {
										return (
											<div
												className={SpecialtyDetailStyles.specialtyDetailDoctorItem}
												key={doctorId}
											>
												<div className="row">
													<div className="col-6">
														<div
															className={
																SpecialtyDetailStyles.doctorDetailScheduleBooking
															}
														>
															<DoctorProfile
																doctorId={doctorId}
																isSmallTitle
																isViewDetail
															/>
														</div>
													</div>
													<div className="col-6">
														<div
															className={
																SpecialtyDetailStyles.doctorDetailScheduleInformation
															}
														>
															<DoctorSchedule doctorId={doctorId} />

															<hr />

															<DoctorInfo doctorId={doctorId} />
														</div>
													</div>
												</div>
											</div>
										);
									})
								) : (
									<div className="alert alert-warning">
										<FormattedMessage id="app.no-results-found" />
									</div>
								)}
							</div>
						</div>
					</div>
				) : (
					<div className="alert alert-warning">
						<FormattedMessage id="app.no-results-found" />
					</div>
				)}
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		language: state.app.language,
		provinces: state.allCode.provinces.data,
		specialtyDetail: state.specialty.specialtyDetail,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchAllCode: (type) => dispatch(actions.fetchAllCode(type)),
		getDetailSpecialty: (id, locationId) => dispatch(actions.getDetailSpecialty(id, locationId)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(injectIntl(SpecialtyDetail)));
