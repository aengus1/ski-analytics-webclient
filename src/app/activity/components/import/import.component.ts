import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css']
})
export class ImportComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }


  fileChange(event) {
    const fileList: FileList = event.target.files;
    return this.onFileChange(Array.from(fileList));
  }

  onFileChange(fileList: Array<File>) {
    console.log('hit on files change ' + fileList.length);

    // do stuff here
    if (fileList.length > 0) {
      const file: File = fileList[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        let encoded = reader.result.replace(/^data:(.*;base64,)?/, '');
        if ((encoded.length % 4) > 0) {
          encoded += '='.repeat(4 - (encoded.length % 4));
        }
        console.log('encoded = ' + encoded);
      };
      reader.onerror = error => {
        console.error('error = ' + error);
      };
      // formData.append('uploadFile', file, file.name);
      // console.log('file name = ' + file.name);
      // let headers = new Headers();
      // /** In Angular 5, including the header Content-Type can invalidate your request */
      // headers.append('Content-Type', 'multipart/form-data');
      // headers.append('Accept', 'application/json');
      // let options = new RequestOptions({ headers: headers });
      // this.http.post(`${this.apiEndPoint}`, formData, options)
      //   .map(res => res.json())
      //   .catch(error => Observable.throw(error))
      //   .subscribe(
      //     data => console.log('success'),
      //     error => console.log(error)
      //   )
    }
  }

}
