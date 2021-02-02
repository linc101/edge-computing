import React, { useEffect, useState } from 'react';
import { Menu } from 'antd';
import 'antd/dist/antd.css';
import { appHistory, AppLink } from '@ice/stark';
import 'rc-menu/assets/index.css';
import './menu.css';
import styles from './menu.module.css';
import openImg from '../../assets/images/open.png';
import closeImg from '../../assets/images/close.png';
import { IconFont } from '@/layouts/Layout';

function HcMenu() {
	const { menu: menuList } = menu;
	const { SubMenu } = Menu;
	//submenu选中项
	const [activeMenu, setActiveMenu] = useState([]);
	//菜单选中项
	const [activeKeys, setActiveKeys] = useState([]);
	//菜单展开
	const [collapsed, setCollapsed] = useState(false);
	let imgJSX;
	let containerClass;

	useEffect(() => {
		console.log(menuList);
		if (!menuList || menuList.length === 0) return;
		// @TODO 微前端下刷新时路由会重置为/
		function getRoute() {
			const { href, host, protocol, hash } = window.location;
			const match = `${protocol}//${host}` + (hash ? '/#/' : '');
			console.log(href);
			console.log(match);
			return href.replace(match, '');
		}
		const currentRoutes = getRoute();
		console.log(currentRoutes);
		if (currentRoutes === '/') {
			appHistory.push(`/#/${menuList[0].url}`);
			console.log([menuList[0].id + '']);
			setActiveKeys([menuList[0].id + '']);
			console.log(activeKeys);
			return;
		}
		function getKey() {
			const routes = currentRoutes.split('/');
			console.log(routes);
			const menu = menuList.find(
				(item) => item.url === routes[0] || item.module === routes[0]
			);
			console.log(menu);
			setActiveMenu([menu.id + '']);
			console.log(activeMenu);
			if (menu.subMenu) {
				const subMenu =
					menu.subMenu.find(
						(item) =>
							item.url === routes[1] || item.module === routes[1]
					) || menu.subMenu[0];
				setActiveKeys([subMenu.id + '']);
			}
		}
		getKey();
	}, [menuList]);

	if (collapsed) {
		imgJSX = (
			<img
				src={openImg}
				alt=""
				className={styles['menu-collapsed']}
				onClick={() => {
					setCollapsed(!collapsed);
				}}
			/>
		);
		containerClass = styles['menu-container-collapsed'];
	} else {
		imgJSX = (
			<img
				src={closeImg}
				alt=""
				className={styles['menu-un-collapsed']}
				onClick={() => {
					setCollapsed(!collapsed);
				}}
			/>
		);
		containerClass = styles['menu-container'];
	}

	return (
		<div className={styles['menu-layouts']}>
			<Menu
				className={containerClass}
				mode={'inline'}
				selectedKeys={activeKeys}
				defaultOpenKeys={activeMenu}
				inlineCollapsed={collapsed}
				theme="dark"
				onClick={(key) => {
					console.log(key);
					if (key.keyPath.length === 1) {
						setActiveMenu([]);
					}
					setActiveKeys(key.keyPath);
				}}
				onOpenChange={(openKeys) => {
					console.log(openKeys);
					console.log(activeMenu);
					const newActiveMenu = openKeys.find((key) => {
						return activeMenu.indexOf(key) === -1;
					});
					console.log(newActiveMenu);
					setActiveMenu(newActiveMenu ? [newActiveMenu + ''] : []);
					const menu = menuList.find((value) => {
						return value.id === parseInt(newActiveMenu);
					});
					if (menu) {
						setActiveKeys([menu.subMenu[0].id + '']);
						const to = `#/${menu.url || menu.module}/${
							menu.subMenu[0].url
						}`;
						appHistory.push(to);
					}
				}}
				onSelect={(selectedKeys) => {
					console.log(selectedKeys);
				}}
			>
				{menuList.map(
					({ iconName, subMenu, id, name, url, module }) => {
						return subMenu ? (
							<SubMenu
								className={`${styles['menu']} ${styles['menu-sub']}`}
								key={id}
								title={name}
								icon={
									<IconFont
										type={iconName}
										className={styles['menu-icon']}
									/>
								}
							>
								{subMenu.map((sub) => (
									<Menu.Item
										className={styles['menu-content']}
										key={sub.id}
									>
										<AppLink
											className={styles['menu-link']}
											to={`/${url || module}/${sub.url}`}
											hashType
										>
											{sub.name}
										</AppLink>
									</Menu.Item>
								))}
							</SubMenu>
						) : (
							<Menu.Item
								className={styles['menu']}
								key={id}
								icon={
									<IconFont
										type={iconName}
										className={styles['menu-icon']}
									/>
								}
							>
								<AppLink
									className={styles['menu-link']}
									to={`/${url || module}`}
									hashType
								>
									{name}
								</AppLink>
							</Menu.Item>
						);
					}
				)}
			</Menu>
			{imgJSX}
		</div>
	);
}

export default HcMenu;

const menu = {
	menu: [
		{
			iconName: 'iconkehu',
			id: 1,
			isparent: true,
			module: 'dashboard',
			name: '客户管理',
			nameEn: 'Customer',
			subMenu: null,
			url: 'customer/list',
			weight: 1
		},
		{
			iconName: 'iconkehu',
			id: 2,
			isparent: false,
			module: 'dashboard',
			name: '菜单',
			nameEn: 'Menu',
			subMenu: [
				{
					id: 21,
					isparent: false,
					module: 'dashboard',
					url: 'list1',
					name: '子项1',
					nameEn: 'item1'
				},
				{
					id: 22,
					isparent: false,
					module: 'dashboard',
					name: '子项1',
					nameEn: 'item1'
				}
			],
			url: 'customer',
			weight: 1
		}
	]
};
