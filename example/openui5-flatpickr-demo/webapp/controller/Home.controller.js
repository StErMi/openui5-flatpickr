sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast"
], function(Controller, JSONModel, MessageToast) {
	"use strict";

	return Controller.extend("openui5-flatpickr-demo.controller.Home", {
		
		///////////////////////////////////////////////////////////////////////
		//	LIFECYCLE EVENTS
		///////////////////////////////////////////////////////////////////////
		
		onInit: function() {
			this.getView().setModel( new JSONModel({}), "temp");
			this.getView().getModel("temp").setProperty("/bindableDate", new Date());
		},
		
		///////////////////////////////////////////////////////////////////////
		//	EVENTS
		///////////////////////////////////////////////////////////////////////
		
		handleOnChangeEvent: function(oEvent) {
			// Array of selected dates
			var aSelectedDates = oEvent.getParameter("selectedDates");
			
			// String of the input value
			var sDateStr = oEvent.getParameter("dateStr");
			
			// Instance of the flatpickr javascript object
			var oFlatpickrInstance = oEvent.getParameter("instance");
			
			MessageToast.show( "Selected date: " + aSelectedDates[0].toString() );
		}

	});
});