/*!
 * ${copyright}
 */

/**
 * Initialization Code and shared classes of library it.designfuture.flatpickr.
 */
sap.ui.define([
	'jquery.sap.global', 
	'sap/ui/core/library' // library dependency
	],  function(jQuery, library) {

		"use strict";

		/**
		 * Suite controls library.
		 *
		 * @namespace
		 * @name it.designfuture.flatpickr
		 * @author Emanuele Ricci <stermi@gmail.com>
		 * @version ${version}
		 * @public
		 */


		// Include custom css
		sap.ui.getCore().includeLibraryTheme("it.designfuture.flatpickr");
		
		// delegate further initialization of this library to the Core
		sap.ui.getCore().initLibrary({
			name : "it.designfuture.flatpickr",
			version: "${version}",
			dependencies : ["sap.ui.core", "sap.m"],
			types: [],
			interfaces: [],
			controls: [ 
				"it.designfuture.flatpickr.FlatDatePicker"
			],
			elements: []
		});

		return it.designfuture.flatpickr;

}, /* bExport= */ false);