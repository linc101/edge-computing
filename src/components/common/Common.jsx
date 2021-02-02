import React from 'react';
import { Table, Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import styles from './common.module.css';

function HcTable(props) {
	return (
		<Table
			columns={props.columns}
			dataSource={props.dataSource}
			bordered
			pagination={{ defaultCurrent: 1, defaultPageSize: 5 }}
		></Table>
	);
}
function ReturnButton(props) {
	let text = '返回';
	if (props.text) {
		text = props.text;
	}
	return (
		<Button
			icon={<ArrowLeftOutlined />}
			className={styles['returnButton']}
			onClick={() => props.handleBack()}
		>
			{text}
		</Button>
	);
}
export { HcTable, ReturnButton };
