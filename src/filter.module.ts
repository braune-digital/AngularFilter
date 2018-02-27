import { NgModule } from '@angular/core';

import { FilterComponent } from './components';
import { ResultsPerPageComponent } from './components';
import { PaginationFilterComponent } from './components';
import { OrderingComponent } from './components';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { PaginationModule } from 'ngx-bootstrap';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        PaginationModule
    ],
    declarations: [
        FilterComponent,
        ResultsPerPageComponent,
        PaginationFilterComponent,
        OrderingComponent
    ],
    exports: [
        FilterComponent,
        ResultsPerPageComponent,
        PaginationFilterComponent,
        OrderingComponent
    ]
})
export class BrauneDigitalFilterModule {
}
