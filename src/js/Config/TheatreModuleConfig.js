angular.module('theatre')
    .run(['$rootScope', '$state', '$stateParams', '$translate', function ($rootScope, $state, $stateParams, $translate) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            $translate.use(toParams.locale);
            //TODO need test this $translate.refresh(toParams.locale);
        });


    }])

    .config(['$translateProvider', '$httpProvider', function ($translateProvider, $httpProvider) {
        $translateProvider.useStaticFilesLoader({
            prefix: 'translating/lang_',
            suffix: '.json'
        });

        $translateProvider.preferredLanguage('uk');
        $translateProvider.fallbackLanguage('uk');
        //$translateProvider.useLocalStorage();

        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        $httpProvider.defaults.transformRequest = function (data) {

            return angular.isObject(data) && String(data) !== '[object File]' ? angular.toParam(data) : data;
        };
    }])

    .config(function (LightboxProvider) {
        LightboxProvider.getImageUrl = function (image) {
            return image.images.reference.url;
        };
        LightboxProvider.templateUrl = 'views/Persons/gallery.html';
    });
