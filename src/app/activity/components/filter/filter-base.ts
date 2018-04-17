export abstract class FilterBase {
  abstract reset (): void;
  abstract getFilterId(): string;
  abstract enable(): void;
  abstract disable(): void;
}
