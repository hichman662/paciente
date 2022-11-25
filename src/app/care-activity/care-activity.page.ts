import { ToastController, ViewWillEnter } from '@ionic/angular';
import { UserService } from './../services/user.service';
import { Router } from '@angular/router';
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { CarePlanService } from './../services/careplan.service';
import { CareActivityByTime } from './../models/careActivityByTime.model';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-care-activity',
  templateUrl: './care-activity.page.html',
  styleUrls: ['./care-activity.page.scss'],
})
export class CareActivityPage implements OnInit,ViewWillEnter {
  public color: string = 'Pendent';
  load = true;
  textByValue = false;
  loadNotification = false;
  private idScenario: number ;
  public userIdChangeStatus: number;
  public careActivityByTime: CareActivityByTime[] = [];
    constructor(
      private careplanService: CarePlanService,
      private userService: UserService,
    public toastController: ToastController,
    private storage: Storage
    ) { }
  ionViewWillEnter(): void {
    this.storage.get('idScenario').then(async val => {
      this.idScenario = val;
      console.log(this.idScenario);
      if(this.idScenario === null){
        this.idScenario = this.userService.getIdEscenario();
      }else{
        this.callCareActivityByTime() ;
      }
    });

  }

    ngOnInit() {
      this.storage.get('idPatient').then( val => {
        this.userIdChangeStatus = val;
      });
    }

    callCareActivityByTime() {
  this.careplanService.getCareActivityByTimeByIdScenario(this.idScenario)
  .subscribe((res: CareActivityByTime[])=>{
  this.careActivityByTime = res;
  console.log(this.careActivityByTime);
  });

  }
  handleChange(ev,id) {
    if(ev.detail.value === '1'){
      this.presentToast('warning','can not change Complete Activity or Discard Activity to Pendent');
      return;
    }else{

    }
    this.loadNotification = true;
    console.log(id);
    console.log(ev.detail.value);
    if(ev.detail.value === 2){
      this.color='Discard';
    }
    else if((ev.detail.value === 3)){
      this.color='Complete';
    }
this.careplanService.changeStateNotification(id,ev.detail.value,this.userIdChangeStatus)
  .subscribe((res: any)=>{
    this.presentToast('success','The notification state has changed successfully.');
    this.loadNotification = false;

});

}
async presentToast(color: string , message: string) {
  const toast = await this.toastController.create({
    color: `${color}`,
    message: `${message}`,
    duration: 3500,
    position: 'bottom'
  });
  await toast.present();
}


}
