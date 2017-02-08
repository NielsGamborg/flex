var app = angular.module('flex', ['ngRoute']);

app.config(['$routeProvider',function($routeprovider){
	$routeprovider
	.when('/',{	
		redirectTo: '/inout'
	})
	.when('/inout',{	
		title: 'Ind og udstemplinger',
		template: '<inout-data-box></inout-data-box>'
	})
	.when('/all',{	
		title: 'Alle stemplinger',
		template: '<all-data-box></all-data-box>'
	})
	.otherwise({
		redirectTo: '/inout'
	});
}]);

/* Showing dynamic title */
app.run(['$rootScope', function($rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
    });
}]);


app.service('GetSpotData', function ($http, SpinnerService) {
	return {
		getData: function(type,initials) {
			if(type == "inout"){
				params = {initials : initials, type : type};
			}
			if(type == "all"){
				params = {initials : initials, type : type};
			}
			SpinnerService.startSpinner();
			return $http({
				method: 'GET',
				params: params,
				url: 'getData.php'
			})
		}
	};
});


app.service('SpinnerService', function ($timeout, $route, $window) {
	return {
		startSpinner: function() {
			angular.element("#spinner, #overlay").show();
			var thisService = this; //setting var because "this" doesn't work inside the timeout function
			spinnerTimer = $timeout(function() {
				if(angular.element("#spinner").is(":visible")){		
					//thisService.stopSpinner();
					angular.element("#spinner").html('An error occurred! <br>Please reload or wait 5 secs for auto reload!');
					angular.element("#spinner").addClass('error');
						$timeout(function() {
							thisService.stopSpinner();
							//$route.reload();
							$window.location.reload();
						},5000);
				}
			},5000);
		},
		stopSpinner: function() {
			$timeout.cancel(spinnerTimer); // Canceling timeout from above function 
			angular.element("#spinner, #overlay").hide();
		}
	};
});

app.directive('wrapperBox',function() {
	return {
		restrict: 'E', 	
		scope: {},	
		templateUrl: 'js/wrapperbox.html',
		link: function(scope, element, attrs){
			var activePage = angular.element(location).attr('hash').substring(2);
			if(activePage == ""){
				 activePage = "inout";
			}
			angular.element(document).ready(function () {
				$('#menu' + activePage).addClass('active');
            });
		},
		controller: function($scope) {	
			$scope.menu = function(page){
				angular.element('#menu li a').removeClass('active');	
				angular.element('#' + page).addClass('active');	
			}		
		}
	}
});

app.directive('inoutDataBox',function() {
	return {
		restrict: 'E', 	
		scope: {},	
		templateUrl: 'js/inoutbox.html',	
		controller: function($scope, GetSpotData, SpinnerService) {
			$scope.showpunches = 50;
			$scope.punchtype = '';
			$scope.callGetSpotData = function(initials){
				$scope.initials = initials;
				GetSpotData.getData("inout",initials).then(function(response) { 
					//console.log('response.data',response.data);
					$scope.punches = response.data;
					SpinnerService.stopSpinner();
					$scope.statsArray = [];
					angular.forEach($scope.punches, function(value,key){ //making array with all terminal names
						$scope.statsArray.push(value.terminalName);								
					});
					$scope.count = {};
					$scope.statsArray.forEach(function(i) { $scope.count[i] = ($scope.count[i]||0)+1;  }); // making object with counts for all teminal names
					console.log('$scope.count: ', $scope.count);					
				}, function(response) {
					console.log("Error: ", response)
				});
			}
			$scope.callGetSpotData('nig');			
		}
	}
});

app.directive('allDataBox',function() {
	return {
		restrict: 'E', 	
		scope: {},	
		templateUrl: 'js/allbox.html',	
		controller: function($scope, GetSpotData, SpinnerService) {
			$scope.showpunches = 200;
			$scope.punchtype = '';
			$scope.callGetSpotData = function(initials){
				$scope.initials = initials;	
				GetSpotData.getData("all",initials).then(function(response) { 
					//console.log('response.data',response.data);
					$scope.punches = response.data;
					SpinnerService.stopSpinner();
					$scope.statsArray = [];
					angular.forEach($scope.punches, function(value,key){ //making array with all terminal names
						$scope.statsArray.push(value.terminalName);								
					});
					$scope.count = {};
					$scope.statsArray.forEach(function(i) { $scope.count[i] = ($scope.count[i]||0)+1;  }); // making object with counts for all teminal names					
				}, function(response) {
					console.log("Error: ", response)
				});
			}
			$scope.callGetSpotData('nig');				
		}
	}
});


/* Animated scroll directive */
app.directive('scrollTop', function() {
	return {
		restrict: 'A', 	
		scope: {},	
		template: '<div>{{ text }}</div>',
		link:function($scope, element, attrs){
			var target = $(attrs.scrolltarget);
			$scope.text = attrs.scrolltext;
			element.on('click', function() {
				$('html').animate({scrollTop: $(attrs.scrolltarget).offset().top}, 400);
			});
		},
		controller: function($scope){}	
	}
});