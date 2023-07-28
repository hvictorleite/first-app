import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent {
  @Output() gameStarted = new EventEmitter<number>();

  isGameStarted: boolean = false;
  seconds: number = 0;
  timer: any;

  onStartGame(): void {
    this.isGameStarted = true;
    this.timer = setInterval(() => this.gameStarted.emit(++this.seconds), 1000);
  }

  onPauseGame(): void {
    this.isGameStarted = false;
    clearInterval(this.timer);
  }
}
