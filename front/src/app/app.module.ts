import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule,Routes } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SlideshowComponent } from './components/slideshow/slideshow.component';
import { PropertyListComponent } from './components/property-list/property-list.component';
import { PropertySearchFormComponent } from './components/property-search-form/property-search-form.component';
import { AddPropertyComponent } from './components/add-property/add-property.component';
import {PropertyService} from "./services/property.service";
import { HttpModule, BrowserXhr} from "@angular/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ToastyModule } from 'ng2-toasty';
import { AppErrorHandler } from "./app.error-handler";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { PaginationComponent } from "./components/shared/pagination.component";
import { ViewPropertyComponent } from "./components/view-property/view-property.component";
import { PhotoService } from "./services/photo.service";
import { BrowserXhrWithProgress, ProgressService } from "./services/progress.service";
import { AuthService } from "./services/auth.service";
import { ProfileComponent } from "./components/user-profile/profile.component";
import { AdminComponent } from './components/admin/admin.component';
import { AuthGuard } from './services/auth-gaurd.service';
import { AdminGuard } from './services/admin.gaurd';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { Http, RequestOptions} from '@angular/http';



const appRoutes: Routes = [
  { path: '', redirectTo: 'properties', pathMatch: 'full' },
  { path: 'property/new', component: AddPropertyComponent },
  { path: 'slideshow', component: SlideshowComponent},
    { path: 'property/edit/:id', component: AddPropertyComponent },
    { path: 'property/:id', component: ViewPropertyComponent },
    { path: 'properties', component: PropertyListComponent },
    { path: 'page-not-found', component: PageNotFoundComponent },
    { path: 'user-profile', component: ProfileComponent },
    {
      path: 'admin',
      canActivate: [
        AuthGuard,
        AdminGuard
      ], component: AdminComponent },
    { path: '**', redirectTo: 'home' }

];

/**
 * Create a factory function with configuration values for angular2-jwt.
Add the function to the providers array in your application's @NgModule.
Add a tokenGetter function to the factory function to fetch the Access Token from local storage.
 */
export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenGetter: (() => localStorage.getItem('access_token')),
    globalHeaders: [{'Content-Type':'application/json'}],
  }), http, options);
}

@NgModule({
  declarations: [
      AppComponent,
      NavbarComponent,
     SlideshowComponent,
      AddPropertyComponent,
      PropertyListComponent,
    PropertySearchFormComponent,
    ViewPropertyComponent,
    PageNotFoundComponent, PaginationComponent, ProfileComponent, AdminComponent
  ],
  imports: [HttpModule, ReactiveFormsModule,FormsModule,
    RouterModule.forRoot(appRoutes), ToastyModule.forRoot(),
    BrowserModule, MultiselectDropdownModule
  ],
  providers: [
    AuthGuard,
    AdminGuard,
    PropertyService,
    PhotoService,
    ProgressService,
    AuthService,
    { provide: ErrorHandler, useClass: AppErrorHandler },
    { provide: BrowserXhr, useClass: BrowserXhrWithProgress },
    { provide: AuthHttp,  useFactory: authHttpServiceFactory, deps: [Http, RequestOptions] }
    ],

bootstrap: [AppComponent]
})


export class AppModule { }
