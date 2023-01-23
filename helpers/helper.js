import { formatDistance, subDays } from 'date-fns'
const helper = {
    name: 'helper',
    getDuration(from, to) {
        var date1 = new Date(from);
        var date2 = new Date(to);
        console.log(date1)
        console.log(date2)
        console.log(formatDistance(date2, date1, { addSuffix: true }))
        return formatDistance(date2, date1, { addSuffix: true })

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