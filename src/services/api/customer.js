import http from '../http';
import * as Customer from '../constants/customer.constants';

export const getNodeList = async (namespace = '') => {
	const result = await http.get(
		http.restfulAPI(Customer.nodeListApi, { namespace })
	);
	return result;
};

export const getNodeDetail = async (name = '') => {
	const result = await http.get(
		http.restfulAPI(Customer.nodeDetailApi, { name })
	);
	return result;
};

export const getDeploymentList = async (namespace = '') => {
	const result = await http.get(
		http.restfulAPI(Customer.deploymentListApi, { namespace })
	);
	return result;
};

export const getDeploymentDetail = async (namespace = '', name = '') => {
	const result = await http.get(
		http.restfulAPI(Customer.nodeDetailApi, { namespace, name })
	);
	return result;
};

export const getPodList = async (namespace = '', node = '') => {
	const result = await http.get(
		http.restfulAPI(Customer.podListApi, { namespace, node })
	);
	return result;
};

export const getPodDetail = async (node = '', name = '') => {
	const result = await http.get(
		http.restfulAPI(Customer.podDetailApi, { node, name })
	);
	return result;
};
