/*!
 * ${copyright}
 */

// Provides control it.designfuture.flatpickr.FlatDatePicker
sap.ui.define([
		'jquery.sap.global',
		'sap/m/InputBase',
		'./3rdparty/flatpickr',
		'./library'
	], function(jQuery, InputBase, flatpickr, library) {
	"use strict";

	/**
	 * Constructor for a new FlatDatePicker.
	 *
	 * @param {string} [sId] id for the new control, generated automatically if no id is given 
	 * @param {object} [mSettings] initial settings for the new control
	 *
	 * @class
	 * FlatDatePicker TODO ADD HERE A DESCRIPTION
	 * @extends sap.m.InputBase
	 * @version ${version}
	 *
	 * @constructor
	 * @public
	 * @since 1.40
	 * @name it.designfuture.flatpickr.FlatDatePicker
	 */

	var FlatDatePicker = InputBase.extend("it.designfuture.flatpickr.FlatDatePicker", /** @lends it.designfuture.flatpickr.FlatDatePicker prototype */ { 
		
		__flatPickr: undefined,
		
		metadata : {
			library: 'it.designfuture.flatpickr',
			properties : {
				
				/**
				 * Exactly the same as date format, but for the altInput field
				 */
				altFormat : {type : "string", group : "Appearance", defaultValue : "F j, Y"},
				
				/**
				 * Show the user a readable date (as per altFormat), but return something totally different to the server.
				 */
				altInput : {type : "boolean", group : "Appearance", defaultValue : false},
				
				/**
				 * This class will be added to the input element created by the altInput option.  
				 * Note that altInput already inherits classes from the original input.
				 */
				altInputClass : {type : "string", group : "Appearance", defaultValue : ""},
				
				/**
				 * Allows the user to enter a date directly input the input field. By default, direct entry is disabled.
				 */
				allowInput : {type : "boolean", group : "Appearance", defaultValue : false},
				
				/**
				 * Allows the user to enter a date directly input the input field. By default, direct entry is disabled.
				 */
				//appendTo : {type : "boolean", group : "Appearance", defaultValue : false},
				
				/**
				 * Whether clicking on the input should open the picker. 
				 * You could disable this if you wish to open the calendar manually with.open()
				 */
				clickOpens : {type : "boolean", group : "Appearance", defaultValue : true},
				
				/**
				 * A string of characters which are used to define how the date will be displayed in the input box. 
				 * The supported characters are defined in the table below.
				 */
				dateFormat : {type : "string", group : "Appearance", defaultValue : "Y-m-d"},
				
				/**
				 * Sets the initial selected date(s).
				 * If you're using mode: "multiple" or a range calendar supply an Array of Date objects or an Array of date strings which follow your dateFormat.
				 * Otherwise, you can supply a single Date object or a date string.
				 */
				dateValue : {type : "object", group : "Appearance", defaultValue : null, bindable: "bindable"},
				
				/**
				 * Initial value of the hour element.
				 */
				hourValue : {type : "object", group : "Appearance", defaultValue : 12, bindable: "bindable"},
				
				/**
				 * Initial value of the minute element.
				 */
				minuteValue : {type : "object", group : "Appearance", defaultValue : 0, bindable: "bindable"},
				
				/**
				 * Arrays of dates object to be disabled
				 */
				disabledDates : {type : "object[]", group : "Appearance", defaultValue : [], bindable: "bindable"},

				/**
				 * Set disableMobile to true to always use the non-native picker.
				 * By default, Flatpickr utilizes native datetime widgets unless certain options (e.g. disable) are used.
				 */
				disableMobile : {type : "boolean", group : "Appearance", defaultValue : false},
				
				/**
				 * Arrays of dates object to be enabled
				 */
				enabledDates : {type : "object[]", group : "Appearance", defaultValue : [], bindable: "bindable"},
				
				/**
				 * Enables time picker
				 */
				enableTime : {type : "boolean", group : "Appearance", defaultValue : false},
				
				/**
				 * Enables seconds in the time picker.
				 */
				enableSeconds : {type : "boolean", group : "Appearance", defaultValue : false},
				
				/**
				 * Adjusts the step for the hour input (incl. scrolling)
				 */
				hourIncrement : {type : "int", group : "Appearance", defaultValue : 1},
				
				/**
				 * Displays the calendar inline
				 */
				inline : {type : "boolean", group : "Appearance", defaultValue : false},
				
				/**
				 * The maximum date that a user can pick to (inclusive).
				 */
				maxDate : {type : "object", group : "Appearance", defaultValue : null},
				
				/**
				 * The minimum date that a user can start picking from (inclusive).
				 */
				minDate : {type : "object", group : "Appearance", defaultValue : null},
				
				/**
				 * Adjusts the step for the minute input (incl. scrolling)
				 */
				minuteIncrement : {type : "int", group : "Appearance", defaultValue : 5},
				
				/**
				 * "single", "multiple", or "range"
				 */
				mode : {type : "string", group : "Appearance", defaultValue : "single"},
				
				/**
				 * Hides the day selection in calendar. 
				 * Use it along with enableTime to create a time picker.
				 */
				noCalendar : {type : "boolean", group : "Appearance", defaultValue : false},
				
				/**
				 * 	Show the month using the shorthand version (ie, Sep instead of September).
				 */
				shorthandCurrentMonth : {type : "boolean", group : "Appearance", defaultValue : false},
				
				/**
				 * Position the calendar inside the wrapper and next to the input element. 
				 * (Leave false unless you know what you're doing.)
				 */
				static : {type : "boolean", group : "Appearance", defaultValue : false},
				
				/**
				 * Displays time picker in 24 hour mode without AM/PM selection when enabled.
				 */
				time_24hr : {type : "boolean", group : "Appearance", defaultValue : false},
				
				/**
				 * Enables display of week numbers in calendar.
				 */
				weekNumbers : {type : "boolean", group : "Appearance", defaultValue : false},
			},
			aggregations: {},
			events: {
				
				/**
				 * onChange gets triggered when the user selects a date, or changes the time on a selected date
				 */
				onChange: {
					parameters: {
						/**
						 * An array of Date objects selected by the user. When there are no dates selected, the array is empty.
						 */
						selectedDates: { type: "object[]" },
						
						/**
						 * String representation of the latest selected Date object by the user. The string is formatted as per the dateFormat option
						 */
						dateStr: { type: "string" },
						
						/**
						 * The Flatpickr object, containing various methods and properties
						 */
						instance: { type: "object" }
					}
				},
				
				/**
				 * onOpen gets triggered when the calendar is opened
				 */
				onOpen: {
					parameters: {
						/**
						 * An array of Date objects selected by the user. When there are no dates selected, the array is empty.
						 */
						selectedDates: { type: "object[]" },
						
						/**
						 * String representation of the latest selected Date object by the user. The string is formatted as per the dateFormat option
						 */
						dateStr: { type: "string" },
						
						/**
						 * The Flatpickr object, containing various methods and properties
						 */
						instance: { type: "object" }
					}
				},
				
				/**
				 * onClose gets triggered when the calendar is closed
				 */
				onClose: {
					parameters: {
						/**
						 * An array of Date objects selected by the user. When there are no dates selected, the array is empty.
						 */
						selectedDates: { type: "object[]" },
						
						/**
						 * String representation of the latest selected Date object by the user. The string is formatted as per the dateFormat option
						 */
						dateStr: { type: "string" },
						
						/**
						 * The Flatpickr object, containing various methods and properties
						 */
						instance: { type: "object" }
					}
				},
				
				/**
				 * onMonthChange gets triggered when the month is changed, either by the user or programmatically
				 */
				onMonthChange: {
					parameters: {
						/**
						 * An array of Date objects selected by the user. When there are no dates selected, the array is empty.
						 */
						selectedDates: { type: "object[]" },
						
						/**
						 * String representation of the latest selected Date object by the user. The string is formatted as per the dateFormat option
						 */
						dateStr: { type: "string" },
						
						/**
						 * The Flatpickr object, containing various methods and properties
						 */
						instance: { type: "object" }
					}
				},
				
				/**
				 * onMonthChange gets triggered when the year is changed, either by the user or programmatically
				 */
				onYearChange: {
					parameters: {
						/**
						 * An array of Date objects selected by the user. When there are no dates selected, the array is empty.
						 */
						selectedDates: { type: "object[]" },
						
						/**
						 * String representation of the latest selected Date object by the user. The string is formatted as per the dateFormat option
						 */
						dateStr: { type: "string" },
						
						/**
						 * The Flatpickr object, containing various methods and properties
						 */
						instance: { type: "object" }
					}
				},
				
				/**
				 * onReady gets triggered once the calendar is in a ready state.
				 */
				onReady: {
					parameters: {
						/**
						 * An array of Date objects selected by the user. When there are no dates selected, the array is empty.
						 */
						selectedDates: { type: "object[]" },
						
						/**
						 * String representation of the latest selected Date object by the user. The string is formatted as per the dateFormat option
						 */
						dateStr: { type: "string" },
						
						/**
						 * The Flatpickr object, containing various methods and properties
						 */
						instance: { type: "object" }
					}
				},
				
				/**
				 * onValueUpdate gets triggered when the input value is updated with a new date string
				 */
				onValueUpdate: {
					parameters: {
						/**
						 * An array of Date objects selected by the user. When there are no dates selected, the array is empty.
						 */
						selectedDates: { type: "object[]" },
						
						/**
						 * String representation of the latest selected Date object by the user. The string is formatted as per the dateFormat option
						 */
						dateStr: { type: "string" },
						
						/**
						 * The Flatpickr object, containing various methods and properties
						 */
						instance: { type: "object" }
					}
				},
				
				/**
				 * Take full control of every date cell with the onDayCreate() hook
				 */
				onDayCreate: {
					parameters: {
						/**
						 * An array of Date objects selected by the user. When there are no dates selected, the array is empty.
						 */
						selectedDates: { type: "object[]" },
						
						/**
						 * String representation of the latest selected Date object by the user. The string is formatted as per the dateFormat option
						 */
						dateStr: { type: "string" },
						
						/**
						 * The Flatpickr object, containing various methods and properties
						 */
						instance: { type: "object" }
					}
				}
				
			}
		}, 
		
		init: function() {
			//	Init all the things!
		},
		
		onAfterRendering: function() {
			var that = this;
			this.__flatPickr = $("#"+this.getId()+".flatpickrCustomControl").flatpickr({
			    altFormat: this.getAltFormat(),
			    altInput: this.getAltInput(),
			    altInputClass: this.getAltInputClass(),
			    allowInput: this.getAllowInput(),
			    clickOpens: this.getClickOpens(),
			    dateFormat: this.getDateFormat(),
			    defaultDate: this.getDateValue(),
			    defaultHour: this.getHourValue(),
			    defaultMinute: this.getMinuteValue(),
			    disable: this.getDisabledDates(),
				disableMobile: this.getDisableMobile(),
			    enable: this.getEnabledDates(),
			    enableTime: this.getEnableTime(),
			    enableSeconds: this.getEnableSeconds(),
			    hourIncrement: this.getHourIncrement(),
			    inline: this.getInline(),
			    maxDate: this.getMaxDate(),
			    minDate: this.getMinDate(),
			    minuteIncrement: this.getMinuteIncrement(),
			    mode: this.getMode(),
			    noCalendar: this.getNoCalendar(),
			    shorthandCurrentMonth: this.getShorthandCurrentMonth(),
			    static: this.getStatic(),
			    time_24hr: this.getTime_24hr(),
			    weekNumbers: this.getWeekNumbers(),
			    wrap: true, // force wrap to true
			    
			    // defining events callback
			    onChange: function(selectedDates, dateStr, instance) {
					that.setProperty("dateValue", selectedDates, true);
					that.fireOnChange({selectedDates: selectedDates, dateStr: dateStr, instance: instance});
				},
			    onOpen: function(selectedDates, dateStr, instance) {
					that.fireOnOpen({selectedDates: selectedDates, dateStr: dateStr, instance: instance});
				},
			    onClose: function(selectedDates, dateStr, instance) {
					that.fireOnClose({selectedDates: selectedDates, dateStr: dateStr, instance: instance});
				},
			    onMonthChange: function(selectedDates, dateStr, instance) {
					that.fireOnMonthChange({selectedDates: selectedDates, dateStr: dateStr, instance: instance});
				},
			    onYearChange: function(selectedDates, dateStr, instance) {
					that.fireOnYearChange({selectedDates: selectedDates, dateStr: dateStr, instance: instance});
				},
			    onReady: function(selectedDates, dateStr, instance) {
					that.fireOnReady({selectedDates: selectedDates, dateStr: dateStr, instance: instance});
				},
			    onValueUpdate: function(selectedDates, dateStr, instance) {
					that.fireOnValueUpdate({selectedDates: selectedDates, dateStr: dateStr, instance: instance});
				},
			    onDayCreate: function(selectedDates, dateStr, instance) {
					that.fireOnDayCreate({selectedDates: selectedDates, dateStr: dateStr, instance: instance});
				}
			});
		},
		
		////////////////////////////////////////////////////
		//	FASTPICKR METHODS
		////////////////////////////////////////////////////
		
		/*
		* Resets the selected dates (if any) and clears the input.
		* @public
		*/
		clearDatePicker: function() {
			if( this.__flatPickr ) {
				this.__flatPickr.clear();
			}
		},
		
		/*
		* Closes the calendar.
		* @public
		*/
		closeDatePicker: function() {
			if( this.__flatPickr ) {
				this.__flatPickr.close();
			}
		},
		
		/*
		* Destroys the Flatpickr instance, cleans up - removes event listeners, restores inputs, etc.
		* @public
		*/
		destroyDatePicker: function() {
			if( this.__flatPickr ) {
				this.__flatPickr.destroy();
			}
		},
		
		/*
		* Return a formatted date
		* @public
		* @param {string} formatStr Formatting tokens string
		* @param {string} dateObj Date to be formatted
		* @returns {string} A string representation of dateObj,  formatted as per formatStr
		*/
		formatDate: function(formatStr, dateObj) {
			if( this.__flatPickr ) {
				return this.__flatPickr.formatDate(formatStr, dateObj);
			}
			return null;
		},
		
		
		/*
		* Sets the calendar view to the year and month ofdate, which can be a date string, a Date, or nothing
		* If date is undefined, the view is set to the latest selected date, the minDate, or today’s date
		* @public
		* @param {Date} date Date to jump to
		*/
		jumpToDate: function(date) {
			if( this.__flatPickr ) {
				this.__flatPickr.jumpToDate(date);
			}
		},
		
		/*
		* Shows/opens the calendar.
		* @public
		*/
		openDatePicker: function() {
			if( this.__flatPickr ) {
				this.__flatPickr.open();
			}
		},
		
		/*
		* Parses a date string or a timestamp, and returns a Date.
		* @public
		* @param {object} date String or timestamp to be parsed
		* @returns {Date} Parsed date
		*/
		parseDate: function(date) {
			if( this.__flatPickr ) {
				this.__flatPickr.parseDate();
			}
		},
		
		/*
		* Redraws the calendar. Shouldn’t be necessary in most cases
		* @public
		*/
		redrawDatePicker: function() {
			if( this.__flatPickr ) {
				this.__flatPickr.redraw();
			}
		},
		
		/*
		* Sets the current selected date(s) todate, which can be a date string, a Date, or an Array of the Dates.
		* Optionally, pass true as the second argument to force any onChange events to fire
		* @public
		* @param {object} string, Date or an Array of the Dates
		* @param {boolean} triggerChange If true will force any onChange events to fire
		*/
		setDate: function(date, triggerChange) {
			this.__flatPickr.setDate(date, triggerChange);
		},
		
		/*
		* Shows/opens the calendar if its closed, hides/closes it otherwise
		* @public
		*/
		toggleDatePicker: function() {
			this.__flatPickr.toggle();
		},
		
		////////////////////////////////////////////////////
		//	EVENTS HANDLING
		////////////////////////////////////////////////////
		
		onChange: function(selectedDates, dateStr, instance) {
			this.fireOnChange({selectedDates: selectedDates, dateStr: dateStr, instance: instance});
		},
		
		onOpen: function(selectedDates, dateStr, instance) {
			this.fireOnOpen({selectedDates: selectedDates, dateStr: dateStr, instance: instance});
		},
		
		onClose: function(selectedDates, dateStr, instance) {
			this.fireOnClose({selectedDates: selectedDates, dateStr: dateStr, instance: instance});
		},
		
		onMonthChange: function(selectedDates, dateStr, instance) {
			this.fireOnMonthChange({selectedDates: selectedDates, dateStr: dateStr, instance: instance});
		},
		
		onYearChange: function(selectedDates, dateStr, instance) {
			this.fireOnYearChange({selectedDates: selectedDates, dateStr: dateStr, instance: instance});
		},
		
		onReady: function(selectedDates, dateStr, instance) {
			this.fireOnReady({selectedDates: selectedDates, dateStr: dateStr, instance: instance});
		},
		
		onValueUpdate: function(selectedDates, dateStr, instance) {
			this.fireOnValueUpdate({selectedDates: selectedDates, dateStr: dateStr, instance: instance});
		},
		
		onDayCreate: function(selectedDates, dateStr, instance) {
			this.fireOnDayCreate({selectedDates: selectedDates, dateStr: dateStr, instance: instance});
		},
		
		////////////////////////////////////////////////////
		//	GETTER & SETTER FOR FLAT PICKER PROPERTIES
		////////////////////////////////////////////////////

		getSelectedDates: function() {
			if( this.__flatPickr ) {
				return this.__flatPickr.selectedDates;
			}
			return null;
		},
		
		setAltFormat: function(value) {
			if( this.__flatPickr ) {
				this.__flatPickr.set("altFormat", value);
			}
			this.setProperty("altFormat", value, false);
			return this;
		},
		
		setAltInput: function(value) {
			if( this.__flatPickr ) {
				this.__flatPickr.set("altInput", value);
			}
			this.setProperty("altInput", value, false);
			return this;
		},
		
		setAltInputClass: function(value) {
			if( this.__flatPickr ) {
				this.__flatPickr.set("altInputClass", value);
			}
			this.setProperty("altInputClass", value, false);
			return this;
		},
		
		setAllowInput: function(value) {
			if( this.__flatPickr ) {
				this.__flatPickr.set("allowInput", value);
			}
			this.setProperty("allowInput", value, false);
			return this;
		},
		
		setClickOpens: function(value) {
			if( this.__flatPickr ) {
				this.__flatPickr.set("clickOpens", value);
			}
			this.setProperty("clickOpens", value, false);
			return this;
		},
		
		setDateFormat: function(value) {
			if( this.__flatPickr ) {
				this.__flatPickr.set("dateFormat", value);
			}
			this.setProperty("dateFormat", value, false);
			return this;
		},
		
		setDateValue: function(value) {
			if( this.__flatPickr ) {
				this.__flatPickr.set("defaultDate", value);
			}
			this.setProperty("dateValue", value, false);
			return this;
		},
		
		setHourValue: function(value) {
			if( this.__flatPickr ) {
				this.__flatPickr.set("defaultHour", value);
			}
			this.setProperty("hourValue", value, false);
			return this;
		},
		
		setMinuteValue: function(value) {
			if( this.__flatPickr ) {
				this.__flatPickr.set("defaultMinute", value);
			}
			this.setProperty("minuteValue", value, false);
			return this;
		},
		
		setDisabledDates: function(value) {
			if( this.__flatPickr ) {
				this.__flatPickr.set("disable", value);
			}
			this.setProperty("disabledDates", value, false);
			return this;
		},
		
		setDisableMobile: function(value) {
			if( this.__flatPickr ) {
				this.__flatPickr.set("disableMobile", value);
			}
			this.setProperty("disableMobile", value, false);
			return this;
		},
		
		setEnabledDates: function(value) {
			if( this.__flatPickr ) {
				this.__flatPickr.set("enable", value);
			}
			this.setProperty("enabledDates", value, false);
			return this;
		},
		
		setEnableTime: function(value) {
			if( this.__flatPickr ) {
				this.__flatPickr.set("enableTime", value);
			}
			this.setProperty("enableTime", value, false);
			return this;
		},
		
		setEnableSeconds: function(value) {
			if( this.__flatPickr ) {
				this.__flatPickr.set("enableSeconds", value);
			}
			this.setProperty("enableSeconds", value, false);
			return this;
		},
		
		setHourIncrement: function(value) {
			if( this.__flatPickr ) {
				this.__flatPickr.set("hourIncrement", value);
			}
			this.setProperty("hourIncrement", value, false);
			return this;
		},
		
		setInline: function(value) {
			if( this.__flatPickr ) {
				this.__flatPickr.set("inline", value);
			}
			this.setProperty("inline", value, false);
			return this;
		},
		
		setMaxDate: function(value) {
			if( this.__flatPickr ) {
				this.__flatPickr.set("maxDate", value);
			}
			this.setProperty("maxDate", value, false);
			return this;
		},
		
		setMinDate: function(value) {
			if( this.__flatPickr ) {
				this.__flatPickr.set("minDate", value);
			}
			this.setProperty("minDate", value, false);
			return this;
		},
		
		setMinuteIncrement: function(value) {
			if( this.__flatPickr ) {
				this.__flatPickr.set("minuteIncrement", value);
			}
			this.setProperty("minuteIncrement", value, false);
			return this;
		},
		
		setMode: function(value) {
			if( this.__flatPickr ) {
				this.__flatPickr.set("mode", value);
			}
			this.setProperty("mode", value, false);
			return this;
		},
		
		setNoCalendar: function(value) {
			if( this.__flatPickr ) {
				this.__flatPickr.set("noCalendar", value);
			}
			this.setProperty("noCalendar", value, false);
			return this;
		},
		
		setShorthandCurrentMonth: function(value) {
			if( this.__flatPickr ) {
				this.__flatPickr.set("shorthandCurrentMonth", value);
			}
			this.setProperty("shorthandCurrentMonth", value, false);
			return this;
		},
		
		setStatic: function(value) {
			if( this.__flatPickr ) {
				this.__flatPickr.set("static", value);
			}
			this.setProperty("static", value, false);
			return this;
		},
		
		setTime_24hr: function(value) {
			if( this.__flatPickr ) {
				this.__flatPickr.set("time_24hr", value);
			}
			this.setProperty("time_24hr", value, false);
			return this;
		},
		
		setWeekNumbers: function(value) {
			if( this.__flatPickr ) {
				this.__flatPickr.set("weekNumbers", value);
			}
			this.setProperty("weekNumbers", value, false);
			return this;
		}
		
	});
	
	/*
	* Override the exit method to free local resources and destroy 
	* Optionally, pass true as the second argument to force any onChange events to fire
	* @public
	*/	
	FlatDatePicker.prototype.exit = function() {
		InputBase.prototype.exit.apply(this, arguments);
		if (this.__flatPickr) {
			if (this.__flatPickr.isOpen) {
				this.closeDatePicker();
			}
			this.destroyDatePicker();
		}
		this.__flatPickr = undefined;
	};
	
	return FlatDatePicker;

}, /* bExport= */ true);