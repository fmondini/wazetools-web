<%@ page
	language="java"
	contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"
	import="net.danisoft.dslib.*"
	import="net.danisoft.wazetools.*"
%>
<%!
	private static final String PAGE_Title = "Login Help";
	private static final String PAGE_Keywords = "";
	private static final String PAGE_Description = "";
%>
<!DOCTYPE html>
<html>
<head>
	<jsp:include page="../_common/head.jsp">
		<jsp:param name="PAGE_Title" value="<%= PAGE_Title %>"/>
		<jsp:param name="PAGE_Keywords" value="<%= PAGE_Keywords %>"/>
		<jsp:param name="PAGE_Description" value="<%= PAGE_Description %>"/>
	</jsp:include>
</head>

<body>

	<jsp:include page="../_common/header.jsp" />

	<div class="mdc-layout-grid DS-layout-body">
	<div class="mdc-layout-grid__inner">
	<div class="<%= MdcTool.Layout.Cell(12, 8, 4) %>">

		<div class="DS-padding-updn16px">
			<div class="mdc-layout-grid__inner">
				<div class="<%= MdcTool.Layout.Cell(2, 1, 4) %>"></div>
				<div class="<%= MdcTool.Layout.Cell(8, 6, 4) %>">
					<div class="DS-padding-24px DS-back-pastel-yellow DS-border-full" align="center">
						<table class="TableSpacing_0px">
							<tr>
								<td class="DS-text-extra-large DS-padding-updn-8px" align="center" ColSpan="2">
									If you can't log in to <%= AppCfg.getAppName() %>...
								</td>
							</tr>
							<tr>
								<td class="DS-padding-4px DS-text-big DS-text-bold">&#9312;</td>
								<td class="DS-padding-4px DS-text-big"><a href="https://wazeitalia.slack.com/app_redirect?channel=C02B78XNVJ7" target="_blank">Ask for support in our Slack Channel</a></td>
							</tr>
							<tr>
								<td class="DS-padding-4px DS-text-big DS-text-bold">&#9313;</td>
								<td class="DS-padding-4px DS-text-big"><a href="slack://user?team=T03A6H2B2&id=U03AA2A45">Try contacting me via Slack Direct Message</a></td>
							</tr>
							<tr>
								<td class="DS-padding-4px DS-text-big DS-text-bold">&#9314;</td>
								<td class="DS-padding-4px DS-text-big">Try contacting me via email at dev [at] waze [dot] tools</td>
							</tr>
							<tr>
								<td class="DS-padding-4px DS-text-large">&nbsp;</td>
								<td class="DS-padding-4px DS-text-large DS-text-italic">...and, as a last resort:</td>
							</tr>
							<tr>
								<td class="DS-padding-4px DS-text-big DS-text-bold">&#9315;</td>
								<td class="DS-padding-4px DS-text-big">Send a carrier pigeon with the message tied to its leg to our HQ</td>
							</tr>
						</table>
					</div>
				</div>
				<div class="<%= MdcTool.Layout.Cell(2, 1, 4) %>"></div>
			</div>
		</div>

	</div>
	</div>
	</div>

	<jsp:include page="../_common/footer.jsp" />

</body>
</html>
