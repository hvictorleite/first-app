export class CounterService {
  private activateActions: number = 0;
  private inactivateActions: number = 0;

  addInactivateAction(): void {
    console.log(`Active -> Inactive actions: ${++this.inactivateActions}`);
  }

  addActivateAction(): void {
    console.log(`Inactive -> Active actions: ${++this.activateActions}`);
  }
}
