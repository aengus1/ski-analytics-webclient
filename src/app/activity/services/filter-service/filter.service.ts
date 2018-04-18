import { Injectable } from '@angular/core';
import {ActivityFilter} from '../../model/activity-filter/activity-filter.model';


/**
 * Not advisable to store ts classes in redux store, so this service is used to keep a map of filters outside of the
 * store
 */
@Injectable()
export class FilterService {

  private filters: Map<string, ActivityFilter> = new Map<string, ActivityFilter>();

  constructor() { }

public registerFilter(id: string, filter: ActivityFilter) {
    this.filters.set(id, filter);
}

public getFilter(id: string) {
    return this.filters.get(id);
}

public removeFilter(id: string): void {
    this.filters.delete(id);
}

public getAllFilters(): ActivityFilter[] {
    return Array.from(this.filters.values());
}

public getAllKeys(): string[] {
    return Array.from(this.filters.keys());
}
}
