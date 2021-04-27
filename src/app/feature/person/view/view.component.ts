import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/core/storage/storage.service';
import { Person } from 'src/app/shared/models/person';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  public people: Person[];
  constructor(
    private storageService: StorageService,
    private router: Router 
  ) { }

  ngOnInit(): void {
    this.people = this.storageService.listPerson();
  }

  public add(){
    this.router.navigate(['/person/new']);
  }
  public onDelete(personId: string){
    this.storageService.onDelete(personId);
    this.people = this.storageService.listPerson();
  }

  public update(personId: string){
    this.router.navigate([`/person/${personId}`])
  }

  public checkIn(){
    this.router.navigate([`/checkin`])
  }
}
