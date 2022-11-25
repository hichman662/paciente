import { OnInit } from '@angular/core';
/* eslint-disable @typescript-eslint/naming-convention */
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router, RouterEvent } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { FirebaseX } from '@awesome-cordova-plugins/firebase-x/ngx';
import { FCM } from '@ionic-native/fcm/ngx';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  active = '';
  isModalOpen = false;
  pushes: any = [];
  NAV = [
    {
      name: 'About',
      link: '/nav/about',
      icon: 'person-circle'
    },
    {
      name: 'Logout',
      link: '/login',
      icon: 'exit'
    }
  ];


  public idleState = 'NotStarted';
  timedOut = false;
  lastPing?: Date = null;
  showModal = false;
  handlerMessage = '';
  roleMessage = '';
  constructor(
    private fcm: FCM,
    public plt: Platform,
    public storage: Storage,
    private router: Router,
    public idle: Idle,
     private keepalive: Keepalive,
     private alertController: AlertController,
     private firebaseX: FirebaseX) {
    this.storage.create();
    this.router.events.subscribe((event: RouterEvent) => {
      this.active = event.url;
    });



     // sets an idle timeout of 10 seconds.
     idle.setIdle(1000);

     // sets a timeout period of 10 seconds. after 20 seconds of inactivity, the user will timed out.
     idle.setTimeout(10000);

     // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
     idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

 idle.onIdleEnd.subscribe(() => this.idleState = 'No longer idle.');

 idle.onTimeout.subscribe(() => {
        this.idleState = 'Timed out!';
       this.timedOut = true;
       console.log(this.idleState);
       this.router.navigate(['/']);
       this.showModal = false;
 });
 idle.onIdleStart.subscribe(() => {this.idleState = 'idle state';
   this.showModal = true;
   this.presentAlert();
 });


 idle.onTimeoutWarning.subscribe((countdown) => {

   //this.idleState = 'You will time out in ' + countdown + ' seconds!';
   this.idleState =  countdown + ' seconds!';
 } );     // sets the ping interval to 15 seconds

 // sets the ping interval to 15 seconds
 keepalive.interval(15);

 keepalive.onPing.subscribe(() => this.lastPing = new Date());
 console.log(this.lastPing);
 this.reset();

//Notifications

this.plt.ready()
.then(() => {
  this.fcm.onNotification().subscribe(data => {
    if (data.wasTapped) {
      console.log('Received in background');
    } else {
      console.log('Received in foreground');
    };
  });

  this.fcm.onTokenRefresh().subscribe(token => {
    // Register your new token in your back-end if you want
    // backend.registerToken(token);
  });
});


  }



ngOnInit(): void {
      this.firebaseX.getToken()
      .then(token => console.log(`The token is ${token}`)) // save the token server-side and use it to push notifications to this device
      .catch(error => console.error('Error getting token', error));

    this.firebaseX.onMessageReceived()
      .subscribe(data => console.log(`User opened a notification ${data}`));

    this.firebaseX.onTokenRefresh()
      .subscribe((token: string) => console.log(`Got a new token ${token}`));
}

 reset() {
     this.idle.watch();

     this.idleState = 'Started.';
     this.timedOut = false;
     this.showModal = false;
   }

   async presentAlert() {

     const alert = await this.alertController.create({

       header:  `Idle timer expired; Session has been idle over its time limit. Plaese press continue to continue session.`,
       buttons: [
         {
           text: 'Continue',
           role: 'cancel',
           handler: () => {
             this.handlerMessage = 'Alert canceled';
             this.reset();
             this.showModal = false;
           },
         },
         {
           text: 'Logout',
           role: 'confirm',
           handler: () => {
             this.handlerMessage = 'Alert confirmed';
             this.router.navigate(['/']);
           },
         },
       ],
     });

     await alert.present();
     setTimeout(()=>{
       alert.dismiss();
   }, 10000);

     const { role } = await alert.onDidDismiss();
     this.roleMessage = `Dismissed with role: ${role}`;


   }

   setOpen(isOpen: boolean) {
     this.showModal = isOpen;
   }

   subscribeToTopic() {
    this.fcm.subscribeToTopic('enappd');
  }
  getToken() {
    this.fcm.getToken().then(token => {
      // Register your new token in your back-end if you want
      // backend.registerToken(token);
    });
  }
  unsubscribeFromTopic() {
    this.fcm.unsubscribeFromTopic('enappd');
  }
}

