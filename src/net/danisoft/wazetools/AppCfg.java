////////////////////////////////////////////////////////////////////////////////////////////////////
//
// AppCfg.java
//
// main application configuration file
//
// First Release: Mar/2025 by Fulvio Mondini (https://danisoft.software/)
//
////////////////////////////////////////////////////////////////////////////////////////////////////

package net.danisoft.wazetools;

import net.danisoft.dslib.AppList;
import net.danisoft.dslib.FmtTool;
import net.danisoft.dslib.SysTool;

public class AppCfg {

	////////////////////////////////////////////////////////////////////////////////////////////////////
	//
	// Editable parameters
	//

	private static final int	APP_VERS_MAJ = 4;
	private static final int	APP_VERS_MIN = 0;
	private static final String	APP_VERS_REL = "GA";
	private static final String	APP_DATE_REL = "Apr 26, 2025";

	private static final String	APP_NAME_TAG = AppList.HOME.getName();
	private static final String	APP_NAME_TXT = "Waze.Tools Suite";
	private static final String	APP_ABSTRACT = "The Waze.Tools Suite made by the Italian Community";
	private static final String	APP_EXITLINK = "https://www.waze.com/";

	private static final String	SERVER_ROOTPATH_DEVL = "C:/WorkSpace/Eclipse/Waze.Tools/wazetools-web/Web Content";
	private static final String	SERVER_ROOTPATH_PROD = "/var/www/html/www.waze.tools/Web Content";

	private static final String	SERVER_HOME_URL_DEVL = "http://localhost:8080/www.waze.tools";
	private static final String	SERVER_HOME_URL_PROD = "https://www.waze.tools";

	////////////////////////////////////////////////////////////////////////////////////////////////////
	//
	// Getters
	//

	public static final String getAppTag()			{ return(APP_NAME_TAG);	}
	public static final String getAppName()			{ return(APP_NAME_TXT);	}
	public static final String getAppAbstract()		{ return(APP_ABSTRACT);	}
	public static final String getAppVersion()		{ return(APP_VERS_MAJ + "." + FmtTool.fmtZeroPad(APP_VERS_MIN, 2) + "." + APP_VERS_REL); }
	public static final String getAppRelDate()		{ return(APP_DATE_REL);	}
	public static final String getAppExitLink()		{ return(APP_EXITLINK);	}
	public static final String getServerRootPath()	{ return(SysTool.isWindog() ? SERVER_ROOTPATH_DEVL : SERVER_ROOTPATH_PROD); }
	public static final String getServerHomeUrl()	{ return(SysTool.isWindog() ? SERVER_HOME_URL_DEVL : SERVER_HOME_URL_PROD); }
}
