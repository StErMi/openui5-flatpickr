/*!
 * ${copyright}
 */

sap.ui.define(['jquery.sap.global', 'sap/m/DatePickerRenderer'],
	function(jQuery, DatePickerRenderer) {
	"use strict";

	/**
	 * FlatDatePicker renderer.
	 * @static
	 * @namespace
	 */
	var FlatDatePickerRenderer = DatePickerRenderer.extend("it.designfuture.flatpickr.FlatDatePickerRenderer");
	
	/**
	 * Add the custom class to render the Date Picker, using the provided {@link sap.ui.core.RenderManager}.
	 *
	 * @param {sap.ui.core.RenderManager} oRm The RenderManager that can be used for writing to the render output buffer.
	 * @param {sap.ui.core.Control} oControl An object representation of the control that should be rendered.
	 */
	FlatDatePickerRenderer.addOuterClasses = function(oRm, oControl) {
		oRm.addClass("flatpickrCustomControl");
	};
	
	/**
	 * Overrided to add data-input custom data
	 *
	 * @param {sap.ui.core.RenderManager} oRm The RenderManager that can be used for writing to the render output buffer.
	 * @param {sap.ui.core.Control} oControl An object representation of the control that should be rendered.
	 */
	FlatDatePickerRenderer.writeInnerAttributes = function(oRm, oDP) {
		oRm.write(" data-input ");
	};
	
	/**
	 * Overrided to add data-toggle custom data
	 *
	 * @param {sap.ui.core.RenderManager} oRm the RenderManager that can be used for writing to the render output buffer
	 * @param {sap.m.DatePicker} oDP an object representation of the control that should be rendered
	 */
	FlatDatePickerRenderer.writeInnerContent = function(oRm, oDP) {

		if (oDP.getEnabled() && oDP.getEditable()) {
			var aClasses = ["sapMInputValHelpInner"];
			var mAttributes = {};

			mAttributes["id"] = oDP.getId() + "-icon";
			mAttributes["tabindex"] = "-1"; // to get focus events on it, needed for popup autoclose handling
			oRm.write('<div class="sapMInputValHelp" data-toggle>');
			oRm.writeIcon("sap-icon://appointment-2", aClasses, mAttributes);
			oRm.write("</div>");
		}

		// invisible span with description for keyboard navigation
		var rb = sap.ui.getCore().getLibraryResourceBundle("sap.ui.unified");
			// ResourceBundle always returns the key if the text is not found
		// ResourceBundle always returns the key if the text is not found
		var sText = rb.getText("DATEPICKER_DATE_TYPE");

		var sTooltip = sap.ui.core.ValueStateSupport.enrichTooltip(oDP, oDP.getTooltip_AsString());
		if (sTooltip) {
			// add tooltip to description because it is not read by JAWS from title-attribute if a label is assigned
			sText = sText + ". " + sTooltip;
		}
		oRm.write('<SPAN id="' + oDP.getId() + '-Descr" style="visibility: hidden; display: none;">');
		oRm.writeEscaped(sText);
		oRm.write('</SPAN>');

	};

	return FlatDatePickerRenderer;

}, /* bExport= */ true);