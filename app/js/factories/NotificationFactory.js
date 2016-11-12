'use strict';

import _ from 'lodash';

import PNotify from '../pnotify';
import module from '../app';
import {errorMessages} from '../globals.js';


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

	function showConfirm({title = 'Подтверждение', text = 'Вы уверены?', confirmation = null, cancellation = null}) {
		return new PNotify({
			title: title,
			text: text,
			icon: 'glyphicon glyphicon-question-sign',
			hide: false,
			confirm: {
				confirm: true,
				buttons: [{
					text: 'Да',
					addClass: 'btn-success',
					click: function(notice, value) {
						defaultCloseHandler(notice);
						notice.get()
							.trigger('pnotify.confirm', [notice, value]);
					}
				}, {
					text: 'Отмена',
					addClass: 'btn-primary',
					click: function(notice) {
						defaultCloseHandler(notice);
						notice.get()
							.trigger('pnotify.cancel', notice);
					}
				},
					null]
			},
			buttons: {
				closer: false,
				sticker: false
			},
			history: {
				history: false
			},
			addclass: 'stack-modal',
			stack: {'dir1': 'down', 'dir2': 'right', 'modal': true}
		}).get()
			.on('pnotify.confirm', confirmation)
			.on('pnotify.cancel', cancellation);
	}

	function showError(options = {}) {
		options.type = 'error';
		options.buttonCssClass = 'btn-danger';

		return showMessage(options);
	}

	function showDataError(error, errorText = errorMessages.DATA_RESPONSE, title = 'Ошибка') {
		let errorMessage = _.get(error, 'data.error', errorText);

		showError({title, text: errorMessage});
	}

	return {
		showMessage: showMessage,
		showConfirm: showConfirm,
		showError: showError,
		showDataError: showDataError
	};
}]);
