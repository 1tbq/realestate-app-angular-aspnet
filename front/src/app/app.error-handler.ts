import { ErrorHandler, Inject, NgZone, Injectable, isDevMode} from '@angular/core'
import { ToastyService } from "ng2-toasty";
export class AppErrorHandler implements ErrorHandler {

  constructor( @Inject(ToastyService) private toastyService: ToastyService,
    @Injectable() private ngZone: NgZone) { }

  handleError(error: any): void {
    this.ngZone.run(() => {
      this.toastyService.error({
        title: 'Error',
        msg: 'An unexpexted error occured',
        theme: 'bootstrap',
        showClose: true,
        timeout: 5000
          });
     });
         throw error;
      }
    }

