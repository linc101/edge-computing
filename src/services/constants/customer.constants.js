import { deployment, node, pod } from '../../api.json';

export const deploymentListApi = `${deployment}/list/{namespace}`;

export const deploymentDetailApi = `${deployment}/detail/{namespace}/{name}`;

export const nodeListApi = `${node}/list/{namespace}`;

export const nodeDetailApi = `${node}/detail/{name}`;

export const podListApi = `${pod}/list/{namespace}/{node}`;

export const podDetailApi = `${pod}/{node}/{name}`;
