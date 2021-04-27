import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { InputMaskModule } from 'primeng/inputmask';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { CheckboxModule } from 'primeng/checkbox';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CalendarModule} from 'primeng/calendar';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewComponent } from './feature/person/view/view.component';
import { FormComponent } from './feature/person/form/form.component';
import { CheckinComponent } from './feature/checkin/checkin.component';


const maskConfig: Partial<IConfig> = {
  validation: true,
};

@NgModule({
  declarations: [
    AppComponent,
    ViewComponent,
    FormComponent,
    CheckinComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    InputMaskModule,
    NgxMaskModule.forRoot(maskConfig),
    FormsModule,
    ReactiveFormsModule,
    CheckboxModule,
    AutoCompleteModule,
    CalendarModule,
   

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
