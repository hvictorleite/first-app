import { Component } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent {
  allowNewServer = false;
  serverCreationStatus = 'No servers was created.';
  serverName = "Test server";
  serverCreated = false;
  servers = ['Testserver', 'Testserver 2'];
  showDetails: boolean = false;
  logs: string[] = [];

  constructor() {
    setTimeout(() => {
      this.allowNewServer = true;
    }, 2000);
  }

  onCreateServer() {
    this.serverCreated = true;
    this.servers.push(this.serverName);
    this.serverCreationStatus = 'Server was created! Your name is ' + this.serverName;
  }

  onDisplayDetails() {
    this.showDetails = !this.showDetails;
    const date = new Date();
    this.logs.push('Nº of times: ' + (this.logs.length + 1) + ' - ' + date.toUTCString());
  }

  onUpdateServerName(event: any) {
    this.serverName = event.target.value;
  }

  getBackgroundColor(i: number) {
    return i >= 4 ? 'blue' : '';
  }
}
