import { SelectComponentInterface } from '../interfaces/select-component.interface';
import { Input } from '@angular/core';
import { Ordering } from '../';

export class SelectComponent implements SelectComponentInterface {

    @Input('filterWithScope') filterWithScope = true;
    @Input('filterUrl') filterUrl: string;
    @Input('filterResultsPerPage') filterResultsPerPage: number = 10;
    @Input('filterProperties') filterProperties: Array<string>;
    @Input('filterOrderings') filterOrderings: Array<Ordering> = [];
    @Input('filterPropertyValue') filterPropertyValue = 'id';
    @Input('filterPropertyLabel') filterPropertyLabel: any = 'name';

    clearSelection(): void {
    }
}