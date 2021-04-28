import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { CheckIn } from 'src/app/shared/models/checkIn';
import { Person } from 'src/app/shared/models/person';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  public addPerson(person: Person): void {
    const people = this.listPerson();
    people.push(person);
    localStorage.setItem('people', JSON.stringify(people));
  }

  public listPerson(): Person[] {
    const people = localStorage.getItem('people');
    return people ? JSON.parse(people) : [];
  }

  public onDelete(personId: string) {
    let people = this.listPerson();
    people = people.filter(person => {
      return person.id !== personId;
    });
    localStorage.setItem('people', JSON.stringify(people));
  }

  public getPerson(personId: string) {
    const people = this.listPerson();
    return people.find(person => {
      return person.id === personId;
    });

  }

  public addCheckIn(checkIn: CheckIn) {
    const monentDate = moment(checkIn.checkIn);
    let price = 0;
    while (monentDate.isBefore(checkIn.checkOut)) {
      if (monentDate.isoWeekday() === 1 || monentDate.isoWeekday() === 7) {
        price = price + 150;
        if (checkIn.vehicle) {
          price = price + 20;
        }
      } else {
        price = price + 120;
        if (checkIn.vehicle) {
          price = price + 15;
        }
      }
      monentDate.add(1, 'day');
    }
    checkIn.price = price;

    const checkIns = this.listCheckIn();
    checkIns.push(checkIn);
    localStorage.setItem('checkIns', JSON.stringify(checkIns));
  }

  public listCheckIn(): CheckIn[] {
    const checkIns = localStorage.getItem('checkIns');
    return checkIns ? JSON.parse(checkIns) : [];
  }


}
