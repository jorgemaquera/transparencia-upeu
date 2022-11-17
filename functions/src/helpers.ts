import { isObject } from 'lodash';

export function isValidTimeStamp(value: any) {
  if (
    isObject(value) &&
    value.hasOwnProperty('_seconds') &&
    value.hasOwnProperty('_nanoseconds')
  )
    return true;
  return false;
}
