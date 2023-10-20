var app = angular.module("travelNow", ["ngRoute"]);

app.controller('myController', function ($scope) {

    $scope.message = "TRAVEL NOW !!!";

});
app.controller('HomeController', function ($scope) {
    $scope.message = "Welcome to the Home Page!";

    // $scope.destinations = ["Destination 1", "Destination 2", "Destination 3"];
});


app.controller("AboutController", function ($scope) {
    $scope.message = "This is the About Page.";
});
app.directive("destinationList", function () {
    return {
        restrict: 'E',
        scope: {
            destinations: '=' // Two-way binding
        },
        // template: 
        // <ul><li ng-repeat="destination in destinations">{{ destination }}</li></ul>
    };
})
// app.directive =>method to create custom directive

app.directive("departure", function () {
    return {
        //  ELEMENT DIRECTIVE  --- (1)

        //   restrict => specifies how the directive can be used in your HTML

        restrict: "E", // Element

        //  template => HTML content

        template: "<div>Explore our beautiful travel destinations!</div>",

        link: function (scope, element, attrs) {
            // ATTRIBUTE DIRECTIVE --- (2)

            element.css("color", "Red");
        },
    };
});

// CLASS DIRECTIVE

app.directive("toggleClass", function () {
    return {
        restrict: "C", // Class

        link: function (scope, element, attrs) {
            var isBlue = false;

            element.on("click", function () {
                if (isBlue) {
                    element.css("color", "red");
                } else {
                    element.css("color", "blue");
                }

                isBlue = !isBlue;
            });
        },
    };
});

app.directive("multiElement", function () {
    return {
        restrict: "C", // Class

        link: function (scope, element, attrs) {
            element.css("color", "Purple");
        },
    };
});

app.component("headerComponent", {
    templateUrl: "header.html", // Create a separate HTML file for the header

    controller: function () {
        // Controller logic for the header component

        this.title = "TravelNow"; // Sample title

        this.isAuthenticated = false; // Sample authentication status

        this.logout = function () {
            // Implement logout logic here

            this.isAuthenticated = false;
        };
    },
});
// app.controller("welcomeController", function ($scope, UserService) {
//     $scope.welcomeMessage = "Welcome, " + UserService.getEmail() + "!";
// });

app.controller("welcomeController", function ($scope, $routeParams) {
    $scope.students = [
		{name: 'Mark Waugh', city:'New York'},
		{name: 'Steve Jonathan', city:'London'},
		{name: 'John Marcus', city:'Paris'}
	];

	$scope.message = "Click on the hyper link to view the students list.";
});




app.controller("loginController", function ($scope, $location) {
           
$scope.authenticate = function (email) {
    // write authentication code here.. 

    $location.path('/welcome/' + email)
};

});
// app.controller('LoginController', function ($scope, $location, UserService) {

//     $scope.user = {
//         email: '',
//         password: ''
//     };

//     $scope.isLoggedIn = false;

//     $scope.login = function () {

//         if ($scope.user.email === 'user@example.com' && $scope.user.password === 'password') {
//             UserService.setEmail($scope.user.email);
//             console.log("username & password given")
//             $location.path("/welcome");
//             console.log("location")
//         } else {
//             alert("Invalid credentials");
//         }
//     };
// });

app.service("UserService", function () {
    var email = "";

    this.setEmail = function (userEmail) {
        email = userEmail;
    };

    this.getEmail = function () {
        return email;
    };
});
app.config(function ($routeProvider) {
    $routeProvider

        .when("/", {
            templateUrl: "index.html",
            controller: "HomeController",
        })

        .when("/login", {
            templateUrl: "login.html",
            controller: "loginController",
        })
        .when("/welcome", {
            templateUrl: "welcome.html",
            controller: "welcomeController"
        })
        .when("/about", {
            templateUrl: "about.html",
            controller: "AboutController",
        })
        .when("/destinations", {
            templateUrl: "destinations.html",
            controller: "HomeController", 
        })
       


        .otherwise({
            redirectTo: "/",
        });
});
