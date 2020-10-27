import { ToastyService } from 'ng2-toasty';
import { PropertyService } from './../../services/property.service';
import { Component, OnInit, ElementRef, ViewChild, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PhotoService } from "../../services/photo.service";
import { ProgressService } from "../../services/progress.service";

@Component({
  selector: 'view-property-property',
  templateUrl: './view-property.component.html'
})
export class ViewPropertyComponent implements OnInit{
 
  //in oder to link the fileinput which of elementref we decorate it with viewchild
  @ViewChild('fileInput') fileInput: ElementRef;
  propertyId: number;
  photos: any[];
  property: any;
  progress: any;
  constructor(
    private zone: NgZone,
    private route: ActivatedRoute,
    private router: Router,
    private toasty: ToastyService,
    private propertyService: PropertyService,
    private photoService: PhotoService,
    private progressService:ProgressService) {
    route.params.subscribe(p => {
      this.propertyId = +p['id'];
      if (isNaN(this.propertyId) || this.propertyId <= 0) {
        router.navigate(['/properties']);
        return;
      }
      });
    }
  
  ngOnInit() {
        this.propertyService.getProperty(this.propertyId)
      .subscribe(
      prop => this.property = prop ,
        err => {
          if (err.status == 404) {
            this.router.navigate(['/properties']);
            return;
          }
      });
        this.photoService.getPhotos(this.propertyId)
          .subscribe(photos => this.photos = photos);


  }// End of ngOnInit()


  delete() {
    if (confirm("Are you sure?")) {
      this.propertyService.deleteProperty(this.property.id)
        .subscribe(x => {
          this.router.navigate(['/properties']);
        });
    }
  }//End of delete

  //upload photo
  uploadPhoto() {
    this.progressService.startTracking()
      .subscribe(progress => {
        console.log(progress);
        this.zone.run(() => {
          this.progress = progress;
        });
      },
      null,
      () => { this.progress = null; });
    var nativeElement: HTMLInputElement = this.fileInput.nativeElement;
    var file = nativeElement.files[0];
    nativeElement.value = '';
        this.photoService.upload(this.propertyId, file)
      .subscribe(photo => {
        this.photos.push(photo);
      });
  }

}//End of component


