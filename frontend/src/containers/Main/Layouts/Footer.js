import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faCheck } from '@fortawesome/free-solid-svg-icons';
import { PATHS } from '../../../utils';
import MainStyles from '../../../styles/Main.module.scss';
import FooterStyles from './Footer.module.scss';

class Footer extends Component {
	render() {
		return (
			<>
				<div className={FooterStyles.footer}>
					<div className={FooterStyles.footerArticle}>
						<div className={`${MainStyles.blockContent} ${FooterStyles.blockContent}`}>
							<div className="row">
								<div className="col-6">
									<Link className={FooterStyles.footerLogo} to={PATHS.MAIN.HOME}></Link>
									<div className={FooterStyles.footerInfo}>
										<p>
											<strong>Công ty Cổ phần Công nghệ BookingCare</strong>
										</p>
										<ul className="list-unstyled p-0 m-0">
											<li>
												<i>
													<FontAwesomeIcon icon={faMapMarkerAlt} />
												</i>
												<span>28 Thành Thái, Dịch Vọng, Cầu Giấy, Hà Nội</span>
											</li>
											<li>
												<i>
													<FontAwesomeIcon icon={faCheck} />
												</i>
												<span>ĐKKD số: 0106790291. Sở KHĐT Hà Nội cấp ngày 16/03/2015</span>
											</li>
										</ul>
									</div>
								</div>
								<div className="col-3">
									<ul className={`${FooterStyles.footerList} list-unstyled p-0 m-0`}>
										<li>
											<Link to={PATHS.MAIN.HOME}>Liên hệ hợp tác</Link>
										</li>
										<li>
											<Link to={PATHS.MAIN.HOME}>Câu hỏi thường gặp</Link>
										</li>
										<li>
											<Link to={PATHS.MAIN.HOME}>Điều khoản sử dụng</Link>
										</li>
										<li>
											<Link to={PATHS.MAIN.HOME}>Chính sách bảo mật</Link>
										</li>
										<li>
											<Link to={PATHS.MAIN.HOME}>Quy trình hỗ trợ</Link>
										</li>
										<li>
											<Link to={PATHS.MAIN.HOME}>Quy chế hoạt động</Link>
										</li>
									</ul>
								</div>
								<div className="col-3">
									<div className={FooterStyles.footerInfo}>
										<p>
											<strong>Trụ sở tại Hà Nội</strong>
										</p>
										<p>28 Thành Thái, Dịch Vọng, Cầu Giấy, Hà Nội</p>
										<p>
											<strong>Văn phòng tại TP Hồ Chí Minh</strong>
										</p>
										<p>6/6 Cách Mạch Tháng Tám, P. Bến Thành, Quận 1</p>
										<p>
											<strong>Hỗ trợ khách hàng</strong>
										</p>
										<p>support@bookingcare.vn (7h - 18h)</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className={FooterStyles.footerPowered}>
						<div className={`${MainStyles.blockContent} ${FooterStyles.blockContent}`}>
							© 2022 Designed by BookingCare.
						</div>
					</div>
				</div>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
