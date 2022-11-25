import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from    '@angular/platform-browser/animations';
import { MatExpansionModule } from '@angular/material/expansion';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { Platform } from '@ionic/angular';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { FirebaseX } from '@awesome-cordova-plugins/firebase-x/ngx';
import { FCM } from '@ionic-native/fcm/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    NgIdleKeepaliveModule.forRoot()
    ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, SpeechRecognition, TextToSpeech, Platform, FirebaseX, FCM],
  bootstrap: [AppComponent],
})
export class AppModule {}
