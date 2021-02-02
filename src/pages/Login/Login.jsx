import React, { useState } from 'react';
import { setStorage } from '@/utils/storage';
import styles from './login.module.css';
import userImgUrl from '../../assets/images/user.png';
import passwordImgUrl from '../../assets/images/password.png';
import { signIn } from '@/services/api/user';

export default function LoginFun() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [message, setMessage] = useState('');

	const submit = (e) => {
		e.preventDefault();
		if (!username) {
			setMessage('账号不能为空');
		} else if (!password) {
			setMessage('密码不能为空');
		} else {
			signIn({ user_name: username, password }).then((res) => {
				console.log(res);
				let data = res.data;
				if (res.status === 200) {
					setStorage('token', data.data.token);
					setStorage('user', username);
					window.location.reload();
				} else {
					setMessage(data.message);
				}
			});
		}
	};

	const handleKeyDown = (e) => {
		if (e.keyCode === 13) {
			submit(e);
		}
	};

	return (
		<div className={styles['login']} onKeyDown={(e) => handleKeyDown(e)}>
			<form className={styles['login-form']}>
				<div className={styles['login-input-item']}>
					<img
						src={userImgUrl}
						alt=""
						className={styles['login-img']}
					/>
					<input
						type="text"
						className={styles['login-input']}
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						placeholder="请输入用户名称"
					/>
				</div>
				<div className={styles['login-input-item']}>
					<img
						src={passwordImgUrl}
						alt=""
						className={styles['login-img']}
					/>
					<input
						type="password"
						className={styles['login-input']}
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="请输入密码"
					/>
				</div>
				<p className={styles['login-message']}>{message}</p>
				<div className={styles['login-submit']}>
					<button
						type="button"
						className={styles['login-button']}
						onClick={(e) => submit(e)}
					>
						登 录
					</button>
				</div>
			</form>
		</div>
	);
}
