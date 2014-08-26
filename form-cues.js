'use strict';

(function () {

// Create a safe reference to the FormCues object for use below.
    var fc = function (obj) {
        if (obj instanceof fc) return obj;
        if (!(this instanceof fc)) return new fc(obj);
    };

    fc.addAlert = function (alertId, message, options) {
        options = options || {};
        var level = options.level || 'info';
        var isDismissable = options.isDismissable || options.dismissable || false;
        var doMultiple = options.doMultiple || options.multiple || false;
        var alertElement = $('#' + alertId);
        var dismissHtml = (isDismissable ? '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' : '');
        var alertHtml = '<div class="alert alert-' + level + '">' + dismissHtml + message + '</div>';
        var alert = (doMultiple ? alertElement.append(alertHtml) : alertElement.html(alertHtml));
        alert.alert();
    };

    fc.setSubmitState = function (buttonId, iconId, options) {
        options = options || {};
        var isEnabled = options.isEnabled || options.enabled || false;
        var doSpin = options.doSpin || options.spin || false;
        var defaultIcon = options.defaultIcon || options.icon || 'check';
        var spinnerIcon = options.spinnerIcon || 'spinner';
        var sendButton = $('#' + buttonId);
        var sendIcon = $('#' + iconId);
        sendButton.prop('disabled', !isEnabled);
        if (!!doSpin) {
            sendIcon.removeClass('fa-' + defaultIcon);
            sendIcon.addClass('fa-' + spinnerIcon);
            sendIcon.addClass('fa-spin');
        } else {
            sendIcon.removeClass('fa-' + spinnerIcon);
            sendIcon.removeClass('fa-spin');
            sendIcon.addClass('fa-' + defaultIcon);
        }
    };


}.call(this));
