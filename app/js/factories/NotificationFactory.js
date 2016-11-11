'use strict';

import _ from 'lodash';

import PNotify from '../pnotify';
import module from '../app';


module.factory('NotificationFactory', [() => {
	function defaultCloseHandler(notice) {
		notice.remove();
	}

	function showMessage({title = '', text = '', hide = false, closeHandler = null, buttonCssClass = 'btn-primary', type = null} = {}) {
		return new PNotify({
			title: title,
			text: text,
			icon: 'glyphicon glyphicon-info-sign',
			hide: hide,
			type: type,
			confirm: {
				confirm: true,
				buttons: [{
					text: 'Ok',
					addClass: buttonCssClass,
					click: _.isFunction(closeHandler) ? closeHandler : defaultCloseHandler
				},
				null]
			},
			buttons: {
				closer: false,
				sticker: false
			},
			history: {
				history: false
			}
		});
	}

	function showError(options = {}) {
		options.type = 'error';
		options.buttonCssClass = 'btn-danger';

		return showMessage(options);
	}

	return {
		showMessage: showMessage,
		showError: showError
	};
}]);
