import http from '../http';
import * as User from '../constants/user.constants';

export const signIn = async (data = { user_name: '', password: '' }) => {
	console.log(data);
	const result = await http.post(User.userLoginApi, data);
	return result;
};

export const getUserInfo = async () => {
	const result = await http.get(User.userInfoApi);
	return result;
};

export const getNameSpaceList = async () => {
	const result = await http.get(User.namespaceListApi);
	return result;
};

export const getNameSpaceDetail = async (namespace = '') => {
	const result = await http.get(
		http.restfulAPI(User.namespaceDetailApi, { namespace })
	);
	return result;
};
