import React, { useEffect } from 'react';
import styles from './nav.module.css';
import User from '@/pages/NavPages/User/User';
import Language from '@/pages/NavPages/Language/Language';
import Notice from '@/pages/NavPages/Notice/Notice';
import Mission from '@/pages/NavPages/Mission/Mission';
import Search from '@/pages/NavPages/Search/Search';
import logoUrl from '../../assets/images/nav_logo.png';
import { connect } from 'react-redux';

function Navbar(props) {
	const { user } = props;
	let userPage = <User nickName="未知用户" />;
	if (user) {
		if (user.user) {
			userPage = <User nickName={user.user} />;
		}
	}

	useEffect(() => {
		console.log(user);
	});

	return (
		<div className={styles['nav']}>
			<div className={styles['nav-logo']}>
				<img src={logoUrl} alt="" className={styles['nav-logo-img']} />
				<div></div>
				<span className={styles['nav-title']}>边缘计算平台</span>
			</div>
			<div className={styles['nav-main']}></div>
			<div className={styles['nav-avatar']}>
				<div>{userPage}</div>
				<div>
					<Language />
				</div>
				<div>
					<Notice />
				</div>
				<div>
					<Mission />
				</div>
				<div>
					<Search />
				</div>
			</div>
		</div>
	);
}

export default connect(({ user }) => ({ user }))(Navbar);
