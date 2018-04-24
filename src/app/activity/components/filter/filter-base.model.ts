/**
 * Simple interface for concrete filter components to extend.  This allows the parent FilterComponent to communicate down
 * the chain with the component using ViewChild
 */
export abstract class FilterBase {
  abstract reset (): void;
  abstract getFilterId(): string;
  abstract enable(): void;
  abstract disable(): void;
}
