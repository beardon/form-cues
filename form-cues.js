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

    /**
     * Adds a Bootstrap alert to a page, assumes a div element with an id of [alert]
     * @param alertElement {Object|String}
     * @param message
     * @param options
     */
    cues.addAlert = function (alertElement, message, options) {
        options = options || {};
        var level = options.level || 'info';
        var isDismissable = options.isDismissable || options.dismissable || false;
        var doMultiple = options.doMultiple || options.multiple || false;
        alertElement = ((alertElement instanceof Object) ? alertElement : $('#' + alertElement));
        var dismissHtml = (isDismissable ? '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' : '');
        var alertHtml = '<div class="alert alert-' + level + '">' + dismissHtml + message + '</div>';
        var alert = (doMultiple ? alertElement.append(alertHtml) : alertElement.html(alertHtml));
        alert.alert();
    };

    /**
     * Disables/enables buttons and animates their icons
     * @param submitButton {Object|String}
     * @param submitIcon {Object|String}
     * @param options
     */
    cues.setSubmitState = function (submitButton, submitIcon, options) {
        options = options || {};
        var isEnabled = options.isEnabled || options.enabled || false;
        var doSpin = options.doSpin || options.spin || false;
        var defaultIcon = options.defaultIcon || options.icon || 'check';
        var spinnerIcon = options.spinnerIcon || 'spinner';
        var animation = options.animation || 'spin';
        submitButton = ((submitButton instanceof Object) ? submitButton : $('#' + submitButton));
        submitIcon = ((submitIcon instanceof Object) ? submitIcon : $('#' + submitIcon));
        submitButton.prop('disabled', !isEnabled);
        if (!!doSpin) {
            submitIcon.removeClass('fa-' + defaultIcon);
            submitIcon.addClass('fa-' + spinnerIcon);
            submitIcon.addClass('fa-' + animation);
        } else {
            submitIcon.removeClass('fa-' + spinnerIcon);
            submitIcon.removeClass('fa-' + animation);
            submitIcon.addClass('fa-' + defaultIcon);
        }
    };


}.call(this));
