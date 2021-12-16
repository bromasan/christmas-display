import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  // private REST_API_SERVER = "http://christmasdisplay.s3-website-us-east-1.amazonaws.com/api";
  // private REST_API_SERVER = "https://lpexkom76g.execute-api.us-east-1.amazonaws.com/dev";
  private REST_API_SERVER = "http://localhost:3000/dev";

  constructor(private httpClient: HttpClient) { }

  public get(target: string){
    const endpoint = this.REST_API_SERVER + '/' + target;
    return this.httpClient.get(endpoint, 
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
      }).pipe(
        map(this.parseResponse)
      );;
  }

  public post(target: string, body: any) {
    const endpoint = this.REST_API_SERVER + '/' + target;
    return this.httpClient.post(endpoint, body, 
    {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }).pipe(
      map(this.parseResponse)
    );
  }

  public put(target: string, body: any) {
    const endpoint = this.REST_API_SERVER + '/' + target;
    return this.httpClient.put(endpoint, body, 
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
      }).pipe(
        map(this.parseResponse)
      );;
  }

  public delete(target: string) {
    const endpoint = this.REST_API_SERVER + '/' + target;
    return this.httpClient.delete(endpoint, 
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
      }).pipe(
        map(this.parseResponse)
      );;
  }

  public parseResponse(res: any) {
    let body = res.body;
    try {
      body = JSON.parse(body);
    } catch (ex) {
      console.error(ex);
    }
    return body;
  }
}
