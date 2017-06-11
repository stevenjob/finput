import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup
} from '@angular/forms';

@Component({
  selector: 'finput-reactive-forms',
  templateUrl: './reactive-forms.component.html',
  styleUrls: ['./reactive-forms.component.css']
})
export class ReactiveFormsComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  formGroup: FormGroup;
  formValues: any;

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      finput: []
    });

    this.formGroup.patchValue({
      finput: '12345'
    });

    this.formGroup.valueChanges.subscribe(data => {
      console.log(data);
      this.formValues = data;
    });
  }

  onSubmit() {
    console.log(this.formGroup.value.finput);
  }

  patchFinput() {
    this.formGroup.patchValue({
      finput: '98766'
    });
  }

}
