import React from 'react';
import limitResourcePng from '@/assets/images/404.png';

export default function NotFound() {
	return (
		<div
			style={{
				textAlign: 'center'
			}}
		>
			<img src={limitResourcePng} alt="资源受限制，无法访问" />
		</div>
	);
}
