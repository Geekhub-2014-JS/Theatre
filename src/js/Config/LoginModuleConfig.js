angular.module('login')
    .config( function( $facebookProvider ) {
        $facebookProvider.setAppId('1835003956748098');
        $facebookProvider.setCustomInit({
            version: 'v2.1'
        });

        $facebookProvider.setPermissions('email');

    })
    .run( function( $rootScope ) {
        (function(){
            if (document.getElementById('facebook-jssdk')) {return;}
            var firstScriptElement = document.getElementsByTagName('script')[0];
            var facebookJS = document.createElement('script');
            facebookJS.id = 'facebook-jssdk';
            facebookJS.src = '//connect.facebook.net/en_US/all.js';
            firstScriptElement.parentNode.insertBefore(facebookJS, firstScriptElement);
        }());
    })