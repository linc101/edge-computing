import React, { useEffect, useState } from 'react';
import { Button, Tag } from 'antd';
import styles from './detail.module.css';
import { HcTable } from '@/components/common/Common';
import { getNodeDetail, getPodList } from '@/services/api/customer';
import * as echarts from 'echarts';
export default function DetailModal(props) {
	const [podList, setPodList] = useState([]);

	const columns = [
		{
			title: '应用实例名称',
			dataIndex: ['metadata', 'name']
		},
		{
			title: '应用实例状态',
			dataIndex: ['status', 'phase'],
			// eslint-disable-next-line react/display-name
			render: (text) => {
				let color = '';
				switch (text) {
					case 'Pending':
						color = '#ffaa3a';
						break;
					case 'Running':
						color = '#49a9e1';
						break;
					case 'Succeeded':
						color = '#68b642';
						break;
					case 'Failed':
						color = '#ef595c';
						break;
					case 'Unknown':
						color = '';
						break;
					default:
						break;
				}
				return <Tag color={color}>{text}</Tag>;
			}
		}
	];

	useEffect(() => {
		getNodeDetail(props.name)
			.then((result) => {
				console.log(result);
				let node = result.data.data.node.items[0];
				let cpu = {};
				let memory = {};
				let storage = {};
				cpu.total = parseInt(node.status.capacity.cpu);
				cpu.allocatable = parseInt(node.status.allocatable.cpu);
				cpu.used = cpu.total - cpu.allocatable;
				memory.total = parseInt(
					node.status.capacity.memory.slice(0, -2)
				);
				memory.allocatable = parseInt(
					node.status.allocatable.memory.slice(0, -2)
				);
				memory.used = memory.total - memory.allocatable;
				let min =
					memory.allocatable > memory.used
						? memory.used
						: memory.allocatable;
				let count = 0;
				console.log(min);
				while (min > 1024) {
					min = min / 1024;
					memory.total = parseInt(memory.total / 1024);
					memory.allocatable = parseInt(memory.allocatable / 1024);
					memory.used = parseInt(memory.used / 1024);
					console.log(memory);
					console.log(min);
					count = count + 1;
				}
				switch (count) {
					case 0:
						memory.unit = 'KB';
						break;
					case 1:
						memory.unit = 'MB';
						break;
					case 2:
						memory.unit = 'GB';
						break;
					case 3:
						memory.unit = 'TB';
						break;
					default:
						break;
				}
				memory.formatter = `{a} <br/>{b} : {c}${memory.unit} ({d}%)`;
				storage.total = parseInt(
					node.status.capacity['ephemeral-storage'].slice(0, -2)
				);
				storage.unit = node.status.capacity['ephemeral-storage'].slice(
					-2
				);
				storage.allocatable = parseInt(
					node.status.allocatable['ephemeral-storage']
				);
				if (storage.unit === 'Ki') {
					storage.allocatable = parseInt(storage.allocatable / 1024);
					storage.unit = 'KB';
				} else if (storage.unit === 'Mi') {
					storage.allocatable = parseInt(
						storage.allocatable / 1024 / 1024
					);
					storage.unit = 'MB';
				} else if (storage.unit === 'Gi') {
					storage.allocatable = parseInt(
						storage.allocatable / 1024 / 1024 / 1024
					);
					storage.unit = 'GB';
				}
				storage.used = storage.total - storage.allocatable;
				storage.formatter = `{a} <br/>{b} : {c}${storage.unit} ({d}%)`;
				console.log(cpu);
				console.log(memory);
				console.log(storage);
				let cpuCharts = echarts.init(
					document.getElementById('cpuCharts')
				);
				let memoryCharts = echarts.init(
					document.getElementById('memoryCharts')
				);
				let storageCharts = echarts.init(
					document.getElementById('storageCharts')
				);
				cpuCharts.setOption({
					tooltip: {
						trigger: 'item',
						formatter: '{a} <br/>{b} : {c} ({d}%)'
					},
					title: {
						text: 'CPU 图表',
						left: 'center',
						top: 'bottom',
						textStyle: {
							color: '#aaa'
						}
					},
					series: [
						{
							name: '资源占比',
							type: 'pie',
							radius: '55%',
							center: ['50%', '40%'],
							data: [
								{
									value: cpu.used,
									name: '已使用'
								},
								{
									value: cpu.allocatable,
									name: '未使用'
								}
							],
							emphasis: {
								itemStyle: {
									shadowBlur: 10,
									shadowOffsetX: 0,
									shadowColor: 'rgba(0, 0, 0, 0.5)'
								}
							}
						}
					]
				});
				memoryCharts.setOption({
					tooltip: {
						trigger: 'item',
						formatter: memory.formatter
					},
					title: {
						text: '内存图表',
						left: 'center',
						top: 'bottom',
						textStyle: {
							color: '#aaa'
						}
					},
					series: [
						{
							name: '资源占比',
							type: 'pie',
							radius: '55%',
							center: ['50%', '40%'],
							data: [
								{
									value: memory.used,
									name: '已使用'
								},
								{
									value: memory.allocatable,
									name: '未使用'
								}
							],
							emphasis: {
								itemStyle: {
									shadowBlur: 10,
									shadowOffsetX: 0,
									shadowColor: 'rgba(0, 0, 0, 0.5)'
								}
							}
						}
					]
				});
				storageCharts.setOption({
					tooltip: {
						trigger: 'item',
						formatter: storage.formatter
					},
					title: {
						text: '磁盘图表',
						left: 'center',
						top: 'bottom',
						textStyle: {
							color: '#aaa'
						}
					},
					series: [
						{
							name: '资源占比',
							type: 'pie',
							radius: '55%',
							center: ['50%', '40%'],
							data: [
								{
									value: storage.used,
									name: '已使用'
								},
								{
									value: storage.allocatable,
									name: '未使用'
								}
							],
							emphasis: {
								itemStyle: {
									shadowBlur: 10,
									shadowOffsetX: 0,
									shadowColor: 'rgba(0, 0, 0, 0.5)'
								}
							}
						}
					]
				});
			})
			.catch((err) => {
				console.log(err);
			});
		getPodList(props.namespace, props.name)
			.then((result) => {
				console.log(result);
				setPodList(result.data.data.podList);
			})
			.catch((err) => {
				console.log(err);
			});
		//eslint-disable-next-line
	}, [props.name]);
	return (
		<div className={styles['wrap-layout-center']}>
			<div className={styles['detail-card']}>
				<div className={styles['detail-info-header']}>
					<p className={styles['detail-info-title']}>节点信息</p>
				</div>
				<div className="common-two-line-layout">
					<div className="common-column-layout">
						<div className="info-form-layout">
							<div className="info-form-title">节点名称</div>
							<div className="info-form-content">
								{props.name}
							</div>
						</div>
					</div>
					<div className="common-column-layout">
						<Button>控制台</Button>
					</div>
				</div>
			</div>
			<div className={styles['detail-card']}>
				<div className={styles['detail-info-header']}>
					<p className={styles['detail-info-title']}>节点资源图表</p>
				</div>
				<div className={styles['detail-charts-card']}>
					<div id="cpuCharts"></div>
					<div id="memoryCharts"></div>
					<div id="storageCharts"></div>
				</div>
			</div>
			<div className={styles['detail-card']}>
				<div className={styles['detail-info-header']}>
					<p className={styles['detail-info-title']}>应用实例状态</p>
				</div>
				<HcTable columns={columns} dataSource={podList}></HcTable>
			</div>
		</div>
	);
}
