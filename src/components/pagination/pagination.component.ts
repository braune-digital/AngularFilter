import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ParamFilter } from '../../helper/paramfilter.class';

@Component({
    selector: 'filter-pagination',
    template: `
        <pagination [totalItems]="filterService.range.total"
                           [itemsPerPage]="filterService.resultsPerPage"
                           [ngModel]="filterService.page"
                           (ngModelChange)="pageChanged($event)"
                           [maxSize]="filterService.limitDisplayPages"
                           [boundaryLinks]="true"
                           [rotate]="false"
                           [previousText]="previousText"
                           [nextText]="nextText"
                           [firstText]="firstText"
                           [lastText]="lastText"
                           *ngIf="!isLoading && filterService.range.pages > 1"
        ></pagination>
    `,
})
export class PaginationFilterComponent implements OnInit {

    @Input('filterService') filterService: ParamFilter;

    isLoading = true;

    previousText = 'pagination.previousText';
    nextText = 'pagination.nextText';
    firstText = 'pagination.firstText';
    lastText = 'pagination.lastText';

    constructor(private translate: TranslateService) {
        this.translate.get([this.previousText, this.nextText, this.firstText, this.lastText]).subscribe((res: any) => {
            this.previousText = res['pagination.previousText'];
            this.nextText = res['pagination.nextText'];
            this.firstText = res['pagination.firstText'];
            this.lastText = res['pagination.lastText'];
        });
    }

    ngOnInit(): void {
        this.filterService.isLoadingEvent.subscribe((isLoading: boolean) => {
            this.isLoading = isLoading;
        });
    }

    pageChanged(page: number): void {
        this.filterService.page = page;
        this.filterService.refresh();
    }
}
