import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/core/storage/storage.service';
import { Person } from 'src/app/shared/models/person';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  public formGroup: FormGroup;
  public phoneMask = '(00) 0000-00009';

  constructor(
    private activateRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private storageService: StorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      id: [],
      name: ['', Validators.required],
      document: ['', Validators.required],
      phone: ['', Validators.required]
    });

    this.formGroup.get('phone').valueChanges
      .subscribe((phone: string) => {
        if (phone.length > 10) {
          this.phoneMask = '(00) 0 0000-0000';
        } else {
          this.phoneMask = '(00) 0000-00009';
        }
      });

    if (!this.isNew()) {
      const person = this.storageService.getPerson(this.activateRoute.snapshot.params.id);
      this.formGroup.patchValue(person);
    }
  }

  public isNew() {
    return this.activateRoute.snapshot.params.id === 'new';
  }


  public onSave() {
    if (this.formGroup.valid) {
      const person = this.formGroup.getRawValue() as Person;
      if (this.isNew()) {
        person.id = uuidv4();
      } else {
        this.storageService.onDelete(person.id)
      }
      this.storageService.addPerson(person);
      this.router.navigate(['/person']);
    } else {
      this.formGroup.markAllAsTouched();
    }
  }

  public cancelar() {
    this.router.navigate(['/person']);
  }

}
