import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './feature/person/form/form.component';
import { ViewComponent } from './feature/person/view/view.component';
import { CheckinComponent } from './feature/checkin/checkin.component';

const routes: Routes = [
  {
    path: 'person',
    component: ViewComponent,
  },
  {
    path: 'person/:id',
    component: FormComponent,
  },
  {
    path: 'checkin',
    component: CheckinComponent,
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
