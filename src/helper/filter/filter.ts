import { EventEmitter } from '@angular/core';

export abstract class Filter {
    public id: string;
    public type: string;
    public active = true;
    public refreshEvent: EventEmitter<boolean> = new EventEmitter();

    constructor() { }

    public abstract get(): object;
}
