import {AfterContentChecked, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {User} from '../../../../generated/graphql';
import {Observable, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {GetUserGQL} from './get-user.gql';


@Component({
  selector: 'app-user-settings-form',
  templateUrl: './user-settings-form.component.html',
  styleUrls: ['./user-settings-form.component.scss']
})
export class UserSettingsFormComponent implements OnInit, OnDestroy, AfterContentChecked {

  public activeTab = 'profile';

  userSettings$: Observable<User>;

  // profile form fields
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

  // units form fields
  kms = false;
  pace = 0;
  twelveHr = false;
  ddmm =  false;

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

  private saveDistanceQuery = gql`
    mutation saveKms($userId: ID!, $kms: Int!) {
      saveUnitsKms(id: $userId, units_kms: $kms) {
        units_kms
      }
    }
  `;

  private savePaceQuery = gql`
    mutation savePace($userId: ID!, $pace: Int!) {
      saveUnitsPace(id: $userId, units_pace: $pace) {
        units_pace
      }
    }
  `;

  private saveTimeQuery = gql`
    mutation saveUnitsTime($userId: ID!, $twelveHr: Int!) {
      saveUnitsTime(id: $userId, units_twelveHr: $twelveHr) {
        units_twelveHr
      }
    }
  `;

  private saveDateQuery = gql`
    mutation saveUnitsDate($userId: ID!, $ddmm: Int!) {
      saveUnitsDate(id: $userId, units_ddmm: $ddmm) {
        units_ddmm
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

  constructor(private apollo: Apollo, private cdRef: ChangeDetectorRef, private getUserGQL: GetUserGQL) {
  }

  initModel(user: User): User {
    console.log('result = ' + JSON.stringify(user));
    this.initGender = user.gender;
    this.ddmm = user.units_ddmm != null ? user.units_ddmm === 1 : true;
    this.kms = user.units_kms != null ? user.units_kms === 1 : true;
    this.twelveHr = user.units_twelveHr != null ? user.units_twelveHr === 1 : true;
    this.pace = user.units_pace;
    return user;
  }
  ngOnInit() {

    this.userSettings$ = this.getUserGQL.watch()
    .valueChanges
    .pipe(
      map(result => {
       return this.initModel(result.data.getUser);
      })
    );
  }

  isNaN(number: number) {
    return Number.isNaN(number);
  }


  ngAfterContentChecked() {
    this.cdRef.detectChanges();
  }

  saveHeight(ht: number, id: string) {
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

  saveWeight(wt: number, id: string) {
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

  saveHrZones(hrZones: number[], id: string) {
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

  saveKms(kms: boolean, id: string) {
    const res = kms ? 1 : 0;
    this.apollo.mutate({
      mutation: this.saveDistanceQuery,
      variables: {
        userId: id,
        kms: res
      }
    }).subscribe(x => console.log(x));
    console.log('saving distance');
  }

  savePace(pace: number, id: string) {
    this.pace = pace;
    this.apollo.mutate({
      mutation: this.savePaceQuery,
      variables: {
        userId: id,
        pace: pace
      }
    }).subscribe(x => console.log(x));
    console.log('saving pace');
  }

  saveTime(twelveHr: boolean, id: string) {

    const res = twelveHr ? 1 : 0;
    console.log('turning 12hr ' + twelveHr + ' ' + res);
    this.apollo.mutate({
      mutation: this.saveTimeQuery,
      variables: {
        userId: id,
        twelveHr: res
      }
    }).subscribe(x => {
      console.log(x);
      // this.resubscribe();
    });
    console.log('saving time' + twelveHr);
  }

  saveDate(ddmm: boolean, id: string) {
    const res = ddmm ? 1 : 0;
    this.apollo.mutate({
    mutation: this.saveDateQuery,
      variables: {
        userId: id,
        ddmm: res
      }
    }).subscribe(x => console.log(x));
    console.log('saving date' + ddmm);
  }


  hrZoneBoundaryValidator(frm: FormGroup) {
    const z1: number = frm.get('hrZone1').value;
    const z2: number = frm.get('hrZone2').value;
    const z3: number = frm.get('hrZone3').value;
    const z4: number = frm.get('hrZone4').value;
    const z5: number = frm.get('hrZone5').value;
    const z6: number = frm.get('hrZone6').value;
    if (z1 < z2 && z2 < z3 && z3 < z4 && z4 < z5 && z5 < z6) {
      return null;
    } else {
      return {mismatch: true};
    }
  }

  setTab(val: string) {
    this.activeTab = val;
  }

}
