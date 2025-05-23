////////////////////////////////////////////////////////////////////////////////////////////////////
//
// WT LIBRARY - Waze.Tools shared library for scripts
//
// By Wazer fmondini (https://www.waze.com/discuss/u/fmondini/summary)
//
// History:
// - 2025/04 v.0.1.XX - First internal version
// - 2025/05 v.1.0.GA - Adapted for CIFP (https://cifp.waze.tools)
//
////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * -------------------------------------------------------------------------------------------------
 *  Console class
 * -------------------------------------------------------------------------------------------------
 */
class WT_ConsoleClass {

	constructor(logPrefix) {

		this.DEBUG_FLAG = false;
		this.LIB_AUTHOR = 'fmondini';
		this.LIB_VERSION = '1.0.GA';
		this.LIB_RELEASE = '2025-05-17';
		this.SCRIPT_TAG = logPrefix.toUpperCase();

		const PRINT_PREFIX = '[' + this.SCRIPT_TAG + ']';	// LOG Prefix for the console
		const DEBUG_PREFIX = PRINT_PREFIX + ' [DEBUG]';		// LOG Prefix for the debug console

		this.MASK_STR_TXT = PRINT_PREFIX + ' %s';
		this.MASK_STR_DBG = DEBUG_PREFIX + ' %s';
		this.MASK_OBJ_TXT = PRINT_PREFIX + ' %s: %o';
		this.MASK_OBJ_DBG = DEBUG_PREFIX + ' %s: %o';
	}

	// Getters
	isDebug()		{ return(this.DEBUG_FLAG);	}
	getScriptTag()	{ return(this.SCRIPT_TAG);	}
	getLibAuthor()	{ return(this.LIB_AUTHOR);	}
	getLibVersion()	{ return(this.LIB_VERSION);	}
	getLibRelease()	{ return(this.LIB_RELEASE);	}

	// Setters
	SetDebug(b)		{ this.DEBUG_FLAG = b;		}

	// Debug Group
	DebugGroupStart(s)			{ if (this.isDebug()) { console.groupCollapsed(this.MASK_STR_DBG, s); }	}
	DebugGroupStartExpanded(s)	{ if (this.isDebug()) { console.group(this.MASK_STR_DBG, s); }			}
	DebugGroupEnd()				{ if (this.isDebug()) { console.groupEnd(); }							}

	// Debug
	Debug(s)			{ if (this.isDebug()) { console.debug(this.MASK_STR_DBG, s); }		}
	DebugObj(s, o)		{ if (this.isDebug()) { console.debug(this.MASK_OBJ_DBG, s, o); }	}

	// Console out
	Print(s)			{ console.info(this.MASK_STR_TXT, s);		}
	PrintObj(s, o)		{ console.info(this.MASK_OBJ_TXT, s, o);	}
	PrintWrn(s)			{ console.warn(this.MASK_STR_TXT, s);		}
	PrintWrnObj(s, o)	{ console.warn(this.MASK_OBJ_TXT, s, o);	}
	PrintErr(s)			{ console.error(this.MASK_STR_TXT, s);		}
	PrintErrObj(s, o)	{ console.error(this.MASK_OBJ_TXT, s, o);	}
}

/**
 * -------------------------------------------------------------------------------------------------
 *  Trusted Types class
 * -------------------------------------------------------------------------------------------------
 */
class WT_TrustedTypesClass {

	constructor() {

		WT_CONSOLE.DebugGroupStart('WT_TrustedTypesClass()');

		this.trustedTypesPolicy = null;
		this.trustedTypesPolicyName = WT_CONSOLE.getScriptTag() + 'TrustedPolicy';
		WT_CONSOLE.DebugObj('this.trustedTypesPolicyName', this.trustedTypesPolicyName);

		// Create policy

		if (window.trustedTypes && window.trustedTypes.createPolicy) {

			this.trustedTypesPolicy = window.trustedTypes.createPolicy(
				this.trustedTypesPolicyName, {
					createHTML: (string) => string,
					createScriptURL(url) { return url; }
				}
			);

			WT_CONSOLE.DebugObj('Policy created', this.trustedTypesPolicy);
		}

		WT_CONSOLE.DebugGroupEnd();
	}

