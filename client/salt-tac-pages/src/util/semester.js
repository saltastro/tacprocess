import moment from 'moment';
import * as _ from 'lodash';

/**
 * The semester in which a given date lies.
 *
 * Semesters are a string of the form "yyyy-s", where yyy is the year and s the semester. The first semester in a year
 * runs from 1 May to 31 October, the second semester from 1 November to 30 April. For example, the semesters for 13
 * March 2017, 5 July 2017 and 30 December 2017 are "2016-2", "2017-1" and "2017-2", respectively.
 *
 * Parameters:
 *
 * date: Moment.js date (optional)
 *     The date. If no date is given, the current date is assumed. The time is ignored.
 */
export function semesterFor(date) {
    if (!date) {
        date = moment();
    }

    let year = date.year();
    const month = date.month();

    let semester;
    if (month < 4) {
        year -= 1;
        semester = 2;
    } else if (month < 10) {
        semester = 1;
    } else {
        semester = 2;
    }

    return `${year}-${semester}`;
}

/**
 * The default semester to use for a given date. This is the current semester for the date plus three months.
 *
 * For example, the default semester for 17 September 2017 is '2017-2', because 17 December 2017 lies in the 2017-2
 * semester.
 *
 * Parameters:
 *
 * date: Moment.js date (optional)
 *     The date. If no date is given, the current date is assumed. The time is ignored.
 * */
export function defaultSemester(date) {
    if (!date) {
        date = moment();
    }

    const dateInThreeMonths = date.add(3, 'months');

    return semesterFor(dateInThreeMonths);
}

/**
 * The list of semesters including the previous four, the current and the next five semesters.
 */
export function semesterList() {
    const semestersBefore = 4;
    const semestersAfter = 5;

    const current = semesterFor();
    const [currentYear, currentSemester] = current.split('-');

    function* semesterGenerator(ascending=true) {
        let year = parseInt(currentYear, 10);
        let semester = parseInt(currentSemester, 10);

        while (true) {
            if (ascending) {
                year = semester === 1 ? year : year + 1;
            } else {
                year = semester === 1 ? year - 1 : year;
            }
            semester = semester === 1 ? 2 : 1;

            yield `${year}-${semester}`;
        }
    }

    const beforeGenerator = semesterGenerator(false);
    const before = _.range(0, semestersBefore).map(() => beforeGenerator.next().value);
    const afterGenerator = semesterGenerator(true);
    const after = _.range(0, semestersAfter).map(() => afterGenerator.next().value);

    return [...before.reverse(), current, ...after];
}