import {Inject, Injectable} from '@angular/core';
import { Http } from "@angular/http";
import 'rxjs/add/operator/map';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class PropertyService {
  private readonly propertyEndPoints = 'http://localhost:50035/api/properties';

  constructor(private http: Http, public authHttp: AuthHttp) { }

  //get all properties
  getProperties(filter) {
    return this.http.get(this.propertyEndPoints + '?' + this.toQueryString(filter) )
          .map(res => res.json());
  }

  //toQueryString Method
  toQueryString(object) {
    var parts = [];
    for (var property in object) {
      var value = object[property];
      if (value != null && value != undefined)
        parts.push(encodeURIComponent(property) + '=' + encodeURIComponent(value));
    }
    return parts.join('&');
  }

  //create property
  createProperty(myForm) {
    return this.authHttp.post(this.propertyEndPoints, myForm)
              .map(res => res.json());

  }

  //get single property
     getProperty(id) {
       return this.http.get(this.propertyEndPoints +'/' + id)
         .map(res => res.json());
  }

  //update Property
     updateProperty(myForm, id) {
       return this.authHttp.put(this.propertyEndPoints + id, myForm)
         .map(res => res.json());

     }

  //delete Property
     deleteProperty(id) {
       return this.authHttp.delete(this.propertyEndPoints + '/' + id)
         .map(res => res.json());
            }


}
