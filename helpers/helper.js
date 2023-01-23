
const helper = {
    name: 'helper',
    getDuration(from, to) {
        var date1 = new Date(from);
        var date2 = new Date(to);

        // To calculate the time difference of two dates
        var Difference_In_Time = date2.getTime() - date1.getTime();

        // To calculate the no. of days between two dates
        var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
        return Difference_In_Time
    },
    formatDate(val) {
        let date = new Date(val)
        let day = date.getDay()
        let month = date.getMonth()
        let year = date.getFullYear()
        return day + '.' + month + '.' + year
    }
}
export default ({ app }, inject) => {
    inject('helper', helper)
}