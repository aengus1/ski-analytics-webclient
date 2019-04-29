import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivityService} from '../../services/activity-service/activity.service';
import {NgbModal, NgbModalOptions, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss']
})
export class ImportComponent implements OnInit {

  private activityService: ActivityService;
  private modalRef: NgbModalRef;
  private modalCloseResult: string;
  private uploadResponse: string;

  @ViewChild('confirmSuccessModal') private confirmSuccessModal;

  constructor(private modal: NgbModal, activityService: ActivityService) {
    this.activityService = activityService;
  }

  ngOnInit() {
    this.uploadResponse = '';
  }


  fileChange(event) {
    const fileList: FileList = event.target.files;
    return this.onFileChange(Array.from(fileList));
  }

  onFileChange(fileList: Array<File>) {
    console.log('hit on files change ' + fileList.length);
    if (fileList.length > 0) {
      const options: NgbModalOptions = {
        size: 'lg'
      };
      this.activityService.importActivity(fileList).subscribe(x => {
        console.log('chain returned...' + JSON.stringify(x));
        this.uploadResponse = JSON.stringify(x);
        setTimeout(() => {
            this.modalRef = this.modal.open(this.confirmSuccessModal, options);
            this.modalRef.result.then((result) => {
              this.modalCloseResult = `Closed with: ${result}`;
              this.uploadResponse = '';
            }, (reason) => {
              this.modalCloseResult = 'Dismissed';
              this.uploadResponse = '';
            });
          }
          , 100);
      });
    }
  }


  closeModal() {
    this.modalRef.close();
  }
}
