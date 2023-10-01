/// <reference types="@angular/localize" />
import { initializeApp } from "firebase/app";
import { environment } from './environments/environment';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';



platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
 