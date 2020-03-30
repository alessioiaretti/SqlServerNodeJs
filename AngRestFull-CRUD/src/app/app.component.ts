import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Unit } from './unit.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AngRestFull-CRUD';
  obsUnit: Observable<Unit[]>; //L’observable che sta in attesa dei dati
  data: Unit[];
  constructor(private http: HttpClient) { } //Dependency injection
  getUnitList(): void {
    //Qui va sostituito l’url con quello delle vostre api
    this.obsUnit = this.http.get<Unit[]>('https://3000-e4dd8951-c918-46c9-b98e-5c8a043256bb.ws-eu01.gitpod.io/users');
    //Mi sottoscrivo all’observable e scrivo la arrow function che riceve i dati
    this.obsUnit.subscribe((data: Unit[]) => {this.data = data;});
  };

  postObserver : Observable<Object>;
  postData : Object;

  addUnit (newUnit: HTMLInputElement, newCost: HTMLInputElement, newHitSpeed: HTMLInputElement): boolean {
      let newData: Unit = new Unit();
      newData.Unit = newUnit.value;
      newData.Cost = newCost.value;
      newData.Hit_Speed = newHitSpeed.value;
      let headers =  {headers: new HttpHeaders().set('Content-Type', 'application/json')};
      this.postObserver = this.http.post('https://3000-e4dd8951-c918-46c9-b98e-5c8a043256bb.ws-eu01.gitpod.io/users', JSON.stringify(newData),headers)

      //Meglio così ma da verificare
      //this.postObserver = this.http.post('http://localhost:3000/users', newData);
      this.postObserver.subscribe(data => this.postData = data);
      return false;
  }
}


