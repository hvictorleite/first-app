import { Observable } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ServersService } from '../servers.service';
import { Subscription } from 'rxjs';
import { CanComponentDeactivate } from './can-deactivate-guard.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, OnDestroy, CanComponentDeactivate {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit = false;
  changesSaved = false;

  paramsSubscription: Subscription;
  queryParamsSubscription: Subscription;

  constructor(private serversService: ServersService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.queryParamsSubscription = this.route.queryParams
      .subscribe((queryParams: Params) => {
        this.allowEdit = queryParams['allowEdit'] === '1' ? true : false;
      });

    this.paramsSubscription = this.route.params.subscribe(
      (params: Params) => {
        this.server = this.serversService.getServer(+params['id']);
        this.serverName = this.server.name;
        this.serverStatus = this.server.status;
      }
    );
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changesSaved = true;
    this.router.navigate(['../'], {relativeTo: this.route, queryParams: {allowEdit: 1}, fragment: 'loading'});
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.allowEdit)
      return true;
    if ((this.serverName !== this.server.name || this.serverStatus !== this.server.status) && !this.changesSaved)
      return confirm('Do you want to discard the changes?');
    else
      return true;
  }

  ngOnDestroy() {
    this.queryParamsSubscription.unsubscribe();
    this.paramsSubscription.unsubscribe();
  }
}
