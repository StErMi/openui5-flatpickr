/*!
 * ${copyright}
 */

/**
 * Initialization Code and shared classes of library it.designfuture.framework.
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
		 * @name it.designfuture.framework
		 * @author Emanuele Ricci <stermi@gmail.com>
		 * @version ${version}
		 * @public
		 */


		// Include custom css
		sap.ui.getCore().includeLibraryTheme("it.designfuture.framework");
		
		// delegate further initialization of this library to the Core
		sap.ui.getCore().initLibrary({
			name : "it.designfuture.framework",
			version: "${version}",
			dependencies : ["sap.ui.core", "sap.m"],
			types: [],
			interfaces: [],
			controls: [ 
				"it.designfuture.framework.FlatDatePicker"
			],
			elements: []
		});

		return it.designfuture.framework;

}, /* bExport= */ false);