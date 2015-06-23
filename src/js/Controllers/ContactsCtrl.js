angular.module('contacts',['uiGmapgoogle-maps'])
    .controller('ContactsCtrl', ['$scope',
    function($scope){
        $scope.map = {
            center: {
                latitude: 49.441965,
                longitude: 32.061305
            },
            zoom: 16
        };


        $scope.marker = {
            id: 0,
            coords: {
                latitude: 49.441965,
                longitude: 32.061305
            },
            options: {
                draggable: false,
                labelContent: "<span>Черкаський драматичний театр імені Т. Г. Шевченка</span>18000, м. Черкаси, бул. Шевченко, 234",
                labelAnchor: "75 135",
                labelClass: "address-label"
            },
            events: {

            }
        };
    }
]);
