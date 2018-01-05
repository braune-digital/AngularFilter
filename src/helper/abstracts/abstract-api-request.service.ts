import { Http, Response, Headers } from '@angular/http';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Observable } from 'rxjs/Observable';
import { ApiRequestServiceInterface } from '../interfaces/api-request-service.interface';

export abstract class ApiRequestService implements ApiRequestServiceInterface{
    headers: Headers = new Headers();
    http: Http;
    baseUrl(withApiPrefix: boolean = true): string { return '' };
    buildHeaders(withScope: boolean  = true): void {}
    handleError(error: Response | any): ErrorObservable { return Observable.throw('')}
}