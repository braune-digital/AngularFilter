import { CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule, Provider } from '@angular/core';

import { FilterComponent } from './components/filter/filter.component';
import { ResultsPerPageComponent } from './components/results-per-page/results-per-page.component';
import { PaginationFilterComponent } from './components/pagination/pagination.component';
import { OrderingComponent } from './components/ordering/ordering.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { PaginationModule } from 'ngx-bootstrap';
import { ApiRequestService } from './helper/abstracts/abstract-api-request.service';
import { ApiRequestServiceFaker } from './services/api-request-faker.service';

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
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BrauneDigitalFilterModule {

    static forRoot(config: { api?: Provider } = {}): ModuleWithProviders {
        return {
            ngModule: BrauneDigitalFilterModule,
            providers: [
                config.api || { provide: ApiRequestService, useClass: ApiRequestServiceFaker }
            ]
        };
    }

}
