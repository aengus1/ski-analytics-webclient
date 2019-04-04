import {Directive, EventEmitter, HostBinding, HostListener, Input, Output} from '@angular/core';
import {forEach} from 'lodash';

@Directive({
  selector: '[appImport]'
})
export class ImportDirective {

  constructor() {
  }

  @Output()
  private filesChangeEmitter: EventEmitter<Array<File>> = new EventEmitter();

  @Input() private allowed_extensions: Array<string> = [];

  @HostBinding('style.background') private background = '#eee';

  @HostListener('dragover', ['$event']) onDragOver(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#999';
  }


  @HostListener('dragleave', ['$event'])
  public onDragLeave(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#eee';
  }

  @HostListener('drop', ['$event'])
  public onDrop(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    const files = evt.dataTransfer.files;
    if (files.length > 0) {
      this.background = '#eee';
      const valid_files: Array<File> = [];
      if (files.length > 0) {
        forEach(files, (file: File) => {
          const ext = file.name.split('.')[file.name.split('.').length - 1];
          if (this.allowed_extensions.lastIndexOf(ext) !== -1) {
            valid_files.push(file);
          }
        });
        this.filesChangeEmitter.emit(valid_files);
      }
    }

  }

}
