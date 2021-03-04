import moment from 'moment';

type Opts = {
    useAgoForRecent?: boolean
}

export const formatTimestamp = (timestamp: number, opts: Opts={}) => {
    const x = new Date(timestamp * 1000);
    const elapsed = Number(new Date()) - Number(x)
    if ((opts.useAgoForRecent) && (elapsed < 1000 * 60 * 24)) {
        return moment(x).fromNow()
    }
    return moment(x).format('MM/DD/YYYY HH:mm:ss')
}