import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
        }
      });

      this.formGroupFilter.get('presentNotPerson').valueChanges
      .subscribe((presentNotPerson: boolean) => {
        if (presentNotPerson) {
          this.formGroupFilter.get("presentPerson").patchValue(false);
        }
      });

  }

  public search(event: any) {
    this.people = this.storageService.listPerson();
    this.people = this.people.filter(person => {
      return person.name.includes(event.query) || person.document === event.query || person.phone === event.query;
    })
  }

  public includePerson() {
    this.router.navigate(['/person/new']);
  }

  public save() {
    if (this.formGroup.valid) {
      const checkIn = this.formGroup.getRawValue() as CheckIn;
      this.storageService.addCheckIn(checkIn);
    } else {
      this.formGroup.markAllAsTouched();
    }

  }


}
