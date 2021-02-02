import React from 'react';
import { HashRouter as Router, Redirect, Route } from 'react-router-dom';
import List from './List/List';
import Detail from './Detail/Detail';
import styles from './customer.module.css';
import { getBasename } from '@ice/stark-app';
export default function Customer() {
	return (
		<div className={styles['customer-container']}>
			<Router basename={getBasename()}>
				<Redirect from="/" to="/list"></Redirect>
				<Route path="/list" component={List}></Route>
				<Route path="/detail/:namespace" component={Detail}></Route>
			</Router>
		</div>
	);
}
