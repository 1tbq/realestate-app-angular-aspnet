
import { Injectable } from '@angular/core';
import { Http } from "@angular/http";

@Injectable()
export class PhotoService {
  private readonly propertyEndPoints = 'http://localhost:50035/api/properties/'; 
  constructor(private http: Http) { }

  //upload photo
  upload(propertyId, photo) {
    var formData = new FormData();
    formData.append('file', photo);
    return this.http.post(this.propertyEndPoints+`${propertyId}/photos`, formData)
     .map(res => res.json());
  }
  //get photos
  getPhotos(propertyId) {
    return this.http.get(this.propertyEndPoints + `${propertyId}/photos`)
          .map(res => res.json());
      }


}
