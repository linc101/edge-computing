import React from 'react';
import { Modal, Button, Dropdown, Menu, Tooltip } from 'antd';
import 'antd/dist/antd.css';
import { HcTable, ReturnButton } from '@/components/common/Common';
import styles from './detail.module.css';
import DetailModal from './DetailModal';
import { withRouter } from 'react-router-dom';
import { getNameSpaceDetail } from '@/services/api/user';
import { getNodeList, getDeploymentList } from '@/services/api/customer';

class Detail extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isModalVisible: false,
			nodeName: '',
			namespace: props.match.params.namespace,
			nodeList: [],
			deploymentList: [],
			namespaceInfo: {
				metadata: {
					annotations: {
						chineseName: ''
					},
					name: ''
				}
			},
			deploymentLoading: false,
			nodeLoading: false,
			namespaceLoading: false
		};
	}

	componentDidMount() {
		getNameSpaceDetail(this.state.namespace)
			.then((result) => {
				console.log(result);
				this.setState({
					namespaceInfo: result.data.data.namespaceDetail
				});
				console.log(this.state.namespaceInfo);
			})
			.catch((err) => {
				console.log(err);
			});

		getNodeList(this.state.namespace)
			.then((result) => {
				console.log(result);
				let res = result.data.data.node.items;
				res.forEach((v) => {
					v.labelList = [];
					let labels = v.metadata.labels;
					for (let k in labels) {
						v.labelList.push(`${k}=${labels[k]}`);
					}
					v.metadata.label = v.labelList.join(', ');
					v.statusList = [];
					v.status.conditions.forEach((c) => {
						if (c.status === 'True') {
							v.statusList.push(c.type);
						}
					});
					v.metadata.status = v.statusList.join(',');
				});
				this.setState({
					nodeList: res
				});
			})
			.catch((err) => {
				console.log(err);
			});

		getDeploymentList(this.state.namespace)
			.then((result) => {
				console.log(result);
				let res = result.data.data.deploymentList;
				res.forEach((v) => {
					v.data = {};
					let rrp = v.status.readyReplicas;
					let rp = v.status.replicas;
					v.data.replicas = `${rrp}/${rp}`;
					if (rp <= 0) {
						v.data.status = '已停止';
					} else if (rrp < rp) {
						v.data.status = '启动中';
					} else {
						v.data.status = '运行中';
					}
				});
				console.log(res);
				this.setState({
					deploymentList: res
				});
				this.setState({
					deploymentLoading: true
				});
			})
			.catch((err) => {
				console.log(err);
			});
	}

	showModal(text) {
		this.setState({ nodeName: text });
		this.setState({ isModalVisible: true });
	}

	handleCancel() {
		this.setState({ isModalVisible: false });
	}

	handleBack() {
		this.props.history.push('/list');
	}

	render() {
		const nodeColumns = [
			{
				title: '节点名称',
				dataIndex: ['metadata', 'name'],
				// eslint-disable-next-line react/display-name
				render: (text) => (
					<span
						className="fake-link"
						onClick={() => this.showModal(text)}
					>
						{text}
					</span>
				)
			},
			{
				title: '节点类型',
				dataIndex: 'type'
			},
			{
				title: '节点IP',
				dataIndex: ['status', 'addresses', 0, 'address']
			},
			{
				title: '节点标签',
				dataIndex: ['metadata', 'label'],
				onCell: () => ({
					style: {
						maxWidth: 150,
						overflow: 'hidden',
						whiteSpace: 'nowrap',
						textOverflow: 'ellipsis',
						cursor: 'pointer'
					}
				}),
				render: (text) => (
					<Tooltip placement="topLeft" title={text}>
						{text}
					</Tooltip>
				)
			},
			{
				title: '节点状态',
				dataIndex: ['metadata', 'status']
			}
		];
		const appColumns = [
			{
				title: '应用名称',
				dataIndex: ['metadata', 'name']
			},
			{
				title: '镜像版本',
				dataIndex: [
					'spec',
					'template',
					'spec',
					'containers',
					0,
					'image'
				]
			},
			{
				title: '状态',
				dataIndex: ['data', 'status']
			},
			{
				title: '操作',
				render: () => operationDrop
			}
		];
		const menu = (
			<Menu>
				<Menu.Item>
					<span>启动</span>
				</Menu.Item>
				<Menu.Item>
					<span>停止</span>
				</Menu.Item>
				<Menu.Item>
					<span>删除</span>
				</Menu.Item>
				<Menu.Item>
					<span>升级</span>
				</Menu.Item>
			</Menu>
		);

		const operationDrop = (
			<Dropdown
				overlay={menu}
				placement="bottomCenter"
				trigger={['click']}
			>
				<Button>操作</Button>
			</Dropdown>
		);

		return (
			<div className={styles['wrap-layout-center']}>
				<ReturnButton handleBack={() => this.handleBack()} />
				<div className={styles['detail-info']}>
					<div className={styles['detail-info-header']}>
						<p className={styles['detail-info-title']}>用户信息</p>
					</div>
					<div className="common-two-line-layout">
						<div className="common-column-layout">
							<div className="info-form-layout">
								<div className="info-form-title">
									用户namespace
								</div>
								<div className="info-form-content">
									{this.state.namespaceInfo.metadata.name}
								</div>
							</div>
						</div>
						<div className="common-column-layout">
							<div className="info-form-layout">
								<div className="info-form-title">中文名</div>
								<div className="info-form-content">
									{
										this.state.namespaceInfo.metadata
											.annotations.chineseName
									}
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className={styles['detail-card']}>
					<div className={styles['detail-info-header']}>
						<p className={styles['detail-info-title']}>节点列表</p>
					</div>
					<HcTable
						columns={nodeColumns}
						dataSource={this.state.nodeList}
						bordered
						loading={this.state.nodeLoading}
					></HcTable>
				</div>
				<div className={styles['detail-card']}>
					<div className={styles['detail-info-header']}>
						<p className={styles['detail-info-title']}>应用列表</p>
					</div>
					<HcTable
						columns={appColumns}
						dataSource={this.state.deploymentList}
						bordered
						loading={this.state.deploymentLoading}
					></HcTable>
				</div>
				<Modal
					visible={this.state.isModalVisible}
					title="节点详情"
					footer={null}
					onCancel={() => this.handleCancel()}
					destroyOnClose
					width="70%"
				>
					<DetailModal
						namespace={this.state.namespace}
						name={this.state.nodeName}
					/>
				</Modal>
			</div>
		);
	}
}

export default withRouter(Detail);
