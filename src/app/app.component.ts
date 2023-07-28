import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  clock: number = 0;
  oddNumbers: number[] = [];
  evenNumbers: number[] = [];

  // serverElements = [ {type: 'blueprint', name: 'Server test', content: 'Just a test!'} ];

  // onServerAdded(serverData: {serverName: string, serverContent: string}) {
  //   this.serverElements.push({
  //     type: 'server',
  //     name: serverData.serverName,
  //     content: serverData.serverContent
  //   });
  // }

  // onBlueprintAdded(blueprintData: {serverName: string, serverContent: string}) {
  //   this.serverElements.push({
  //     type: 'blueprint',
  //     name: blueprintData.serverName,
  //     content: blueprintData.serverContent
  //   });
  // }

  // onChangeFirst() {
  //   this.serverElements[0].name = 'Changed!';
  // }

  // onDestroyFirst(): void {
  //   this.serverElements.splice(0, 1);
  // }

  onGameStarted(seconds: number): void {
    this.clock = seconds;
    (seconds !== 0 && seconds % 2 === 0) ?
      this.evenNumbers.push(seconds) : this.oddNumbers.push(seconds);
  }
}
