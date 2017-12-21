// -----------------------------------------------------------------------------------------------------
// COUNTDOWN
// -----------------------------------------------------------------------------------------------------

var ctd = document.getElementById('countdown');

countdown();

function countdown() {
    // ATTENTION - Ianuary is 0, February is 1 ......
    var launch_date = new Date(Date.UTC(2018, 7, 1, 0, 0));
    var days;
    var hours;
    var minutes;
    var seconds;
    var rest;
    var now = new Date();

    seconds = rest = Math.floor(((launch_date.getTime() - now.getTime()) / 1000));

    days = zero(Math.floor(seconds / 86400));
    seconds -= days * 86400;

    hours = zero(Math.floor(seconds / 3600));
    seconds -= hours * 3600;

    minutes = zero(Math.floor(seconds / 60));
    seconds -= minutes * 60;

    seconds = zero(Math.floor(seconds));

    function zero(n) {
        return (n < 10 ? '0' : false) + n;
    }

    rest <= 0 ? days = hours = minutes = seconds = '00' : setTimeout(countdown, 1000);

    ctd.innerHTML =
        '<li>' + days + '<br /><small>Days</small>' + (days > 1 ? '' : '') + '</li>' +
        '<li>' + hours + '<br /><small>Hours</small>' + (hours > 1 ? '' : '') + '</li>' +
        '<li>' + minutes + '<br /><small>Minutes</small>' + (minutes > 0 ? '' : '') + '</li>' +
        '<li>' + seconds + '<br /><small>Seconds</small>' + (seconds > 1 ? '' : '') + '</li>';
}
