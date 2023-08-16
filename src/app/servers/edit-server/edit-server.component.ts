import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ServersService } from '../servers.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, OnDestroy {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit = false;

  queryParamsSubscription: Subscription;
  // fragmentSubscription: Subscription;

  constructor(private serversService: ServersService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    // this.queryParamsSubscription = this.route.queryParams.subscribe(() => {});
    // this.fragmentSubscription = this.route.fragment.subscribe(() => {});

    this.queryParamsSubscription = this.route.queryParams
      .subscribe((queryParams: Params) => {
        this.allowEdit = queryParams['allowEdit'] === '1' ? true : false;
      });

    this.server = this.serversService.getServer(+this.route.snapshot.params['id']);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
  }

  ngOnDestroy() {
    this.queryParamsSubscription.unsubscribe();
  }
}
