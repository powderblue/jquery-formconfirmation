/*globals jQuery, window*/
/**
 * @author Dan Bettles <dan@powder-blue.com>
 * @copyright Powder Blue Ltd 2014
 */

(function () {

    /**
     * Returns the label-text associated with the specified input.
     * 
     * @param {jQuery} oInputEl
     * @returns {String|undefined}
     */
    function inputGetLabelText(oInputEl) {
        var oLabelEl;

        oLabelEl = oInputEl.closest('form').find('label[for="' + oInputEl.attr('id') + '"]').first();

        if (oLabelEl.size() > 0) {
            return oLabelEl.text();
        }

        oLabelEl = oInputEl.closest('label');

        if (oLabelEl.size() > 0) {
            return oLabelEl.children('span').text();
        }

        return undefined;
    }

    jQuery.fn.extend({

        /**
         * Returns an object containing values of inputs listed against their labels.
         * 
         * @return Object
         * @throws "The called jQuery is not a form"
         */
        formConfirmation: function () {
            var oFirstEl = this.first(),
                oLabelledValues = {};

            if (!oFirstEl.is('form')) {
                throw 'The called jQuery is not a form';
            }

            oFirstEl.find(':input').each(function () {
                var oInputEl = jQuery(this),
                    labelText = inputGetLabelText(oInputEl),
                    value = oInputEl.val();

                if (labelText === undefined) {
                    return true;
                }

                if (oInputEl.is('select')) {
                    value = oInputEl.find('option[value="' + value + '"]').text();
                }

                oLabelledValues[labelText] = value;
            });

            return oLabelledValues;
        }
    });
}());