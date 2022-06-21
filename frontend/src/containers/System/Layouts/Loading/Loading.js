import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoadingStyles from './Loading.module.scss';

class Loading extends Component {
	render() {
		const { loading, loadingSendRemedy } = this.props;

		return (
			<>
				{(loading || loadingSendRemedy) && (
					<div className={LoadingStyles.loadingPage}>
						<div className={`${LoadingStyles.ispinner} ${LoadingStyles.ispinnerLarge}`}>
							<div className={LoadingStyles.ispinnerBlade}></div>
							<div className={LoadingStyles.ispinnerBlade}></div>
							<div className={LoadingStyles.ispinnerBlade}></div>
							<div className={LoadingStyles.ispinnerBlade}></div>
							<div className={LoadingStyles.ispinnerBlade}></div>
							<div className={LoadingStyles.ispinnerBlade}></div>
							<div className={LoadingStyles.ispinnerBlade}></div>
							<div className={LoadingStyles.ispinnerBlade}></div>
						</div>
					</div>
				)}
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		loading: state.user.loading,
		loadingSendRemedy: state.doctor.actions.sendRemedy.loading,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Loading);
