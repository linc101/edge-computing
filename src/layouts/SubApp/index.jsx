//import React, { useState, useEffect } from 'react';
import React from 'react';
import { AppRouter, AppRoute } from '@ice/stark';
import Loading from '@/pages/Loading/index';
import NotFound from '@/pages/NotFound/NotFound';
import Customer from '@/pages/Customer/Customer';

export default function SubApp() {
	// const [apps, setApps] = useState([]);
	// useEffect(() => {
	// 	const getJSON = () => {
	// 		window
	// 			.fetch('/frontend.modules.json', { proxy: true })
	// 			.then((res) => {
	// 				setApps(res);
	// 			})
	// 			.catch((err) => {
	// 				console.log(err);
	// 			});
	// 	};
	// 	getJSON();
	// }, []);

	// console.log(apps);

	// return (
	// 	<AppRouter LoadingComponent={Loading} NotFoundComponent={NotFound}>
	// 		{apps.map(({ path, title, entry }, index) => (
	// 			<AppRoute
	// 				key={index}
	// 				path={path}
	// 				title={title}
	// 				entry={entry}
	// 				hashType
	// 			/>
	// 		))}
	// 	</AppRouter>
	// );
	return (
		<AppRouter LoadingComponent={Loading} NotFoundComponent={NotFound}>
			<AppRoute
				path="/customer"
				title="客户管理"
				hashType
				component={<Customer />}
			></AppRoute>
		</AppRouter>
	);
}
