import { Component, OnInit } from '@angular/core';
import { AsyncValidatorFn, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signUpForm: FormGroup;
  forbiddenUserNames = ['Chris', 'Anna'];
  get hobbiesControls() {
    return (this.signUpForm.get('hobbies') as FormArray).controls;
  }

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails),
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });


    // this.signUpForm.valueChanges.subscribe(
    //   (value) => { console.log('Value changed: '); console.log(value); }
    // );
    this.signUpForm.statusChanges.subscribe(
      (status) => console.log('Status changed: ' + status)
    );

    this.signUpForm.setValue({
      'userData': {
        'username': 'Victor',
        'email': 'victor@test.com'
      },
      'gender': 'male',
      'hobbies': []
    });

    this.signUpForm.patchValue({
      'userData': {
        'username': 'Anna'
      },
      'gender': 'female'
    });
  }

  onSubmit() {
    console.log(this.signUpForm);
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (this.signUpForm.get('hobbies') as FormArray).push(control);
  }

  forbiddenNames(control: FormControl): {[s: string]: boolean} {
    if (this.forbiddenUserNames.indexOf(control.value) !== -1)
      return {'nameIsForbidden': true};
    return null;
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if(control.value === 'test@test.com')
          resolve({'emailIsForbidden': true});
        else resolve(null);
      }, 1500)
    });
    return promise;
  }
}
