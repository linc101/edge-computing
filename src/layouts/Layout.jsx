import React from 'react';
import styles from './layout.module.css';
import { AppRouter, AppRoute, appHistory } from '@ice/stark';
import { getStorage } from '@/utils/storage';
import Navbar from './Navbar/Navbar';
import Login from '@/pages/Login/Login';
import Menu from './Menu/Menu';
import SubApp from './SubApp/index';
import { createFromIconfontCN } from '@ant-design/icons';

export let IconFont = createFromIconfontCN({
	scriptUrl: '//at.alicdn.com/t/font_2313794_608xzaybxou.js'
});

function Layout() {
	const redirectToLogin = () => (
		<div className={styles['fullscreen-layout']}>
			<AppRouter>
				<AppRoute path="/" title="Login" component={<Login />} />
			</AppRouter>
		</div>
	);

	console.log(getStorage('token'));
	if (!getStorage('token')) {
		return redirectToLogin();
	} else {
		appHistory.push('/');
	}

	return (
		<div>
			<Navbar />
			<div className={styles['flex-layout']}>
				<Menu />
				<main className={styles['flex-right']}>
					<SubApp />
				</main>
			</div>
		</div>
	);
}

export default Layout;
