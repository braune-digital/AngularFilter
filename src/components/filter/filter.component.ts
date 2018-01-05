import { AfterViewInit, Component, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Filter } from '../../helper/filter/filter';
import { TextFilter } from '../../helper/filter/types/text.filter';
import { EqualFilter } from '../../helper/filter/types/equal.filter';
import { SelectComponent } from '../../helper/abstracts/abstract-select.component';

@Component({
    selector: 'filter-component',
    template: `
        <input name="search"
               *ngIf="type === 'text'"
               [(ngModel)]="model"
               (keyup)="onKeyPress()"
               [placeholder]="filterPlaceholder"
               class="form-control form-control--small form-control--transparent" />

        <div *ngIf="type === 'date_time_range'">
            <input name="min"
                   [(ngModel)]="model"
                   (keyup)="onKeyPress()"
                   [placeholder]=""
                   class="form-control form-control--small form-control--transparent" />
            <input name="max"
                   [(ngModel)]="model2"
                   (keyup)="onKeyPress()"
                   [placeholder]=""
                   class="form-control form-control--small form-control--transparent" />
        </div>

        <div *ngIf="type === 'date_time_range_fixed_interval'">
            <input name="min" type="hidden"
                   [(ngModel)]="model"
                   (keyup)="onKeyPress()"
                   [placeholder]=""
                   class="form-control form-control--small form-control--transparent" />
            <input name="max" type="hidden"
                   [(ngModel)]="model2"
                   (keyup)="onKeyPress()"
                   [placeholder]=""
                   class="form-control form-control--small form-control--transparent" />
        </div>

        <select-component *ngIf="type === 'select'"
                          [selectPlaceholder]="filterPlaceholder"
                          (onSelect)="onChange($event)"
                          (onRemove)="onRemove($event)"
                          [selectClass]="selectClass"
                          [resetable]="true"
                          [options]="options"
                          optionValue="value"
                          optionLabel="label">
            <!--<option *ngIf="resetable"></option>-->
            <!--<option *ngIf="resetable" value="">-</option>-->
            <!--<option *ngFor="let option of options" [value]="option.value">{{ option.label | translate }}</option>-->
        </select-component>

        <select-component *ngIf="type === 'select-remote'"
                          [selectPlaceholder]="filterPlaceholder"
                          (onSelect)="onChange($event)"
                          (onRemove)="onRemove($event)"
                          [selectClass]="selectClass"
                          [resetable]="true"
                          [filterUrl]="remoteUrl"
                          [filterProperties]="remoteProperty"
        >
        </select-component>

    `
})
export class FilterComponent implements AfterViewInit, OnInit {

    model: any = null;
    model2: any = null;
    filter: Filter;
    timeoutId: any;
    isReseting: Boolean = false;

    @Input('type') type = 'text';
    @Input('options') options: Array<{ value: any; label: string }> = [];
    @Input('resetable') resetable = true;
    @Input('selectClass') selectClass: string;
    @Input('params') params: any;
    @Input('filterPlaceholder') filterPlaceholder = '';
    @Input('remoteUrl') remoteUrl: string;
    @Input('remoteProperty') remoteProperty: Array<string>;
    @Output('onRefreshFilter') onRefreshFilter: EventEmitter<Filter> = new EventEmitter();

    @ViewChild(forwardRef(() => SelectComponent)) selectComponent: SelectComponent;

    constructor(private translate: TranslateService) { }

    ngOnInit(): void {
        if (this.filterPlaceholder) {
            this.translate.get(this.filterPlaceholder).subscribe((res: string) => {
                this.filterPlaceholder = res;
            });
        }
    }

    ngAfterViewInit(): void {
        switch (this.type) {
            case 'text':
                this.filter = new TextFilter(this.params.properties, this.model);
                break;
            case 'select':
            case 'select-remote':
                this.filter = new EqualFilter(this.params.prop, this.model);
                this.filter.active = false;
                break;
        }
    }

    onKeyPress(): void {
        this.filter.active = true;
        if (
            this.timeoutId
            || this.filter instanceof TextFilter && this.filter.text === this.model
        ) {
            window.clearTimeout(this.timeoutId);
        }
        this.timeoutId = window.setTimeout(() => {
            this.refreshFilter();
        }, 500);
    }

    onChange(data: { id: any, text: string }): void {
        this.model = data.id;
        this.filter.active = this.model !== 'null';
        this.refreshFilter();
    }

    onRemove(): void {
        this.model = null;
        this.filter.active = false;
        this.refreshFilter();
    }

    reset(): void {
        this.isReseting = true;
        this.model = null;
        this.model2 = null;
        this.filter.active = false;
        if (this.selectComponent) {
            this.selectComponent.clearSelection();
        }
        this.isReseting = false;
    }

    refreshFilter(emitEvent: boolean = true): void {
        if (this.isReseting) {
          return;
        }
        if (this.filter instanceof TextFilter) {
            this.filter.text = this.model;
        } else if (this.filter instanceof EqualFilter) {
            this.filter.values = [this.model];
        }
        if (emitEvent) {
            this.onRefreshFilter.emit(this.filter);
        }
    }

    set(value: any, active: boolean = true, value2?: any): void {
        this.model = value;
        if (value2) {
          this.model2 = value2;
        }
        this.filter.active = active;
        this.refreshFilter(false);
    }

    public getFilter(): Filter {
        return this.filter;
    }
}
