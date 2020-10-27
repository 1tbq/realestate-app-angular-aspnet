import { Component, OnInit } from '@angular/core';
import { PropertyService } from "../../services/property.service";
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ToastyService } from "ng2-toasty";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {
  properties;

  hidden: boolean = true;

    myForm: FormGroup;

    id: number = 0;
    purpose: string = '';
    description: string = '';
    title: string = '';
    price: number = 0;
    area: string = '';
    bedrooms: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    bathrooms: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    propertyType: string = '';
    cities: string[]=["Karachi","Hyderabad","Gawadar","Quetta","Lahore","Peshawar","Multan","Sakhar","Abbottabad"];
    location: string = '';
    Homes: string [] = ["House","Flat", "upper - portion", "lower - portion", "farm - house", "pent - house", "Plot File", "Plot File", "Form", "Shop", "Warehouse", "Factory", "Building"];


 constructor(
     private propertyService: PropertyService,
     private fb: FormBuilder,
     private toastyService: ToastyService,
     private route: ActivatedRoute,
     private router: Router
 ) {

   route.params.subscribe(p => {
     this.id = +p['id'] || 0;
   });

   this.myForm = fb.group({
         'purpose': ['sale',Validators.required],
         'city': [null, Validators.required],
         'location': [null, Validators.required],
         'title': [null, Validators.required],
         'price': [null, Validators.required],
         'area': [null, Validators.required],
         'bedrooms': [null, Validators.required],
         'bathrooms': [null, Validators.required],
         'description': [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(500)])],
         'propertyType': [null,Validators.required]

   });



 }


 ngOnInit() {

      //this.propertyService.getProperties()
      //    .subscribe(properties => {
      //      this.properties = properties;
      //      console.log(properties);
      //});

      //this.propertyService.getProperty(this.id)
      //  .subscribe(property => {
      //    this.myForm.patchValue({
      //      id:property.id,
      //      city: property.city,
      //      area: property.area,
      //      purpose: property.purpose,
      //      price: property.price,
      //      title: property.title,
      //      location: property.location,
      //      bedrooms: property.bedrooms,
      //      bathrooms: property.bathrooms,
      //      description: property.description,
      //      propertyType: property.propertyType

      //      // formControlName2: myValue2 (can be omitted)
      //    }, err => {
      //      if (err.status == 404) this.router.navigate(['page-not-found'])
      //      });

      //  });
  }


  onSubmit(form) {
    this.purpose = form.purpose;
      this.description = form.description;
      this.title = form.name;
      this.price = form.price;
      this.area = form.area;
      this.propertyType = form.propertyType;
      this.cities = form.city;
      this.location = form.location;
      this.bedrooms = form.bedrooms;
      this.bathrooms = form.bathooms;

      if (this.id) {
        this.propertyService.updateProperty(form, this.id)
          .subscribe(x => {
            this.toastyService.success({
              title: 'Success',
              msg: 'This property was updated successfuly',
              theme: 'bootstrap',
              showClose: true,
              timeout: 5000
            });
          });
      } else {
        this.propertyService.createProperty(form)
          .subscribe(x => console.log(x));
      }

  }

  deleteProperty(id) {
    if (confirm("Are you sure?")) {
      this.propertyService.deleteProperty(id)
        .subscribe(x => {
          this.router.navigate(['/home']);
        });
    }
  }
 }
