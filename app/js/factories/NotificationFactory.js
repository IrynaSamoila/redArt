'use strict';

import _ from 'lodash';

import PNotify from '../pnotify';
import module from '../app';


module.factory('NotificationFactory', [() => {
	function defaultCloseHandler(notice) {
		notice.remove();
	}

	function showMessage({title = '', text = '', hide = false, closeHandler = null} = {}) {
		return new PNotify({
			title: title,
			text: text,
			icon: 'glyphicon glyphicon-info-sign',
			hide: hide,
			confirm: {
				confirm: true,
				buttons: [{
					text: 'Ok',
					addClass: 'btn-primary',
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

	return {
		showMessage: showMessage
	};
}]);
