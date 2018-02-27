import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ParamFilter } from '../../paramfilter.class';
import { Ordering } from '../../filter/order';

@Component({ // todo - make directive without markup
    selector: 'filter-ordering',
    template: `
        <span class="title">{{ 'forms.fields.order' | translate }}</span>
        <!--<select-component-->
            <!--[noSearchBox]="true"-->
            <!--[selectFormGroup]="form"-->
            <!--selectClass="form-group&#45;&#45;small form-group&#45;&#45;inline"-->
            <!--controlClass="form-control&#45;&#45;small"-->
            <!--selectFormControlName="ordering"-->
            <!--[options]="[{key:'',label:'pages.portfolios.sort.none'}].concat(orderKeys)"-->
            <!--optionValue="key"-->
            <!--optionLabel="label"-->
            <!--(onSelect)="refreshOrdering()"></select-component>-->
        
        <i class="bd-icon bd-icon--big icon-arrow-down" *ngIf="getActiveSort() === 'desc'" (click)="refreshOrdering(true)"></i>
        <i class="bd-icon bd-icon--big icon-arrow-up" *ngIf="getActiveSort() !== 'desc'" (click)="refreshOrdering(true)"></i>
    `,
})
export class OrderingComponent implements OnInit, AfterViewInit {

    @Input('filterService') filterService: ParamFilter;
    @Input('orderKeys') orderKeys: Array<{ key: string; label: string; }>;

    @Output('reorder') reorder: EventEmitter<boolean> = new EventEmitter();

    form: FormGroup; // todo - use trigger as input fir directive or implement control value accessor interface

    private orderings: Array<Ordering> = [];

    constructor(private fb: FormBuilder) {
    }

    ngOnInit(): void {
        this.form = this.fb.group({ ordering: '' });
        this.orderKeys.forEach(orderKey => {
            this.orderings.push(new Ordering(orderKey.key, 'asc'));
        });
    }

    ngAfterViewInit(): void {
        this.filterService.setOrderings(this.orderings);
    }

    refreshOrdering(toggleAscDesc: boolean = false): void {
        this.orderings = this.orderings.map(ordering => {
            ordering.active = ordering.property === this.form.value.ordering;
            if (toggleAscDesc) {
                if (ordering.ordering === 'asc') {
                    ordering.ordering = 'desc';
                } else {
                    ordering.ordering = 'asc';
                }
            }
            return ordering;
        });

        this.reorder.emit(true);
    }

    getActiveSort() {
        let activeOrdering: Ordering;
        activeOrdering = this.orderings.find(ordering => (ordering.active));
        if (activeOrdering) {
            return activeOrdering.ordering;
        } else {
            return null;
        }
    }
}
