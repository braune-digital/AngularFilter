import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ParamFilter } from '../../helper/paramfilter.class';

@Component({
    selector: 'filter-results-per-page',
    template: `
        <span class="title">{{ 'forms.fields.results_per_page' | translate }}</span>

        <select-component
                [noSearchBox]="true"
                [selectFormGroup]="form"
                selectClass="form-group--small form-group--inline"
                controlClass="form-control--small"
                selectFormControlName="pagination"
                [options]="resultKeys"
                (onSelect)="refreshResultsPerPage()">
        </select-component>
    `,
})
export class ResultsPerPageComponent implements OnInit {

    @Input('filterService') filterService: ParamFilter;
    @Input('resultKeys') resultKeys: Array<number>;
    @Output('refreshedResultsPerPage') refreshedResultsPerPage: EventEmitter<boolean> = new EventEmitter();

    form: FormGroup;

    constructor(private fb: FormBuilder) { }

    ngOnInit(): void {
        this.form = this.fb.group({ pagination: this.filterService.getResultsPerPage() });
    }

    refreshResultsPerPage(): void {
        this.filterService.setResultsPerPage(this.form.value.pagination);
        this.refreshedResultsPerPage.emit(true);
    }
}