	// Getters

	GetTrustedTypesPolicy() { return(this.trustedTypesPolicy); }

	/**
	 * Check TrustedTypes Enabled
	 */
	isTrustedTypesEnabled() {

		let rc = false;

		try {

			if (navigator.userAgent.match(/chrome|chromium|crios/i))	{ rc = true;  } else
			if (navigator.userAgent.match(/edg/i))						{ rc = true;  } else
			if (navigator.userAgent.match(/safari/i))					{ rc = false; } else
			if (navigator.userAgent.match(/firefox|fxios/i))			{ rc = false; } else
			if (navigator.userAgent.match(/opr\//i))					{ rc = true;  }

		} catch(err) {

			WT_CONSOLE.PrintErrObj('WT_TrustedTypesClass.isTrustedTypesEnabled()', err);
			WT_CONSOLE.PrintErrObj('WT_TrustedTypesClass.isTrustedTypesEnabled(): window.trustedTypes', window.trustedTypes);
		}

		WT_CONSOLE.DebugObj('WT_TrustedTypesClass.isTrustedTypesEnabled(): rc', rc);

		return(rc);
	}

}

/**
 * -------------------------------------------------------------------------------------------------
 *  Local Storage class
 * -------------------------------------------------------------------------------------------------
 */
class WT_LocalStorageClass {

	constructor() {

		const lsPrefix = WT_CONSOLE.getScriptTag();

		WT_CONSOLE.DebugGroupStart('WT_LocalStorageClass()');

		// API Key location
		this.keywApiKey = lsPrefix + '_ApiKey';
		WT_CONSOLE.DebugObj('this.keywApiKey', this.keywApiKey);

		// Last cfg update datetime keyword
		this.keywLastUpdateTime = lsPrefix + '_LastUpdateTime';
		WT_CONSOLE.DebugObj('this.keywLastUpdateTime', this.keywLastUpdateTime);

		// Last cfg update json data keyword
		this.keywLastUpdateData = lsPrefix + '_LastUpdateData';
		WT_CONSOLE.DebugObj('this.keywLastUpdateData', this.keywLastUpdateData);

		WT_CONSOLE.DebugGroupEnd();
	}

	// Getters

	GetApiKey()			{ let apiKey = localStorage.getItem(this.keywApiKey); return((apiKey === null) ? '' : apiKey);	}
	GetUpdateTime()		{ return(parseInt(localStorage.getItem(this.keywLastUpdateTime)));								}
	GetUpdateData()		{ return(JSON.parse(localStorage.getItem(this.keywLastUpdateData)));							}

	// Setters

	SetApiKey(s)		{ localStorage.setItem(this.keywApiKey, s);							}
	SetUpdateTime(d)	{ localStorage.setItem(this.keywLastUpdateTime, d);					}
	SetUpdateData(j)	{ localStorage.setItem(this.keywLastUpdateData, JSON.stringify(j));	}
}

/**
 * -------------------------------------------------------------------------------------------------
 *  Feature class
 * -------------------------------------------------------------------------------------------------
 */
class WT_FeatureClass {

	/**
	 * Get an array of selected objects data
	 * @throws Exception if no segment(s) selected
	 */
	GetSelectedArray(validFeatureTypes) {

		WT_CONSOLE.DebugObj('WT_FeatureClass.GetSelectedArray(): validFeatureTypes', validFeatureTypes);

		const selectedFeatures = WT_WME_SDK.Editing.getSelection();
		WT_CONSOLE.DebugObj('WT_FeatureClass.GetSelectedArray(): selectedFeatures', selectedFeatures);

		let dataArray = [];

		try {

			if (selectedFeatures === null) {
				throw 'selectedFeatures is null';
			}

			let isValid = false;

			validFeatureTypes.forEach((featureType) => {
				if (selectedFeatures.objectType == featureType)
					isValid = true;
			});

			if (isValid) {

				selectedFeatures.ids.forEach(id => {
					dataArray.push({
						'sid'      : id,
						'street'   : this.GetStreetName(id),
						'polyline' : this.GetPolyline(id)
					});
				});

				WT_CONSOLE.DebugObj('WT_FeatureClass.GetSelectedArray()', dataArray);

			} else {

				throw 'isValid is false';
			}

		} catch (err) {
			
			let ErrMsg = '<b>No valid objects selected</b><br><small><i>Error: ' + err + '</i></small><br><br>Please select one or more objects(s) of this type:';
			let typesList = '';

			validFeatureTypes.forEach((featureType) => {
				typesList += (typesList == '' ? '' : ', ') + '"' + featureType + '"';
			});

			throw ErrMsg + '<br>' + typesList;
		}

		return(dataArray);
	}

	/**
	 * Get street name
	 */
	GetStreetName(segmentId) {

		let streetName = null;

		try {

			streetName = WT_WME_SDK.DataModel.Segments.getAddress(
				{ segmentId: segmentId }
			).street.name;

		} catch(err) {
			streetName = err.message;
		}

		return(streetName);
	}

	/**
	 * Get city name
	 */
	GetCityName(segmentId) {

		let cityName = null;

		try {

			cityName = WT_WME_SDK.DataModel.Segments.getAddress(
				{ segmentId: segmentId }
			).city.name;
			
		} catch(err) {
			cityName = err.message;
		}

		return(cityName);
	}

	/**
	 * Get state (or province) name
	 */
	GetStateName(segmentId) {

		let stateName = null;

		try {

			stateName = WT_WME_SDK.DataModel.Segments.getAddress(
				{ segmentId: segmentId }
			).state.name;
			
		} catch(err) {
			stateName = err.message;
		}

		return(stateName);
	}

	/**
	 * Get country name
	 */
	GetCountryName(segmentId) {

		let countryName = null;

		try {

			countryName = WT_WME_SDK.DataModel.Segments.getAddress(
				{ segmentId: segmentId }
			).country.name;

		} catch(err) {
			countryName = err.message;
		}

		return(countryName);
	}

	//
	// Get country ISO code (2 chars)
	//
	GetCountryAbbr(segmentId) {

		let countryAbbr = null;

		try {

			countryAbbr = WT_WME_SDK.DataModel.Segments.getAddress(
				{ segmentId: segmentId }
			).country.abbr;
			
		} catch(err) {
			countryAbbr = err.message;
		}

		return(countryAbbr);
	}

	/**
	 * Get segment polyline
	 */
	GetPolyline(segmentId) {

		let selPolyline = '', coordsPoints = null;

		try {

			coordsPoints = (
				WT_WME_SDK.DataModel.Segments.getWKTGeometry(
					{ segmentId: segmentId }
				)
				.replace('LINESTRING(', '')
				.replace(')', '')
				.split(',')
			);

			coordsPoints.forEach(coordPoint => {
				selPolyline += (
					(selPolyline.length == 0 ? '' : ', ') +
					Number.parseFloat(coordPoint.split(' ')[1]).toFixed(5) + // Lat
					' ' +
					Number.parseFloat(coordPoint.split(' ')[0]).toFixed(5) // Lng
				);
			});

		} catch(err) {
			selPolyline = err.message;
		}

		return(selPolyline);
	}

}

/**
 * -------------------------------------------------------------------------------------------------
 *  HTML objects class
 * -------------------------------------------------------------------------------------------------
 */
class WT_HtmlObjectsClass {

	constructor() {

		// Default font
		this.fontDefaultName = 'Rubik, sans-serif';

		// Styles
		this.styleCenteredDiv = 'position:fixed; display:block; z-index:10999; background-color:white; padding:0px; top:50%; left:50%; -webkit-transform:translate(-50%, -50%); transform:translate(-50%, -50%);';
		this.styleModalBackground = 'position:fixed; display:block; z-index:10998; top:0px; left:0px; width:100%; height:100%; background-color:rgba(0, 0, 0, 0.7)';

		// Divs
		this.divSeparator = '<div style="height:1px; background-color:DarkGray"></div>';
		this.divFormSubmitForeID = 'WT_FormSubmitForeID';
		this.divFormSubmitBackID = 'WT_FormSubmitBackID';

		// IDs
		this.idButtonApiKey = 'WT_ButtonApiKeyID';
		this.idErrorMsgBtnClose = 'WT_ErrorMsgBtnCloseID';
		this.divPleaseWaitID = 'WT_PleaseWaitID';
	}

	// Getters

	GetFontName()				{ return(this.fontDefaultName);			}
	GetStyleCenteredDiv()		{ return(this.styleCenteredDiv);		}
	GetStyleModalBackground()	{ return(this.styleModalBackground);	}
	GetSeparatorDiv()			{ return(this.divSeparator);			}
	GetSubmitFormForeID()		{ return(this.divFormSubmitForeID);		}
	GetSubmitFormBackID()		{ return(this.divFormSubmitBackID);		}
	GetButtonApiKeyID()			{ return(this.idButtonApiKey);			}

	/**
	 * Generate the UI Header DIV
	 */
	GetHeaderDiv(includeApiButton) {

		const scrIcon = GM_info.script.icon;
		const scrName = GM_info.script.name;
		const scrVers = GM_info.script.version + ' (' + GM_info.userAgentData.platform + ')';
		const scrAuth = GM_info.script.author;

		const scrButton = (includeApiButton
			? this.CreateButton(this.idButtonApiKey, '&#128273;', 'Enter API-KEY')
			: ''
		);

		const API_BUTTON_HTML_DIV =
			'<div style="padding:8px; background-color:Gainsboro">' +
				'<table width="100%" border="0">' +
					'<tr>' +
						'<td width="80px">' +
							'<a href="https://waze.tools/" target="_blank"><img src="' + scrIcon + '" title="Waze.Tools Suite"></a>' +
						'</td>' +
						'<td align="left">' +
							'<table width="100%" border="0">' +
								'<tr>' +
									'<td ColSpan="2">' +
										'<div style="font-size: 180%; font-weight: bold; padding-top:8px;">' + scrName + '</div>' +
									'</td>' +
								'</tr>' +
								'<tr>' +
									'<td>' +
										'<div style="font-size: 120%; font-style: italic; padding-top:4px">Version ' + scrVers  + '</div>' +
										'<div style="font-style: italic; padding-top:2px">Made with love &amp; passion by ' + scrAuth + '</div>' +
									'</td>' +
									'<td style="align="right" valign="bottom">' + scrButton + '</td>' +
								'</tr>' +
							'</table>' +
						'</td>' +
					'</tr>' +
				'</table>' +
			'</div>' +
			this.divSeparator
		;

		return(API_BUTTON_HTML_DIV);
	}

	/**
	 * Show submit form
	 */
	ShowSubmitForm(htmlContent) {

		// Transparent background (for the modal effect)

		let divSubmitBack = document.createElement('div');

		divSubmitBack.id = this.divFormSubmitBackID;
		divSubmitBack.style.cssText = this.styleModalBackground;

		unsafeWindow.jQuery('#map').append(divSubmitBack);

		// Form UI

		let divSubmitFore = document.createElement('div');

		divSubmitFore.id = this.divFormSubmitForeID;
		divSubmitFore.style.cssText = this.styleCenteredDiv;

		divSubmitFore.innerHTML = WT_TTYPPOL.isTrustedTypesEnabled()
			? WT_TTYPPOL.GetTrustedTypesPolicy().createHTML(htmlContent)
			: htmlContent
		;

		unsafeWindow.jQuery('#map').append(divSubmitFore);
	}

	/**
	 * Show Error message
	 */
	ShowError(head, body) {

		const btnClose = this.CreateButton(this.idErrorMsgBtnClose, 'Close', '');

		const ERROR_HTML_DIV = (
			'<div style="font-family: ' + this.fontDefaultName + '">' +
			this.GetHeaderDiv() +
			'<div style="background-color:White">' +
				'<div style="padding:16px">' +
					'<div style="font-size:125%; font-style:italic; color:FireBrick" align="center">' + head + '</div>' +
					'<div style="padding:8px"></div>' +
					'<div style="font-size:125%;" align="center">' + body + '</div>' +
					'<div style="padding:8px"></div>' +
					'<div style="font-size:100%; font-style:italic; " align="center">See your browser console (F12) for more details (if available)</div>' +
					'</div>' +
				'</div>' +
				this.divSeparator +
				'<div style="padding:8px; background-color:Gainsboro" align="center">' + btnClose + '</div>' +
			'</div>'
		);

		// Transparent background (for the modal effect)

		const divErrorBackID = 'WT_divErrorBackID';

		let divErrorBack = document.createElement('div');

		divErrorBack.id = divErrorBackID;
		divErrorBack.style.cssText = this.styleModalBackground;

		unsafeWindow.jQuery('#map').append(divErrorBack);

		// Message

		const divErrorMsgID = 'WT_divErrorMsgID';

		let divErrorMsg = document.createElement('div');

		divErrorMsg.id = divErrorMsgID;
		divErrorMsg.style.cssText = this.styleCenteredDiv;
		divErrorMsg.innerHTML = ERROR_HTML_DIV;

		unsafeWindow.jQuery('#map').append(divErrorMsg);

		document.getElementById(this.idErrorMsgBtnClose).addEventListener('click', () => {
			this.DismissDiv([divErrorMsgID, divErrorBackID]);
		});
	}

	/**
	 * Create an app button
	 */
	CreateButton(id, value, title) {

		const BUTTON_DIV = (
			'<input ' +
				'type="button" ' +
				'id="' + id + '" ' +
				'title="' + title + '" ' +
				'value="' + value + '" ' +
				'style="' +
					'color: black;' +
					'background-color: White;' +
					'margin: 0px;' +
					'cursor: pointer;' +
					'padding-left: 8px;' +
					'padding-right: 8px;' +
					'padding-top: 4px;' +
					'padding-bottom: 4px;' +
					'border-style: solid;' +
					'border-color: gray;' +
					'border-width: 1px;' +
					'border-radius: 4px;' +
					'box-shadow: 2px 2px 4px gray;' +
				'"' +
			'>'
		);

		return(BUTTON_DIV);
	}

	/**
	 * Create WME button and add it to 'secondary-toolbar-actions'
	 * @returns WT_WmeBtnObj The created button
	 */
	CreateWmeButton(btnId, iconName, iconColor, btnText, btnTitle) {

		let WT_WmeBtnObj = document.createElement('wz-button');

		try {

			let WT_SecondaryToolBar1stChild = document.getElementsByClassName('secondary-toolbar-actions')[0];

			// Button

			WT_WmeBtnObj.id = btnId;
			WT_WmeBtnObj.size = 'sm';
			WT_WmeBtnObj.color = 'clear-icon';
			WT_WmeBtnObj.style = 'padding: 0px'; // 'padding-left: 16px';
			WT_WmeBtnObj.className = 'wz-button clear-icon sm with-icon';
			WT_WmeBtnObj.title = btnTitle;

			// Icon

			let WT_btnIco = document.createElement('i');

			WT_btnIco.className = 'w-icon ' + iconName;
			WT_btnIco.style = 'color:' + iconColor;

			WT_WmeBtnObj.appendChild(WT_btnIco);

			// Text

			let WT_btnTxt = document.createTextNode(btnText);

			WT_WmeBtnObj.appendChild(WT_btnTxt);

			// Append

			WT_SecondaryToolBar1stChild.insertBefore(WT_WmeBtnObj, WT_SecondaryToolBar1stChild.children[0]);

		} catch(err) {
			WT_CONSOLE.PrintErrObj('WT_HtmlObjectsClass.CreateWmeButton()', err);
		}

		return(WT_WmeBtnObj);
	}

	/**
	 * Show a "please wait" message
	 */
	PleaseWaitShow(head, body) {

		const PLEASE_WAIT_DIV = (
			'<div style="font-family: ' + this.fontDefaultName + '">' +
				this.GetHeaderDiv() +
				'<div style="padding: 16px; background-color: white" align="center">' +
					'<div style="font-size:150%; font-weight: bold">' + head + '</div>' +
					'<div style="font-size:120%">' + body + '</div>' +
				'</div>' +
			'</div>'
		);

		let divWait = document.createElement('div');

		divWait.id = this.divPleaseWaitID;
		divWait.style.cssText = this.styleCenteredDiv;

		divWait.innerHTML = WT_TTYPPOL.isTrustedTypesEnabled()
			? WT_TTYPPOL.GetTrustedTypesPolicy().createScriptURL(PLEASE_WAIT_DIV)
			: PLEASE_WAIT_DIV
		;

		unsafeWindow.jQuery('#map').append(divWait);
	}

	/**
	 * Dismiss a "please wait" message
	 */
	PleaseWaitDismiss() {

		this.DismissDiv([this.divPleaseWaitID]);
	}

	/**
	 * Dismiss DIVs
	 */
	DismissDiv(divArray) {

		divArray.forEach((divName) => {
			unsafeWindow.jQuery('#' + divName).remove();
		});
	}

}

/**
 * -------------------------------------------------------------------------------------------------
 *  +++ DEVELOPMENT ONLY - Dump SDK content to the console +++
 * -------------------------------------------------------------------------------------------------
 */
function SDK_DumpVars() {

	try {

		WT_CONSOLE.DebugGroupStart('[DEVONLY] Dumping Waze SDK content...');
		WT_CONSOLE.DebugObj('WT_WME_SDK', WT_WME_SDK);
		WT_CONSOLE.DebugObj('getSDKVersion()', WT_WME_SDK.getSDKVersion());
		WT_CONSOLE.DebugObj('getScriptId()', WT_WME_SDK.getScriptId());
		WT_CONSOLE.DebugObj('getScriptName()', WT_WME_SDK.getScriptName());
		WT_CONSOLE.DebugObj('getWMEVersion()', WT_WME_SDK.getWMEVersion());
		WT_CONSOLE.DebugObj('isBetaEnvironment()', WT_WME_SDK.isBetaEnvironment());

		WT_CONSOLE.DebugGroupStart('DataModel');
		WT_CONSOLE.DebugObj('DataModel', WT_WME_SDK.DataModel); // Access and manipulate the WME's underlying data structures, including segments, nodes, venues, and more.
		WT_CONSOLE.DebugObj('.DataModel.prototype', WT_WME_SDK.DataModel.prototype);
		WT_CONSOLE.DebugObj('.DataModel.LoggedInUser', WT_WME_SDK.DataModel.LoggedInUser);
		WT_CONSOLE.DebugGroupEnd();

		WT_CONSOLE.DebugGroupStart('Editing');
		WT_CONSOLE.DebugObj('Editing', WT_WME_SDK.Editing); // Perform various editing operations, such as saving, undoing, and selecting map features.
		WT_CONSOLE.DebugObj('.getSelection()', WT_WME_SDK.Editing.getSelection());
		WT_CONSOLE.DebugObj('.getSelection().ids', (!WT_WME_SDK.Editing.getSelection() ? null : WT_WME_SDK.Editing.getSelection().ids));
		WT_CONSOLE.DebugObj('.getSelection().objectType', (!WT_WME_SDK.Editing.getSelection() ? null : WT_WME_SDK.Editing.getSelection().objectType));
		WT_CONSOLE.DebugGroupEnd();

		WT_CONSOLE.DebugGroupStart('Errors');
		WT_CONSOLE.DebugObj('Errors', WT_WME_SDK.Errors); // A set of custom Error classes which can be used to manage errors that may occur during script execution.
		WT_CONSOLE.DebugGroupEnd();

		WT_CONSOLE.DebugGroupStart('Events');
		WT_CONSOLE.DebugObj('Events', WT_WME_SDK.Events);
		WT_CONSOLE.DebugGroupEnd();

		WT_CONSOLE.DebugGroupStart('LayerSwitcher');
		WT_CONSOLE.DebugObj('LayerSwitcher', WT_WME_SDK.LayerSwitcher); // Add or remove custom Map layers checkboxes.
		WT_CONSOLE.DebugGroupEnd();

		WT_CONSOLE.DebugGroupStart('Map');
		WT_CONSOLE.DebugObj('Map', WT_WME_SDK.Map); // Interact with the map display, including centering/zooming, retrieving map-related information and adding map layers.
		WT_CONSOLE.DebugObj('.getMapCenter()', WT_WME_SDK.Map.getMapCenter());
		WT_CONSOLE.DebugObj('.getZoomLevel()', WT_WME_SDK.Map.getZoomLevel());
		WT_CONSOLE.DebugGroupEnd();

		WT_CONSOLE.DebugGroupStart('Settings');
		WT_CONSOLE.DebugObj('Settings', WT_WME_SDK.Settings); // Manage user settings and preferences within the WME.
		WT_CONSOLE.DebugObj('.getLocale()', WT_WME_SDK.Settings.getLocale());
		WT_CONSOLE.DebugObj('.getRegionCode()', WT_WME_SDK.Settings.getRegionCode());
		WT_CONSOLE.DebugObj('.getUserSettings()', WT_WME_SDK.Settings.getUserSettings());
		WT_CONSOLE.DebugGroupEnd();

		WT_CONSOLE.DebugGroupStart('Shortcuts');
		WT_CONSOLE.DebugObj('Shortcuts', WT_WME_SDK.Shortcuts); // Create and manage custom keyboard shortcuts for improved efficiency.
		WT_CONSOLE.DebugGroupEnd();

		WT_CONSOLE.DebugGroupStart('Sidebar');
		WT_CONSOLE.DebugObj('Sidebar', WT_WME_SDK.Sidebar); // Register & create a dedicated area in the WME sidebar for script UI elements.
		WT_CONSOLE.DebugGroupEnd();

		WT_CONSOLE.DebugGroupStart('State');
		WT_CONSOLE.DebugObj('State', WT_WME_SDK.State); // Access and read the internal state of WME, along with the information about the current logged-in user.
		WT_CONSOLE.DebugObj('.getUserInfo()', WT_WME_SDK.State.getUserInfo());
		WT_CONSOLE.DebugObj('.getUserInfo().rank', WT_WME_SDK.State.getUserInfo().rank);
		WT_CONSOLE.DebugObj('.getUserInfo().userName', WT_WME_SDK.State.getUserInfo().userName);
		WT_CONSOLE.DebugGroupEnd();

		WT_CONSOLE.DebugGroupEnd();

	} catch(err) {
		WT_CONSOLE.PrintErrObj('WT_WME_SDK ERROR', err);
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////
//
// WT LIBRARY END - So long, and thanks for all the fish.
//
////////////////////////////////////////////////////////////////////////////////////////////////////
