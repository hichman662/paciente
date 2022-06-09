import { AlertController, LoadingController, IonItemSliding } from '@ionic/angular';
import { Router } from '@angular/router';
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, OnInit } from '@angular/core';
import { PatientService } from '../services/patient.service';
import { RelatedPerson } from '../models/relatedPerson.model';

@Component({
  selector: 'app-rel-person',
  templateUrl: './rel-person.page.html',
  styleUrls: ['./rel-person.page.scss'],
})
export class RelPersonPage implements OnInit {

  public relatedPersons: RelatedPerson[] = [];
  public idScenario: number = 720896;
  relPersonNull= false;

  constructor(
    private patientService: PatientService,
    public router: Router,
    public alertController: AlertController,
    public loadingController: LoadingController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.callRelatedPerson();
/*     this.storage.get('idScenario').then((val) => {
      this.idScenario = val;
      console.log('inja id escenario: ' ,this.idScenario);
      if(this.idScenario != null){
        this.callRelatedPerson();
      }
    }); */

  }

  callRelatedPerson(){
    this.patientService.getRelatedPersonByIdScenario(this.idScenario)
    .subscribe( (res: any) => {
      if(res != null){
      this.relatedPersons = res;
      this.relPersonNull= false;
      }else
      {
        this.relatedPersons = null;
        this.relPersonNull= true;
      }
      console.log(res);
    }, ( err) => {
        console.log(err);
    });
  }
  closeSliding(slidingItem: IonItemSliding){
    slidingItem.close();
  }

  async deleterelatedPerson(slidingItem: IonItemSliding, id: number, name: string){
    slidingItem.close();
    console.log(id);
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Remove Related Person',
      message: `Are you sure you want remove ${name}?`,
      buttons: [  {
        text: 'Cancel',
        handler: () => {
          console.log('Disagree clicked');
        }
      },
      {
        text: 'Agree',
        handler: () => {
          console.log('Agree clicked');
          this.patientService.deleteRelatedPerson(id)
          // tslint:disable-next-line: deprecation
          .subscribe( (res: any) => {
            this.ionViewWillEnter();
          }, ( err) => {
              console.log(err);
          });
        }
      }]
    });

    await alert.present();

  }
}
