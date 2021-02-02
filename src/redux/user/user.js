import { getUserInfo } from '@/services/api/user';

export const STORE_USER = 'STORE_USER';

export const storeUser = (user) => ({
	user,
	type: STORE_USER
});

export function getUser() {
	return async (dispatch) => {
		const result = await getUserInfo();
		const res = result.data;
		console.log(res);
		if (res.success) {
			dispatch(storeUser(res.user));
		}
	};
}
