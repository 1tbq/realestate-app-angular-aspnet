import { Component, OnInit } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { PropertyService } from "../../services/property.service";
import { MultiselectDropdownModule, IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import { AuthService } from "../../services/auth.service";
@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {


  private readonly PAGE_SIZE = 4;
  queryResult: any = {};
  query: any = {
    pageSize: this.PAGE_SIZE
  };
  cities: string[]=["Karachi","Hyderabad","Gawadar","Quetta","Lahore","Peshawar","Multan","Sakhar","Abbottabad"];

  propertyType: string[];
  columns = [
    { title: 'Title' },
    {title:'Price',key:'price',isSortable:true},
    {title:'Bedroom',key:'bedroom',isSortable:true},
    {title:'Bathroom',key:'bathroom',isSortable:true},
    { title: 'Area', key: 'area', isSortable: true },
    { title: 'City', key: 'city', isSortable: true },
    { title: 'Location', key: 'location', isSortable: true },
  ];

  myCities: IMultiSelectOption[];
  myPropertyType: IMultiSelectOption[];

  constructor(private propertyService: PropertyService, private authService: AuthService) {


  }

  onPageChange(page) {
        this.query.page = page;
        this.populateProperties();
      }

  ngOnInit() {

    this.populateProperties();


       }

  private populateProperties() {
    this.propertyService.getProperties(this.query)
      .subscribe(result =>
        this.queryResult = result);
  }

  onFilterChange() {
    this.query.page = 1;
    this.populateProperties();
  }

  //Resetting Filter
  resetFilter() {
    this.query = {
      page: 1,
      pageSize: this.PAGE_SIZE
    }
    this.populateProperties();
 }

  //Sorting
  sortBy(columnName) {
    if (this.query.sortBy === columnName) {
      this.query.isSortAscending = !this.query.isSortAscending;
    } else {
      this.query.sortBy = columnName;
      this.query.isSortAscending = true;
    }
    this.populateProperties();
  }//End sortBy method

}//End of component
