import React, { useState } from 'react';
import { Menu, Dropdown } from 'antd';
import styles from './mission.module.css';
import { IconFont } from '@/layouts/Layout';

const menu = (
	<Menu>
		<Menu.Item key="1">通知1</Menu.Item>
		<Menu.Item key="2">通知2</Menu.Item>
		<Menu.Item key="3">通知3</Menu.Item>
		<Menu.Item key="4">通知4</Menu.Item>
		<Menu.Item key="5">通知5</Menu.Item>
	</Menu>
);

export default function Mission() {
	const [count, setCount] = useState(5);
	return (
		<div>
			<Dropdown
				overlay={menu}
				overlayClassName={styles['mission-dropdown']}
			>
				<IconFont
					type="iconshixiangdengji"
					className={styles['mission-img']}
				/>
			</Dropdown>
			<span className={styles['mission-notice']}>.</span>
			<span className={styles['mission-count']}>{count}</span>
		</div>
	);
}
