import React from 'react';
import Layout from '../layouts/Layout';
import './App.css';
import { connect } from 'react-redux';
import { storeUser } from '@/redux/user/user';
import { getStorage } from '@/utils/storage';

function App(props) {
	const user = getStorage('user');
	if (user) {
		props.saveUser({ user });
	}
	return <Layout />;
}

const mapDispatchToProps = (dispatch) => {
	return {
		saveUser: (user) => dispatch(storeUser(user))
	};
};

export default connect(null, mapDispatchToProps)(App);
