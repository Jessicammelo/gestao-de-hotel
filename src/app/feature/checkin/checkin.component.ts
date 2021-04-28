import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { StorageService } from 'src/app/core/storage/storage.service';
import { CheckIn } from 'src/app/shared/models/checkIn';
import { Person } from 'src/app/shared/models/person';

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.scss']
})
export class CheckinComponent implements OnInit {

  public checkIns: CheckIn[];
  public people: Person[];
  public formGroup: FormGroup;
  public formGroupFilter: FormGroup;

  constructor(
    private activateRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private storageService: StorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      checkIn: ['', Validators.required],
      checkOut: ['', Validators.required],
      person: ['', Validators.required],
      vehicle: [false]
    });

    this.checkIns = this.storageService.listCheckIn();

    this.formGroupFilter = this.formBuilder.group({
      presentPerson: [false],
      presentNotPerson: [false]
    });

    this.formGroupFilter.get('presentPerson').valueChanges
      .subscribe((presentPerson: boolean) => {
        if (presentPerson) {
          this.formGroupFilter.get("presentNotPerson").patchValue(false);
          this.filterByPresentPerson();
        }
      });

    this.formGroupFilter.get('presentNotPerson').valueChanges
      .subscribe((presentNotPerson: boolean) => {
        if (presentNotPerson) {
          this.formGroupFilter.get("presentPerson").patchValue(false);
          this.filterByPresentNotPerson();
        }
      });

  }

  public search(event: any) {
    this.people = this.storageService.listPerson();
    this.people = this.people.filter(person => {
      return person.name.includes(event.query) || person.document === event.query || person.phone === event.query;
    });
  }

  public includePerson() {
    this.router.navigate(['/person/new']);
  }

  public goToPerson() {
    this.router.navigate(['/person']);
  }

  public save() {
    if (this.formGroup.valid) {
      const checkIn = this.formGroup.getRawValue() as CheckIn;
      if (moment(checkIn.checkIn).isAfter(checkIn.checkOut)) {
        return alert("A data de check-in não pode ser maior que a data de check-out")
      }
      this.storageService.addCheckIn(checkIn);
      this.checkIns = this.storageService.listCheckIn();
      this.formGroup.reset();
    } else {
      this.formGroup.markAllAsTouched();
    }
  }

  public filterByPresentPerson() {
    this.checkIns = this.storageService.listCheckIn();
    this.checkIns = this.checkIns.filter(checkIn => {
      return moment().isBefore(checkIn.checkOut) && moment().isAfter(checkIn.checkIn);
    });
  }

  public filterByPresentNotPerson() {
    this.checkIns = this.storageService.listCheckIn();
    this.checkIns = this.checkIns.filter(checkOut => {
      return moment().isAfter(checkOut.checkOut) || moment().isBefore(checkOut.checkIn);
    })
  }


}
