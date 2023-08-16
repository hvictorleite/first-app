import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ServersService } from '../servers.service';
// import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';

  // queryParamsSubscription: Subscription;
  // fragmentSubscription: Subscription;

  constructor(private serversService: ServersService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    // this.queryParamsSubscription = this.route.queryParams.subscribe(() => {});
    // this.fragmentSubscription = this.route.fragment.subscribe(() => {});
    console.log('queryParams:');
    console.log(this.route.snapshot.queryParams);
    console.log('fragment: ' + this.route.snapshot.fragment);

    this.server = this.serversService.getServer(1);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
  }

}
