import {trailingSlashIt} from "./common";

export const send = ( route, data, simple = false ) => {
	return requestData( route, simple, data );
};

export const get = ( route, simple = false, useNonce = true ) => {
	return requestData( route, simple, {}, 'GET', useNonce );
};

const requestData = async (
	route,
	simple = false,
	data = {},
	method = 'POST',
	useNonce = true
) => {
	// 检查是否为外部请求
	const isExternal = typeof route === 'string' ?
		!route.startsWith(window.location.origin) :
		!route.href.startsWith(window.location.origin);

	const options = {
		method,
		headers: {
			Accept: 'application/json',
		},
	};

	// 只对内部请求或 POST 请求添加 Content-Type（避免触发 CORS 预检）
	if (!isExternal || method === 'POST') {
		options.headers['Content-Type'] = 'application/json';
	}

	if ( tiobDash.params.site_url && !isExternal ) {
		const url = new URL( route );
		url.searchParams.append( 'site_url', encodeURIComponent( tiobDash.params.site_url ) );
		route = url;
	}

	// 只对内部请求添加 nonce（避免触发 CORS 预检）
	if ( useNonce && !isExternal ) {
		options.headers[ 'x-wp-nonce' ] = tiobDash.nonce;
	}

	if ( 'POST' === method ) {
		options.body = JSON.stringify( data );
	}

	return await fetch( route, options ).then( ( response ) => {
		return simple ? response : response.json();
	} );
};

export const ajaxAction = async (route, action = '', useNonce = '', data = {} ) => {
	const formData = new FormData();
	formData.append('nonce', useNonce);
	formData.append('action', action);
	if ( Object.keys( data ).length > 0 ) {
		for ( const [key, value] of Object.entries( data ) ) {
			formData.append( key, value );
		}
	}
	const options = {
		method: 'POST',
		headers: {
			Accept: 'application/json',
		},
		body: formData,
	};

	return await fetch(route, options).then(() => {
		return true;
	});
};
