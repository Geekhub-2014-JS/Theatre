
angular.module('posterDirectives', [])
    .directive('thPosterCalendar', ['apiGet', '$compile', '$stateParams', function(apiGet, $compile, $stateParams){
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
                    var templ = "";

                    data.forEach(function(el){
                        if (parseInt(el.day) === day && parseInt(el.month) === (month + 1)) {

                            templ = templ +
                                //"<div class='th-calendar-poster-item'>" +
                            "<img src='http://api.theatre.pp.ua" + el.performance.mainPicture.default_big.url + "' >" +
                            "<a href='" + $stateParams.locale + "/performance/" + el.performance.slug + "' title='" + el.performance.description + "' class='th-calendar-poster-link'>" +
                            "<span class='th-calendar-poster-title'>" + el.performance.title + "</span>" +
                            "<span class='th-calendar-poster-time'>" + el.time + "</span>" +
//                                    "<div class='th-calendar-poster-date'>" + (el.day < 10 ? "0" + el.day : el.day) + "." + (el.month < 10 ? "0"+el.month:el.month) + "." + el.year + "</div>" +
                            "</a>";

                        }
                    });

                    return templ ;
                    //return templ + "</div>";
                }

                function genCalendar(month, year, data) {
                    var dd = [16];
                    var Dlast = new Date(year, (month + 1), 0).getDate(),
                        D = new Date(year, month, Dlast),
                        DNlast = new Date(D.getFullYear(),D.getMonth(),Dlast).getDay(),
                        DNfirst = new Date(D.getFullYear(),D.getMonth(),1).getDay(),
                        calendarHeadr = '<table id="calendar" class="theatre-poster-calendar"><thead><tr><th>{{"day.Monday"|translate}}<th>{{"day.Tuesday"|translate}}<th>{{"day.Wednesday"|translate}}<th>{{"day.Thursday"|translate}}<th>{{"day.Friday"|translate}}<th>{{"day.Saturday"|translate}}<th>{{"day.Sunday"|translate}}<tbody>',
                        calendar = '<tr>',
                        calendarFooter = '</table>',
                        i = 0;

                    calendar = calendarHeadr + calendar;
                    var prDlast = new Date(year, month, 0).getDate();

                    if (DNfirst != 0) {
                        var i = 0,
                            j = prDlast - (DNfirst - 2);
                        for(i = 1, j; i < DNfirst; i++, j++) {
                            calendar += '<td class="prev-month-day">' + '<span class="th-calendar-date-before">' + j + '</span>' + getMonthData(data, (month - 1), j);  // пустые ячейки до начала месяца
                        }

                    } else {
                        var i = 0,
                            j = prDlast - 5;
                        for(i = 0, j; i < 6; i++, j++) {
                            calendar += '<td class="prev-month-day">' + '<span class="th-calendar-date-before">' + j + '</span>' + getMonthData(data, (month - 1), j);  // пустые ячейки до начала месяца
                        }
                    }
                    var i = 0;
                    for(i = 1; i <= Dlast; i++) {
                        if (i == new Date().getDate() && D.getFullYear() == new Date().getFullYear() && D.getMonth() == new Date().getMonth()) {
                            calendar += '<td class="this-month-day today">' + '<span class="th-calendar-date">' + i + '</span>' + getMonthData(data, month, i);    ///   today
                        }else{
                            calendar += '<td class="this-month-day">' + '<span class="th-calendar-date">' + i + '</span>' + getMonthData(data, month, i);   //   other days
                        }

                        if (new Date(D.getFullYear(),D.getMonth(),i).getDay() == 0) {
                            calendar += '<tr>';  //  воскресенье
                        }
                    }
                    var i = 0,
                        nw = 0;

                    if (DNlast != 0 ) {
                        for (i = DNlast; i < 7; i++) {
                            calendar += '<td class="next-month-day">' + '<span class="th-calendar-date-after">' + (++nw) + '</span>' + getMonthData(data, (month + 1), (nw));  //  оставшиеся пустые ячейки в месяце
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

                    var yearL = year;
                    var monthL = month;
                    var toDate = moment(yearL+'-'+(monthL + 1), 'YYYY-M').add(1, 'months').add(7, 'days');
                    var fromDate = moment(yearL+'-'+(monthL + 1), 'YYYY-M').subtract(7, 'days');
                    var url = 'performanceevents.json?fromDate=' + fromDate.format('DD-MM-YYYY') + '&toDate=' + toDate.format('DD-MM-YYYY');

                    apiGet(url).success(function(data, status){
                        if (status == 200) {
                            var generetedCalendar = genCalendar(scope.monthl, scope.yearl, data.performance_events);
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
