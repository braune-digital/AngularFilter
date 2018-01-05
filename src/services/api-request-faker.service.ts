import { ApiRequestService } from '../helper/abstracts/abstract-api-request.service';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ApiRequestServiceInterface } from '../helper/interfaces/api-request-service.interface';

export class ApiRequestServiceFaker extends ApiRequestService implements ApiRequestServiceInterface{
    headers: Headers = new Headers();
    http: Http;
    baseUrl(withApiPrefix: boolean = true): string { return '' };
    buildHeaders(withScope: boolean  = true): void {}
    handleError(error: Response | any): ErrorObservable { return Observable.throw('')}
}