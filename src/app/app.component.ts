import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('form') form: NgForm;
  subscriptions: string[] = ['Basic', 'Advanced', 'Pro'];
  defaultSubscription: string = 'Advanced';
  submitted = false;
  user = {
    email: '',
    subscription: '',
    password: ''
  };

  onSubmit() {
    this.submitted = true;
    console.log(this.form);

    this.user.email = this.form.value.email;
    this.user.subscription = this.form.value.subscription;
    this.user.password = '*'.repeat(this.form.value.password.length);
  }
}
