angular.module('poster',['ui.calendar'])
    .controller('PosterCtrl', ['$scope', '$http', 'posters', 'apiGet',
    function($scope, $http, posters, apiGet){

        //$scope.events = [
        //    {title: 'Момент 2',                 start: '2015-01-31 15:25',  allDay: false, price: '155 грн.'},
        //    {title: 'Сільва',                   start: '2015-01-30 10:05',  allDay: false, price: '107 грн.'},
        //    {title: 'Кайдашева сімя',           start: '2015-01-31 19:10',  allDay: false, price: '22 uhy' },
        //    {title: 'Сватання на Гончарівці',   start: '2015-01-29 2:40',   allDay: false, url: 'http://google.com', price: '10 грн.'}
        //    //{title: 'All Day Event',start: new Date(y, m, 1)},
        //    //{title: 'Long Event',start: new Date(y, m, d - 5),end: new Date(y, m, d - 2)},
        //    //{title: '2 Repeating Event',start: new Date(y, m, d - 3, 16, 0),allDay: false},
        //    //{title: '3 Repeating Event',start: new Date(y, m, d + 4, 16, 0),allDay: false},
        //    //{title: 'Birthday Party',start: new Date(y, m, d + 1, 19, 0),end: new Date(y, m, d + 1, 22, 30),allDay: false},
        //    //{title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
        //];

        //$scope.eventSources = [];

        $scope.events = [];
        $http.get('backend/2015-02.json').success(function(data) {
            for(var i=0;i<data.length;i++) {
                $scope.events.push({
                    title: data[i].title,
                    allDay: false,
                    start: data[i].start,
                    price: data[i].price

                });
            }
        });

        $scope.eventSources = [$scope.events];

        $scope.uiConfig = {
            calendar: {
                height: 1000,
                editable: false,
                firstDay: 1,
                timeFormat: 'HH(:mm)',
                monthNames: ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'],
                dayNamesShort: ["Неділя", "Понеділок", "Вівторок", "Середа", "Четвер", "П’ятниця", "Субота"],
                header:{
                    left: '',
                    center: 'prev, title, next',
                    right: 'today'
                }
            }
        };
        //
        $scope.extraEventSignature = function(event) {
            return event.price;
        };

        $scope.pred = function(){
            $scope.calendar.fullCalendar('prev');
            var events = [];
            var d = moment($scope.calendar.fullCalendar('getView').start).format('YYYY-MM');
            var  data = apiGet(d + '.json');
            for(var i=0;i<data.length;i++) {
                events.push({
                    title: data[i].title,
                    allDay: false,
                    start: data[i].start,
                    price: data[i].price

                });
            }
            //$scope.calendar.fullCalendar('addEventSource', events);
            $scope.eventSources.push(events);
            console.log('Date is p: ' + d);
        };

        $scope.sled = function(){
            $scope.calendar.fullCalendar('next');
            var events = [];
            var d = moment($scope.calendar.fullCalendar('getView').start).format('YYYY-MM');
            var  data = apiGet(d + '.json');
            for(var i=0;i<data.length;i++) {
                events.push({
                    title: data[i].title,
                    allDay: false,
                    start: data[i].start,
                    price: data[i].price

                });
            }
            $scope.eventSources.push(events);
            //$scope.calendar.fullCalendar('addEventSource', events);
            console.log('Date is s: ' + d);

        };

        $scope.reloadc = function() {
            //$scope.events.slice(0, $scope.events.length);
            $scope.calendar.fullCalendar('refetchEvents');
            $scope.calendar.fullCalendar('render');
        }

    }
]);