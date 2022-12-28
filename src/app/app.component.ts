import { Component } from '@angular/core';
import { LoaderService } from './shared/utilities/loader/services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'reativeFormCrudProject';
  constructor(public loaderservice:LoaderService){}
}
