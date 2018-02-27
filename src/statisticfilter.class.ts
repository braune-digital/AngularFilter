import { Observable } from 'rxjs/Observable';
import { ParamFilter } from './paramfilter.class';
import { HttpClient } from '@angular/common/http';

export class StatisticFilter extends ParamFilter {

    protected body: object;

    constructor(requestUrl: string, http: HttpClient, body?: object) {
        super(requestUrl, http);
        if (body) {
            this.body = body;
        }
    }

    public refreshPromise(): Observable<any> {
        return this.http.post(this.requestUrl, this.body, {params: this.build()})
            // .catch((err: Response) => this.api.handleError(err));
    }
}
