import { Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Filter } from './filter/filter';
import { Ordering } from './filter/order';
import { AndFilter } from './filter/types/and.filter';
import { FilterComponent } from '../components/filter/filter.component';
import { ApiRequestService } from './abstracts/abstract-api-request.service';

export class ParamFilter {

    static resultKeys: number[] = [10, 25, 50];

    filters: Array<Filter> = [];
    orderings: Array<Ordering> = [];

    page = 1;
    limitDisplayPages = 3;

    range: { total: number, pages: number, from?: number, to?: number } = { total: 0, pages: 0 };

    responseEvent: Subject<any> = new Subject();
    isLoadingEvent: Subject<boolean> = new Subject();

    filtersFromLastRequest: string;

    withScope = true;

    resultsPerPage = 10;

    constructor(protected requestUrl: string, protected api: ApiRequestService, withScope?: boolean) {
        if (withScope !== undefined) {
            this.withScope = withScope;
        }
    }

    public refresh(): void {
        this.isLoadingEvent.next(true);
        this.refreshPromise()
            .subscribe((response: any) => {
                this.responseEvent.next(response);
                this.isLoadingEvent.next(false);
            });
    }

    public refreshPromise(): Observable<any> {
        this.api.buildHeaders(this.withScope);
        return this.api.http.get(
            this.api.baseUrl() + this.requestUrl,
            {
                headers: this.api.headers,
                search: this.build()
            }
        ).map((response: Response) => {
            this.preparePagination(response);
            return response.json();
        })
            .catch((err: Response) => this.api.handleError(err));
    }

    preparePagination(response: Response): void {
        if (response.headers.has('Content-Range')) {
            const hdr = response.headers.get('Content-Range');
            const m = hdr && hdr.match(/^(?:items )?(\d+)-(\d+)\/(\d+|\*)$/);
            if (m) {
                this.range = {
                    from: +m[1],
                    to: +m[2],
                    total: m[3] === '*' ? Infinity : +m[3],
                    pages: 0
                };
            } else if (hdr === '*/0') {
                this.range = { total: 0, pages: 0 };
            } else {
                this.range = { total: 0, pages: 0 };
            }
            this.range['pages'] = Math.ceil((this.range ? this.range.total : response.json().length) / this.resultsPerPage);
        }
    }

    public add(filter: FilterComponent | Filter): void {
        let f: Filter;
        if (filter instanceof Filter) {
            f = filter;
        } else if (filter instanceof FilterComponent) {
            f = filter.filter;
        }

        if (this.filters.indexOf(f) < 0) {
            this.filters.push(f);
        } else {
            this.filters[this.filters.findIndex(item => item.id === f.id)] = f;
        }
    }

    public addOrdering(ordering: Ordering): void {
        if (this.orderings.indexOf(ordering) < 0) {
            this.orderings.push(ordering);
        }
    }

    public setOrderings(orderings: Array<Ordering>): void {
        this.orderings = orderings;
    }

    public build(): URLSearchParams {
        const searchParams: URLSearchParams = new URLSearchParams();
        const filterObjects: Array<object> = [];
        if (this.filters) {
            if (this.filters.length === 1) {
                const filter = this.filters[0].get();
                if (filter) {
                    filterObjects.push(filter);
                }
            } else {
                const andFilter = new AndFilter(this.filters);
                filterObjects.push(andFilter.get());
            }
        }

        const orderings: { [key: string]: string } = {};
        if (this.orderings) {
            this.orderings.forEach(ordering => {
                if (ordering.active) {
                    orderings[ordering.property] = ordering.ordering;
                }
            });
        }

        const filterObjectsString = JSON.stringify(filterObjects);

        // @Felix todo - Wieso passiert das hier?
        // if (this.filtersFromLastRequest && this.filtersFromLastRequest !== filterObjectsString) {
        //     this.page = 1;
        // }
        this.filtersFromLastRequest = JSON.stringify(filterObjects);

        searchParams.set('filter', filterObjectsString);
        searchParams.set('order', JSON.stringify(orderings));
        searchParams.set('page', this.page.toString());
        searchParams.set('resultsPerPage', this.resultsPerPage.toString());

        return searchParams;
    }

    setResultsPerPage(results: number): void {
        this.page = 1;
        this.resultsPerPage = results;
    }

    getResultsPerPage(): number {
        return this.resultsPerPage;
    }
}
