import moment from 'moment';
import MockDate from 'mockdate';

import { defaultSemester, semesterFor, semesterList } from './semester';

const checkSemesterFor = (date, expected) => {
    return expect(semesterFor(moment(date))).toEqual(expected);
};

describe('semesterFor', () => {
    afterEach(() => {
        MockDate.reset();
    });

    it('should return the semester', () => {
        checkSemesterFor('2017-03-13', '2016-2');
        checkSemesterFor('2017-07-05', '2017-1');
        checkSemesterFor('2017-12-31', '2017-2');

        checkSemesterFor('2018-04-30T23:59:59', '2017-2');
        checkSemesterFor('2018-05-01T00:00:00', '2018-1');
        checkSemesterFor('2018-10-31T23:59:59', '2018-1');
        checkSemesterFor('2018-11-01T00:00:00', '2018-2');
    });

    it('should use the current date', () => {
        MockDate.set(moment('2017-04-30T23:59:59'));
        expect(semesterFor()).toEqual('2016-2');

        MockDate.set(moment('2017-05-01T00:00:00'));
        expect(semesterFor()).toEqual('2017-1');
    })
});

const checkDefaultSemester = (date, expected) => {
    return expect(defaultSemester(moment(date))).toEqual(expected);
};

describe('defaultSemester', () => {
    afterEach(() => {
        MockDate.reset();
    });

    it('should return the default semester', () => {
        checkDefaultSemester('2017-03-13', '2017-1');
        checkDefaultSemester('2017-07-05', '2017-1');
        checkDefaultSemester('2018-10-31', '2018-2');

        checkDefaultSemester('2017-01-31T23:59:59', '2016-2');
        checkDefaultSemester('2017-02-01T23:59:59', '2017-1');
        checkDefaultSemester('2017-07-31T23:59:59', '2017-1');
        checkDefaultSemester('2017-08-01T00:00:00', '2017-2');
    });

    it('should use the current date', () => {
        MockDate.set(moment('2017-01-31T23:59:59'));
        expect(defaultSemester()).toEqual('2016-2');

        MockDate.set(moment('2017-02-01T00:00:00'));
        expect(defaultSemester()).toEqual('2017-1');
    });
});

describe('semesterList', () => {
    it('should return the semester list', () => {
        MockDate.set(moment('2017-02-25'));
        expect(semesterList()).toEqual(
                ['2014-2', '2015-1', '2015-2', '2016-1', '2016-2', '2017-1', '2017-2', '2018-1', '2018-2', '2019-1']
        );

        MockDate.set(moment('2017-06-01'));
        expect(semesterList()).toEqual(
                ['2015-1', '2015-2', '2016-1', '2016-2', '2017-1', '2017-2', '2018-1', '2018-2', '2019-1', '2019-2']
        );
    })
});
