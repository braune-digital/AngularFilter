import { Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Filter } from './filter/filter';
import { Ordering } from './filter/order';
import { AndFilter } from './filter/types/and.filter';
import { FilterComponent } from '../components/filter/filter.component';
import { ParamFilter } from './paramfilter.class';
import { ApiRequestService } from './abstracts/abstract-api-request.service';

export class StatisticFilter extends ParamFilter {

    protected body: object;

    constructor(requestUrl: string, api: ApiRequestService, withScope?: boolean, body?: object) {
        super(requestUrl, api, withScope);
        if (body) {
            this.body = body;
        }
    }

    public refreshPromise(): Observable<any> {
        this.api.buildHeaders(this.withScope);
        return this.api.http.post(
            this.api.baseUrl() + this.requestUrl,
            this.body,
            {
                headers: this.api.headers,
                search: this.build()
            }
        ).map((response: Response) => {
            return response.json();
        })
            .catch((err: Response) => this.api.handleError(err));
    }
}
