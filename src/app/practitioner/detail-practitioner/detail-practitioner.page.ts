import { UserData } from 'src/app/models/userData.model';
import { UserService } from './../../services/user.service';
import { PatientService } from './../../services/patient.service';
import { PractitionerData } from './../../models/practitionerData.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-practitioner',
  templateUrl: './detail-practitioner.page.html',
  styleUrls: ['./detail-practitioner.page.scss'],
})
export class DetailPractitionerPage implements OnInit {

  public practitionerName: '';
  public practitionerDescrip: '';
  public practitionerData: PractitionerData;
  public practitioner: UserData;
  segmentModel = 'details';
  load = false;
  private idPassedByURL: number = null;
  constructor(
    private patientService: PatientService,

    private userService: UserService,
    private route: ActivatedRoute

  ) { }


  ngOnInit() {
    this.load = false;
    this.idPassedByURL = this.route.snapshot.params.id;
  /*   this.patientService.getPractitionerById(this.idPassedByURL)
    .subscribe((res: any ) => {
      console.log(res);

    if(res != null){
       this.practitionerName = res.Name;
       this.practitionerDescrip = res.Description;
       this.practitionerData = res.PractitionerData;
       this.load = true;
    }
    }, (err) => {
      console.log(err);
    });
  } */

  console.log(this.idPassedByURL);
  this.userService.getUserById(this.idPassedByURL)
  .subscribe((res: UserData ) => {
    console.log(res);
    this.load = true;
     this.practitioner = res;
     console.log(this.practitioner);

  }, (err) => {
    console.log(err);
  });
  }

}
