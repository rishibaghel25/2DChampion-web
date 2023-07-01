import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CounterService {
  private counter = 0;

  generateNumericId(): string {
    this.counter++;
    return this.counter.toString();
  }
}