<%@ page
	language="java"
	contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"
	import="net.danisoft.dslib.*"
	import="net.danisoft.wazetools.*"
%><%!
	private static final String PAGE_Title = AppCfg.getAppName();
	private static final String PAGE_Keywords = "Waze, Tools, Script, Wme";
	private static final String PAGE_Description = AppCfg.getAppAbstract();
%>
<!DOCTYPE html>
<html>

<head>

	<jsp:include page="../_common/head.jsp">
		<jsp:param name="PAGE_Title" value="<%= PAGE_Title %>"/>
		<jsp:param name="PAGE_Keywords" value="<%= PAGE_Keywords %>"/>
		<jsp:param name="PAGE_Description" value="<%= PAGE_Description %>"/>
	</jsp:include>

	<style>
		.DS-back-waze {
			background-color: #92c3d2;
		}
	</style>

</head>

<body>

	<jsp:include page="../_common/header.jsp" />

	<div class="mdc-layout-grid DS-layout-body">
	<div class="mdc-layout-grid__inner">
	<div class="<%= MdcTool.Layout.Cell(12, 8, 4) %>">
<%
	////////////////////////////////////////////////////////////////////////////////////////////////////
	//
	// APPS CARDS
	//
%>
	<div class="DS-card-head">
		<div class="mdc-layout-grid__inner">
<%
			for (AppList appList : AppList.values()) {
				if (appList.isMenuShow()) {
%>
					<div class="<%= MdcTool.Layout.Cell(3, 4, 4) %> DS-padding-bottom-16px">
<%
						String htmlIconText =
							(appList.isBetaFlag() ? "<span class=\"DS-text-italic DS-text-orange\">" : "") +
							appList.getName() +
							(appList.isBetaFlag() ? "&nbsp;(beta)</span>" : "");

						String htmlTitleText =
							(appList.isBetaFlag() ? "<span class=\"DS-text-orange\">" : "") +
							appList.getDesc() +
							(appList.isBetaFlag() ? "</span>" : "");
%>
						<%= MdcTool.Layout.IconCard(
							appList.isMenuEnab(),		// isEnabled
							null,						// Div Class		
							appList.getIcon(),			// Icon Name
							appList.getHref(),			// Link HREF
							htmlIconText,				// Icon Text
							htmlTitleText,				// Title Text
							appList.getSubt(),			// Body Text
							true,						// isHeadCentered
							true						// isBodyCentered
						) %>
					</div>
<%
				}
			}
%>
		</div>
	</div>
<%
	////////////////////////////////////////////////////////////////////////////////////////////////////
	//
	// FRIENDS & DONATE CARD
	//

	final int ICON_SIZE = 24;
