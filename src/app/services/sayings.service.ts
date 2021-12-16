import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class SayingsService {

  constructor(
    private dataService: DataService
  ) { }

  public getActiveSayings(username: string) {
    return this.dataService.get(`grabAllActiveSayings/${username}`);
  }

  public getAllSayings(username: string) {
    return this.dataService.get(`getSayingsByUser/${username}`);
  }

  public addSaying(user: string, message: string) {
    return this.dataService.post(`addSaying`, { message, user });
  }

  public setSaying(sayingId:string[], username: string) {
    return this.dataService.post(`setSaying`,  {sayingId, username});
  }

  public setToShuffle(username: string) {
    return this.dataService.post(`setToShuffle`, { username });
  }

  public deleteSaying(sayingId: string) {
    return this.dataService.delete(`deleteSaying/${sayingId}`);
  }
}
