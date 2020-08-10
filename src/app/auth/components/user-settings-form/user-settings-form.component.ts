import {AfterContentChecked, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {User} from '../../../../generated/graphql';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UiSwitchComponent} from 'ngx-toggle-switch';


@Component({
  selector: 'app-user-settings-form',
  templateUrl: './user-settings-form.component.html',
  styleUrls: ['./user-settings-form.component.scss']
})
export class UserSettingsFormComponent implements OnInit, AfterContentChecked {

  private activeTab = 'profile';

  constructor(private apollo: Apollo, private cdRef: ChangeDetectorRef) {
  }

  userSettings$: Observable<User>;
  heightEditMode = false;
  initHeight = -1;
  weightEditMode = false;
  initWeight = -1;
  genderEditMode = false;
  initGender = '';
  selectedGender = '';
  hrZoneEditMode = false;
  initHrZone = [];
  userId: string = null;

  kms = true;
  pace = 1;
  twelveHr = true;
  ddmm = true;
  private saveHeightQuery = gql`
  mutation saveHeight($userId: ID!, $height: Int!) {
    saveHeight(id: $userId, height: $height) {
      height
    }
  }
`;

  private saveWeightQuery = gql`
  mutation saveWeight($userId: ID!, $weight: Int!) {
    saveWeight(id: $userId, weight: $weight) {
      weight
    }
  }
`;

  private saveGenderQuery = gql`
  mutation saveGender($userId: ID!, $gender: String!) {
    saveGender(id: $userId, gender: $gender) {
      gender
    }
  }
`;

  private saveHrZonesQuery = gql`
  mutation saveHrZones($userId: ID!, $hrZones: [Int]!) {
    saveHrZones(id: $userId, hrZones: $hrZones) {
      hrZones
    }
  }
`;
  Math: any = Math;

  heightForm: FormGroup = new FormGroup({
    height: new FormControl('', [Validators.required])
  });

  weightForm: FormGroup = new FormGroup({
    weight: new FormControl('', [Validators.required])
  });

  genderForm: FormGroup = new FormGroup({
    gender: new FormControl('', [Validators.required])
  });

  hrZoneForm: FormGroup = new FormGroup({
    hrZone1: new FormControl('', [Validators.required]),
    hrZone2: new FormControl('', [Validators.required]),
    hrZone3: new FormControl('', [Validators.required]),
    hrZone4: new FormControl('', [Validators.required]),
    hrZone5: new FormControl('', [Validators.required]),
    hrZone6: new FormControl('', [Validators.required])
  }, this.hrZoneBoundaryValidator);

  ngOnInit() {
    this.userSettings$ = this.apollo.watchQuery<any>({
      query: gql`
    query getUser{
      getUser{
        id
        height
        weight
        hrZones
        gender
      }
    }`
    }).valueChanges.pipe(map(result => {
      console.log('result = ' + JSON.stringify(result.data));
      this.initGender = result.data.getUser.gender;
      return result.data.getUser;
    }));
  }

  ngAfterContentChecked() {
    this.cdRef.detectChanges();
  }

  saveHeight(ht: Number, id: string) {
    this.heightEditMode = false;
    this.apollo.mutate({
      mutation: this.saveHeightQuery,
      variables: {
        userId: id,
        height: ht
      }
    }).subscribe(x => console.log(x));
    console.log('saving height');
  }

  saveWeight(wt: Number, id: string) {
    this.weightEditMode = false;
    this.apollo.mutate({
      mutation: this.saveWeightQuery,
      variables: {
        userId: id,
        weight: wt
      }
    }).subscribe(x => console.log(x));
    console.log('saving weight');
  }

  saveGender(gender: string, id: string) {
    this.genderEditMode = false;
    this.initGender = this.selectedGender;
    this.apollo.mutate({
      mutation: this.saveGenderQuery,
      variables: {
        userId: id,
        gender: gender
      }
    }).subscribe(x => console.log(x));
    console.log('saving gender');
  }

  saveHrZones(hrZones: Number[], id: string) {
    this.hrZoneEditMode = false;
    this.apollo.mutate({
      mutation: this.saveHrZonesQuery,
      variables: {
        userId: id,
        hrZones: hrZones
      }
    }).subscribe(x => console.log(x));
    console.log('saving hr zones');
  }


  hrZoneBoundaryValidator(frm: FormGroup) {
    const z1: Number = frm.get('hrZone1').value;
    const z2: Number = frm.get('hrZone2').value;
    const z3: Number = frm.get('hrZone3').value;
    const z4: Number = frm.get('hrZone4').value;
    const z5: Number = frm.get('hrZone5').value;
    const z6: Number = frm.get('hrZone6').value;
    if (z1 < z2 && z2 < z3 && z3 < z4 && z4 < z5 && z5 < z6) {
      return null;
    } else {
      return {mismatch: true};
    }
  }

  setTab(val: string) {
    this.activeTab = val;
  }

  updatePace(val: number) {
    this.pace = val;
    this.saveUnits();
  }


  updateDist(kms: boolean) {
    this.pace = kms ? this.pace + 3 : this.pace - 3;
    this.saveUnits();
  }

  updateTime() {
    this.saveUnits();
  }
  updateDate() {
    this.saveUnits();
  }

  saveUnits() {
    // todo -> serialize unit values
  }
}
