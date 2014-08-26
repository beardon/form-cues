'use strict';

(function () {

    // Establish the root object, `window` in the browser, or `exports` on the server.
    var root = this;

    // Create a safe reference to the FormCues object for use below.
    var cues = function (obj) {
        if (obj instanceof cues) return obj;
        if (!(this instanceof cues)) return new cues(obj);
    };

    // Export the FormCues object for **Node.js**, with
    // backwards-compatibility for the old `require()` API. If we're in
    // the browser, add `cues` as a global object.
    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = cues;
        }
        exports.cues = cues;
    } else {
        root.cues = cues;
    }

    cues.addAlert = function (alertId, message, options) {
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

    cues.setSubmitState = function (buttonId, iconId, options) {
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
