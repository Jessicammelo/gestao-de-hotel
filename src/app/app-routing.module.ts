import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './feature/person/form/form.component';
import { ViewComponent } from './feature/person/view/view.component';

const routes: Routes = [
  {
    path: 'person',
    component: ViewComponent,
  },
  {
    path: 'person/:id',
    component: FormComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
