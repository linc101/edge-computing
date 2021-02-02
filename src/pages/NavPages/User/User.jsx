import React from 'react';
import { Menu, Dropdown } from 'antd';
import styles from './user.module.css';
import headUrl from '../../../assets/images/head.png';
import { removeStorage } from '@/utils/storage';

const menu = (
	<Menu onClick={handleClick}>
		<Menu.Item key="1">系统设置</Menu.Item>
		<Menu.Item key="2">用户信息</Menu.Item>
		<Menu.Item key="3">用户登出</Menu.Item>
	</Menu>
);

function handleClick({ key }) {
	if (key === '3') {
		removeStorage('token');
		window.location.reload();
	}
}

export default function User() {
	return (
		<Dropdown overlay={menu} overlayClassName={styles['user-dropdown']}>
			<img src={headUrl} alt="" className={styles['user-img']} />
		</Dropdown>
	);
}
