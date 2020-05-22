import { DateTime } from 'luxon';

const dateFormat = 'yyyy-MM-dd';

const jsDateToDateString = jsDate => {
  return DateTime.fromJSDate(jsDate).toFormat(dateFormat);
};

export {
  jsDateToDateString
}