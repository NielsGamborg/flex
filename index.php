<!DOCTYPE html>
<html ng-app="flex">
<head>
	<title ng-bind="'Flex - ' + title"></title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.7/angular.min.js"></script>	
	<script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.7/angular-route.js"></script>
	<!--<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.7/angular-animate.js"></script>-->	
	<link type="text/css" href="flex.css" rel="stylesheet">
</head>

<body>
	
	<wrapper-box></wrapper-box>	

		
	<div id="spinner">Loading...</div>		
	<div id="overlay" onclick="$('#overlay, .modal').fadeOut(100);$('.blur').removeClass('blur')"></div>	
	<script src="js/app.js" ></script>	
</body>
</html>