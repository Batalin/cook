angular.module('app', ['ngResource', 'ngRoute']);

angular.module('app').config(function($routeProvider, $locationProvider) {
    var routeRoleChecks = {
        admin: {auth: function(chAuth) {
            return chAuth.authorizeCurrentUserForRoute('admin')
        }},
        user: {auth: function(chAuth) {
            return chAuth.authorizeAuthenticatedUserForRoute()
        }}
    }

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
    $routeProvider
        .when('/', { templateUrl: '/partials/main/main', controller: 'chMainCtrl'})
        .when('/admin/users', { templateUrl: '/partials/admin/user-list',
            controller: 'chUserListCtrl', resolve: routeRoleChecks.admin
        })
        .when('/signup', { templateUrl: '/partials/account/signup', controller: 'chSignupCtrl'})
        .when('/profile', { templateUrl: '/partials/account/profile',
            controller: 'chProfileCtrl', resolve: routeRoleChecks.user
        })
        .when('/recipes/new', {templateUrl: '/partials/recipe/new', controller: 'chRecipeNew'})
        .when('/recipes', { templateUrl: '/partials/recipe/recipes', controller: 'chRecipeCtrl'})
        .when('/recipes/:id', { templateUrl: '/partials/recipe/recipe-details', controller: 'chRecipeDetailsCtrl'});

});

angular.module('app').run(function($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function(evt, current, previous, rejection) {
        if(rejection === 'not authorized') {
            $location.path('/');
        }
    })
})

