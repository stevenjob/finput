import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { ReactiveFormsComponent } from './reactive-forms';
import { FormsComponent } from './forms';
import { FinputDirective } from './finput.directive';

@NgModule({
  declarations: [
    AppComponent,
    ReactiveFormsComponent,
    FormsComponent,
    FinputDirective
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
