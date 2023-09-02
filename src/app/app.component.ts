import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  projectForm: FormGroup;
  statusProject: string[] = ['Stable', 'Critical', 'Finished'];

  ngOnInit(): void {
    this.projectForm = new FormGroup({
      'name': new FormControl(null, Validators.required, this.forbiddenProjectName),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'status': new FormControl(null),
    });
  }

  forbiddenProjectName(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'Test')
          resolve({'projectNameIsForbidden': true});
        else resolve(null);
      }, 1500);
    });

    return promise;
  }

  onSubmit() {
    console.log(this.projectForm);
  }
}
