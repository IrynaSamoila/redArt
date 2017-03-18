'use strict';

import module from '../app';
import {errorMessages} from '../globals.js';

module.factory('UploadingFactory', ['NotificationFactory', NotificationFactory => {
	function defaultErrorHandler(e) {
		NotificationFactory.showDataError(e, errorMessages.DATA_CONNECTION);
	}

	function uploadFile(options = {}) {
		const files = options.fileInput.files;

		if (files.length) {
			const fd = new FormData();
			fd.append(options.formField || 'image', files[0]);

			const xhr = new XMLHttpRequest();
			xhr.open(options.method || 'POST', options.url);
			xhr.onload = event => {
				const data = JSON.parse(xhr.responseText);
				if (event.target.status === 200) {
					options.onload && options.onload(data);
				} else {
					options.onerror ? options.onerror(data) : NotificationFactory.showError({text: data.error});
				}
			};
			xhr.onerror = options.onerror ? options.onerror : defaultErrorHandler;

			xhr.send(fd);
		}
	}

	return {
		uploadFile
	};
}]);
