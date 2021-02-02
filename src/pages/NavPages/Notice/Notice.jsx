import React, { useState } from 'react';
import { Menu, Dropdown } from 'antd';
import styles from './notice.module.css';
import { createFromIconfontCN } from '@ant-design/icons';

let IconFont = createFromIconfontCN({
	scriptUrl: '//at.alicdn.com/t/font_2313794_5vxy01hwusl.js'
});

const menu = (
	<Menu>
		<Menu.Item key="1">通知1</Menu.Item>
		<Menu.Item key="2">通知2</Menu.Item>
		<Menu.Item key="3">通知3</Menu.Item>
		<Menu.Item key="4">通知4</Menu.Item>
		<Menu.Item key="5">通知5</Menu.Item>
	</Menu>
);

export default function Notice() {
	const [count, setCount] = useState(5);
	return (
		<div>
			<Dropdown
				overlay={menu}
				overlayClassName={styles['notice-dropdown']}
			>
				<IconFont
					type="icontongzhi_mian"
					className={styles['notice-img']}
				/>
			</Dropdown>
			<span className={styles['notice-notice']}>.</span>
			<span className={styles['notice-count']}>{count}</span>
		</div>
	);
}
