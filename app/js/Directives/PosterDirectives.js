
angular.module('posterDirectives', [])
    .directive('thPosterCalendar', ['apiGet', '$compile', function(apiGet, $compile){
        return {
            restrict: 'E',
            templateUrl: "views/Poster/Directives/thCalendarView.html",
            scope: {
                monthl: "=",
                yearl: "="
            },
            link: function(scope, element, attrs){
                var el = element;

                function genCalendar(month, year) {
                    var dd = [];
                    var Dlast = new Date(year, (month + 1), 0).getDate(),
                        D = new Date(year, month, Dlast),
                        DNlast = new Date(D.getFullYear(),D.getMonth(),Dlast).getDay(),
                        DNfirst = new Date(D.getFullYear(),D.getMonth(),1).getDay(),
                        calendarHeadr = '<table id="calendar2" class="theatre-poster-calendar"><thead><tr><td>Пн<td>Вт<td>Ср<td>Чт<td>Пт<td>Сб<td>Вс<tbody>',
                        calendar = '<tr>',
                        calendarFooter = '</table>',
                        i = 0;

                    calendar = calendarHeadr + calendar;
                    var prDlast = new Date(year, month, 0).getDate();

                    if (DNfirst != 0) {
                        var i = 0,
                            j = prDlast - (DNfirst - 2);
                        for(i = 1, j; i < DNfirst; i++, j++) {
                            calendar += '<td style="color: lightgray;">' + j;  // пустые ячейки до начала месяца
                        }

                    } else {
                        var i = 0,
                            j = prDlast - 5;
                        for(i = 0, j; i < 6; i++, j++) {
                            calendar += '<td style="color: lightgray;">' + j;  // пустые ячейки до начала месяца
                        }
                    }
                    var i = 0;
                    for(i = 1; i <= Dlast; i++) {
                        if (i == new Date().getDate() && D.getFullYear() == new Date().getFullYear() && D.getMonth() == new Date().getMonth()) {
                            calendar += '<td class="today">' + i;    ///   today
                        }else{
                            if (dd.indexOf(i) != -1) {
                                calendar += '<td>' + i + "<br> <a href='#' class='dd'>TTT</a> ";   //   other days
                            } else {
                                calendar += '<td>' + i;   //   other days
                            }
                        }

                        if (new Date(D.getFullYear(),D.getMonth(),i).getDay() == 0) {
                            calendar += '<tr>';  //  воскресенье
                        }
                    }
                    var i = 0,
                        nw = 0;

                    if (DNlast != 0 ) {
                        for (i = DNlast; i < 7; i++) {
                            calendar += '<td style="color: lightgray;">' + (++nw);  //  оставшиеся пустые ячейки в месяце
                        }
                    }

                    calendar = calendar + calendarFooter;

                    return calendar;
                }

                scope.$watch('monthl', function(){

                    var generetedCalendar = genCalendar(scope.monthl, scope.yearl);
                    var calendarHtml = angular.element(generetedCalendar);
                    $compile(calendarHtml)(scope);
                    element.html(calendarHtml);

                }, true);

                //apiGet('2014-11.json').success(function(data){
                //    scope.evz = data;
                //});

            }
        }
    }])
    .directive('swCalendarDate', [function(){
        return {
            restrict: "E",
            templateUrl: "views/Poster/Directives/switchCalDateView.html",
            scope: {},
            link: function(scope) {

                var monthN = ["month.Jan", "month.Feb", "month.Mar", "month.Apr", "month.May", "month.Jun", "month.Jul", "month.Aug", "month.Sept", "month.Oct", "month.Nov", "month.Dec"];
                var calendarDate = new Date();
                var monthInd;
                scope.now = calendarDate;
                scope.year = calendarDate.getFullYear();
                scope.month = calendarDate.getMonth();
                monthInd = scope.month;
                scope.monthName = monthN[(monthInd)];

                //scope.$watch('month', function(){
                //    console.info(scope.month);
                //}, true);

                scope.prevMonth = function() {
                    monthInd = scope.month;
                    scope.now = new Date(scope.year, (monthInd - 1));
                    scope.year = scope.now.getFullYear();
                    scope.month = (scope.now.getMonth());
                    monthInd = scope.month;
                    scope.monthName = monthN[(monthInd)];
                };
                scope.nextMonth = function() {
                    monthInd = scope.month;
                    scope.now = new Date(scope.year, (monthInd + 1));
                    scope.year = scope.now.getFullYear();
                    scope.month = (scope.now.getMonth());
                    monthInd = scope.month;
                    scope.monthName = monthN[(monthInd)];
                }
            }
        }
    }]);
