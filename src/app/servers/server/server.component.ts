import { Subscription } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ServersService } from '../servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit, OnDestroy {
  server: {id: number, name: string, status: string};
  paramsSubscription: Subscription;

  constructor(private serversService: ServersService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    const idServer: number = +this.route.snapshot.params['id'];
    this.server = this.serversService.getServer(idServer);

    this.paramsSubscription = this.route.params
      .subscribe((params: Params) => {
        this.server = this.serversService.getServer(+params['id']);
      });
  }

  onEdit(): void {
    this.router.navigate(['edit'], {relativeTo: this.route, queryParamsHandling: 'preserve'});
  }

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
  }
}
