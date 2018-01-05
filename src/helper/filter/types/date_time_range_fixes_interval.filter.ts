import { Filter } from '../filter';
import * as moment from 'moment';
import {Moment} from 'moment';
import {DateTimeRangeFilter} from './date_time_range.filter';

export class DateTimeRangeFixedIntervalFilter extends DateTimeRangeFilter {

  public get(): Object {
    if (this.active) {
      return {
        filter: this.type,
        property: this.property,
        min: this.min.toISOString(),
        max: this.max.toISOString()
      };
    }
    return null;
  }
}
