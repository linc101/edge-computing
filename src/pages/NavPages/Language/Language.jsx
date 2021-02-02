import React from 'react';
import { Menu, Dropdown } from 'antd';
import styles from './language.module.css';
import { IconFont } from '@/layouts/Layout';

const menu = (
	<Menu>
		<Menu.Item key="1">中文</Menu.Item>
		<Menu.Item key="2">English</Menu.Item>
	</Menu>
);

export default function Language() {
	return (
		<Dropdown overlay={menu} overlayClassName={styles['language-dropdown']}>
			<IconFont
				type="iconyuyanzhongwen"
				className={styles['language-img']}
			/>
		</Dropdown>
	);
}
