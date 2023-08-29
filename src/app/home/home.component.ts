import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstObsSubscription: Subscription;

  ngOnInit() {
    const customIntervalObservable = new Observable(observer => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if(count === 2)
          observer.complete();
        if(count > 3)
          observer.error(new Error('Count is greater than 3!'));
        count++;
      }, 1000);
    });

    this.firstObsSubscription = customIntervalObservable.pipe(filter((count: number) => {
      return count > 0;
    }), map((count: number) => {
      return 'Round: ' + (count + 1);
    })).subscribe({
      next: (data: string) => console.log(data),
      error: (error: Error) => console.log(error),
      complete: () => console.log("Finished!")
    });
  }

  ngOnDestroy() {
    this.firstObsSubscription.unsubscribe();
  }
}
