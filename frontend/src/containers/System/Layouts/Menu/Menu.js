import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import MenuStyles from './Menu.module.scss';

class Menu extends Component {
	render() {
		const { menus } = this.props;

		return (
			<>
				{menus && (
					<div className={MenuStyles.menu}>
						<ul className={MenuStyles.menuMain}>
							{menus.map((group, groupIndex) => {
								return (
									<li className={MenuStyles.menuGroup} key={groupIndex}>
										{group.link ? (
											<Link className={group.menus && MenuStyles.hasChild} to={group.link}>
												<FormattedMessage id={group.name} />
											</Link>
										) : (
											<a className={group.menus && MenuStyles.hasChild} href="# ">
												<FormattedMessage id={group.name} />
											</a>
										)}
										{group.menus && (
											<ul>
												{group.menus.map((item, itemIndex) => {
													return (
														<li key={itemIndex}>
															<Link to={item.link}>
																<FormattedMessage id={item.name} />
															</Link>
														</li>
													);
												})}
											</ul>
										)}
									</li>
								);
							})}
						</ul>
					</div>
				)}
			</>
		);
	}
}

export default Menu;
