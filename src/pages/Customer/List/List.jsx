/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react';
import styles from './customerList.module.css';
import { HcTable } from '@/components/common/Common';
import { Link } from 'react-router-dom';
import { getNameSpaceList } from '@/services/api/user';
import { formatTime } from '@/utils/formatTime';

export default function List() {
	const [list, setList] = useState([]);

	const getList = () =>
		getNameSpaceList()
			.then((result) => {
				console.log(result);
				let res = result.data.data;
				res.nsList.forEach((v) => {
					let ns = v.metadata.name;
					v.metadata.creationTimestamp = formatTime(
						v.metadata.creationTimestamp
					);
					v.deployList = [];
					v.nodeList = [];
					res.deployList.forEach((d) => {
						let dns = d.metadata.namespace;
						if (ns === dns) {
							v.deployList.push(d);
						}
					});
					v.metadata.totalDeploymentCount = v.deployList.length;
					res.nodeList.forEach((n) => {
						if (
							n.metadata.labels[
								'namespace.edge.haromyclound.namespaceName'
							]
						) {
							let nns =
								n.metadata.labels[
									'namespace.edge.haromyclound.namespaceName'
								];
							if (ns === nns) {
								v.nodeList.push(n);
							}
						}
					});
					v.metadata.totalNodeCount = v.nodeList.length;
					let onlineCount = 0;
					if (v.metadata.totalNodeCount !== 0) {
						v.nodeList.forEach((n) => {
							if (n.status.conditions[4].status === 'True') {
								onlineCount = onlineCount + 1;
							}
						});
					}
					v.metadata.onlineNodeCount = `${onlineCount}/${v.metadata.totalNodeCount}`;
				});
				console.log(res.nsList);
				setList(res.nsList);
			})
			.catch((err) => {
				console.log(err);
			});

	useEffect(() => {
		getList();
	}, []);

	return (
		<div className={styles['wrap-layout-center']}>
			<HcTable
				columns={columns}
				dataSource={list}
				bordered
				rowKey="id"
			></HcTable>
		</div>
	);
}

const columns = [
	{
		title: '客户名',
		dataIndex: ['metadata', 'name'],
		render: (text) => <Link to={`/detail/${text}`}>{text}</Link>
	},
	{
		title: '部署时间',
		dataIndex: ['metadata', 'creationTimestamp']
	},
	{
		title: '总节点数',
		dataIndex: ['metadata', 'totalNodeCount']
	},
	{
		title: '应用数',
		dataIndex: ['metadata', 'totalDeploymentCount']
	},
	{
		title: '在线节点/总数',
		dataIndex: ['metadata', 'onlineNodeCount']
	}
];
