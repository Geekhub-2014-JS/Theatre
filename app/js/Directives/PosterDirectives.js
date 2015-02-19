
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

                function getMonthData(data, month, day) {
                    var templ = "<div class='th-calendar-poster'>";

                    data.forEach(function(el, arr){
                        if (el.day === day && el.month === (month + 1)) {
                            templ = templ + "<div class='th-calendar-poster-item'><span class='th-calendar-poster-descr'>" +
                            el.description + "</span><span class='th-calendar-poster-link'><a href='#' class='btn btn-default btn-xs' >link</a></span>" +
                            "<span class='th-calendar-poster-date'>" + (el.day < 10 ? "0"+el.day:el.day) + "." + (el.month < 10 ? "0"+el.month:el.month) + "." + el.year + "</span><span class='th-calendar-poster-price'>" + el.price + "</span></div>";
                        }
                    });

                    return templ + "</div>";
                }

                function genCalendar(month, year, data) {
                    var dd = [16];
                    var Dlast = new Date(year, (month + 1), 0).getDate(),
                        D = new Date(year, month, Dlast),
                        DNlast = new Date(D.getFullYear(),D.getMonth(),Dlast).getDay(),
                        DNfirst = new Date(D.getFullYear(),D.getMonth(),1).getDay(),
                        calendarHeadr = '<table id="calendar2" class="theatre-poster-calendar"><thead><tr><th>{{"day.Monday"|translate}}<th>{{"day.Tuesday"|translate}}<th>{{"day.Wednesday"|translate}}<th>{{"day.Thursday"|translate}}<th>{{"day.Friday"|translate}}<th>{{"day.Saturday"|translate}}<th>{{"day.Sunday"|translate}}<tbody>',
                        calendar = '<tr class="th-calendar-tr">',
                        calendarFooter = '</table>',
                        i = 0;

                    calendar = calendarHeadr + calendar;
                    var prDlast = new Date(year, month, 0).getDate();

                    if (DNfirst != 0) {
                        var i = 0,
                            j = prDlast - (DNfirst - 2);
                        for(i = 1, j; i < DNfirst; i++, j++) {
                            calendar += '<td style="color: lightgray;">' + '<span class="th-calendar-date-before">' + j + '</span>';  // пустые ячейки до начала месяца
                        }

                    } else {
                        var i = 0,
                            j = prDlast - 5;
                        for(i = 0, j; i < 6; i++, j++) {
                            calendar += '<td style="color: lightgray;">' + '<span class="th-calendar-date-before">' + j + '</span>';  // пустые ячейки до начала месяца
                        }
                    }
                    var i = 0;
                    for(i = 1; i <= Dlast; i++) {
                        if (i == new Date().getDate() && D.getFullYear() == new Date().getFullYear() && D.getMonth() == new Date().getMonth()) {
                            calendar += '<td class="today">' + '<span class="th-calendar-date">' + i + '</span>' + getMonthData(data, month, i);    ///   today
                        }else{
                            if (dd.indexOf(i) != -1) {
                                calendar += '<td>'  + '<span class="th-calendar-date">' + i  + '</span>' + getMonthData(data, month, i);   //   other days
                            } else {
                                calendar += '<td>' + '<span class="th-calendar-date">' + i + '</span>' + getMonthData(data, month, i);   //   other days
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
                            calendar += '<td style="color: lightgray;">' + '<span class="th-calendar-date-after">' +(++nw) + '</span>';  //  оставшиеся пустые ячейки в месяце
                        }
                    }

                    calendar = calendar + calendarFooter;

                    return calendar;
                }

                scope.$watch('monthl', function(){

                    var year = 0,
                        month = 0;

                    year = scope.yearl;
                    month = scope.monthl;

                    apiGet(""+ year + "-" + (month + 1) + ".json").success(function(data){
                        if (data instanceof Array) {
                            var generetedCalendar = genCalendar(scope.monthl, scope.yearl, data);
                            var calendarHtml = angular.element(generetedCalendar);
                            $compile(calendarHtml)(scope);
                            element.html(calendarHtml);
                        } else {
                            var generetedCalendar = genCalendar(scope.monthl, scope.yearl, []);
                            var calendarHtml = angular.element(generetedCalendar);
                            $compile(calendarHtml)(scope);
                            element.html(calendarHtml);
                            console.log('bad request');
                        }
                    });
                }, true);
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