%>
	<div class="DS-card-foot">

		<div class="mdc-layout-grid__inner">

			<div class="<%= MdcTool.Layout.Cell(7, 8, 4) %>">
				<div class="mdc-card <%= MdcTool.Elevation.Thin() %>">

					<div class="DS-padding-4px DS-back-waze DS-border-dn">
						<div class="DS-text-big DS-text-italic DS-text-white" align="center">
							<b>Our Friends</b> - Other Waze enthusiast sites around the world
						</div>
					</div>

					<div class="DS-padding-8px">
						<div class="mdc-layout-grid__inner DS-grid-colgap-0px">
							<div class="<%= MdcTool.Layout.Cell(1, 2, 2) %> DS-text-small" align="center"><a href="https://www.wazebelgium.be/" target="_blank"><img border="0" src="../images/friends/belgium.png" width="<%= ICON_SIZE %>" height="<%= ICON_SIZE %>"><br>Belgium</a></div>
							<div class="<%= MdcTool.Layout.Cell(1, 2, 2) %> DS-text-small" align="center"><a href="https://www.wazechile.com/" target="_blank"><img border="0" src="../images/friends/chile.png" width="<%= ICON_SIZE %>" height="<%= ICON_SIZE %>"><br>Chile</a></div>
							<div class="<%= MdcTool.Layout.Cell(1, 2, 2) %> DS-text-small" align="center"><a href="http://waze.com.hr/" target="_blank"><img border="0" src="../images/friends/croatia.png" width="<%= ICON_SIZE %>" height="<%= ICON_SIZE %>"><br>Croatia</a></div>
							<div class="<%= MdcTool.Layout.Cell(1, 2, 2) %> DS-text-small" align="center"><a href="https://www.waze.hu/" target="_blank"><img border="0" src="../images/friends/hungary.png" width="<%= ICON_SIZE %>" height="<%= ICON_SIZE %>"><br>Hungary</a></div>
							<div class="<%= MdcTool.Layout.Cell(1, 2, 2) %> DS-text-small" align="center"><a href="https://www.wazeitalia.it/" target="_blank"><img border="0" src="../images/friends/italy.png" width="<%= ICON_SIZE %>" height="<%= ICON_SIZE %>"><br>Italy</a></div>
							<div class="<%= MdcTool.Layout.Cell(1, 2, 2) %> DS-text-small" align="center"><a href="https://www.waze.ro/" target="_blank"><img border="0" src="../images/friends/romania.png" width="<%= ICON_SIZE %>" height="<%= ICON_SIZE %>"><br>Romania</a></div>
							<div class="<%= MdcTool.Layout.Cell(1, 2, 2) %> DS-text-small" align="center"><a href="http://www.waze.rs/" target="_blank"><img border="0" src="../images/friends/serbia.png" width="<%= ICON_SIZE %>" height="<%= ICON_SIZE %>"><br>Serbia</a></div>
							<div class="<%= MdcTool.Layout.Cell(1, 2, 2) %> DS-text-small" align="center"><a href="http://www.waze-switzerland.ch/" target="_blank"><img border="0" src="../images/friends/switzerland.png" width="<%= ICON_SIZE %>" height="<%= ICON_SIZE %>"><br>Switzerland</a></div>
							<div class="<%= MdcTool.Layout.Cell(2, 4, 2) %> DS-text-small" align="center"><a href="https://www.waze.com/" target="_blank"><img border="0" src="../images/friends/world.png" width="<%= ICON_SIZE %>" height="<%= ICON_SIZE %>"><br>Waze Home</a></div>
							<div class="<%= MdcTool.Layout.Cell(2, 4, 2) %> DS-text-small" align="center">
								<%= MdcTool.Button.TextIconOutlined(
									"add_circle",
									"&nbsp;New",
									null,
									"onclick=\"ShowDialog_OK('Add a site to our friends list', '<div align=center>Please send the request<br>with all the necessary data<br>by e-mail to:<br><br><b>dev</b>[at]<b>waze</b>[dot]<b>tools</b></div>', 'OK');\"",
									""
								) %>
							</div>
						</div>
					</div>

				</div>
			</div>

			<div class="<%= MdcTool.Layout.Cell(5, 8, 4) %>">
				<div class="mdc-card <%= MdcTool.Elevation.Thin() %>">

					<div class="DS-padding-4px DS-back-waze DS-border-dn">
						<div class="DS-text-big DS-text-italic DS-text-white" align="center">If you like our apps...</div>
					</div>

					<div class="DS-padding-10px">
						<div class="mdc-layout-grid__inner DS-grid-colgap-0px">
							<div class="<%= MdcTool.Layout.Cell(9, 6, 3) %>">
								<div>Maintaining servers and bandwidth costs money...</div>
								<div>Please donate few dollars to help us. Thank You!</div>
							</div>
							<div class="<%= MdcTool.Layout.Cell(3, 2, 1) %> DS-text-small" align="right">
								<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank" style="margin: 0px">
									<input type="hidden" name="cmd" value="_donations" />
									<input type="hidden" name="business" value="YMGN64TRPSUL6" />
									<input type="hidden" name="item_name" value="Waze.Tools Support" />
									<input type="hidden" name="currency_code" value="EUR" />
									<%= MdcTool.Button.SubmitTextIconOutlinedClass(
										"monetization_on",
										"&nbsp;DONATE!",
										null,
										"DS-text-green",
										"DS-text-green",
										""
									) %>
								</form>
							</div>
						</div>
					</div>

				</div>
			</div>
			
		</div>
	</div>

	</div>
	</div>
	</div>

	<jsp:include page="../_common/footer.jsp">
		<jsp:param name="RedirectTo" value=""/>
	</jsp:include>

</body>
</html>
