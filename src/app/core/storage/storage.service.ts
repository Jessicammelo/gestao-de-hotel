import { Injectable } from '@angular/core';
import { Person } from 'src/app/shared/models/person';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  public addPerson(person: Person) {
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

  public getPerson(personId: string){
    const people = this.listPerson();
    return people.find(person =>{
      return person.id === personId;
    });
    
  }
}
