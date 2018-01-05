import { Http, Response, Headers } from '@angular/http';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

export interface ApiRequestServiceInterface {
    headers: Headers;
    http: Http;
    baseUrl(withApiPrefix: boolean): string;
    buildHeaders(withScope: boolean): void;
    handleError(error: Response | any): ErrorObservable;
}