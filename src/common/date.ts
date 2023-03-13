import * as moment from 'moment';

export const Now = () => {
    return moment();
};

export const toFormat = (date: Date, format: string) => {
    return moment(date).format(format);
};
