import { Patient } from 'src/app/models/patient.model';
import { PatientService } from './../services/patient.service';
/* eslint-disable no-debugger */
/* eslint-disable @typescript-eslint/naming-convention */
import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public formSubmit = false;
  public waiting = false;
  public token = '';
  public patientName: '';
  public loginForm = this.fb.group({
    Email: ['', [Validators.required, Validators.email]],
    Pass: ['', Validators.required ]
  });
  constructor(private router: Router,
    private storage: Storage,
    private fb: FormBuilder,
    private userService: UserService,
    private patientService: PatientService) { }

async  ngOnInit() {
   await this.storage.clear();
  }

  async start() {
    this.router.navigateByUrl('/tabs', { replaceUrl:true });
  }

   login(): any {
    this.formSubmit = true;
    if (!this.loginForm.valid) {
      console.warn('error in the form');
      return;
    }
    this.waiting = true;
    this.userService.login( this.loginForm.value)
      .subscribe( (res: any) => {
        this.storage.set('email', this.loginForm.get('Email').value);
        this.waiting = false;
        this.storage.set('token', res);

        this.getEscenarioDePaciente(res);
      }, (err: any) => {
        console.warn('Error respuesta api', err);
        if(err.status === 401) {
          Swal.fire({
            title: 'Error!',
            text: err.statusText || 'The action could not be completed, please try again later',
            icon: 'error',
            confirmButtonText: 'Ok',
            toast: true
          });
        } else {
          Swal.fire({
            title: 'Error!',
            text: err.statusText || 'The action could not be completed, please try again later',
            icon: 'error',
            confirmButtonText: 'Ok',
            toast: true
          });
        }
        this.waiting = false;
      });

    }

  campoValido(campo: string ){
    return this.loginForm.get(campo)?.valid || !this.formSubmit;
  }

getEscenarioDePaciente(token: string){
    this.userService.getEscenarioByCliente(token)
    .subscribe((res: number)=>{

      if (res != null){
        this.storage.set('idScenario',res);
        this.userService.setIdEscenario(res);
        this.callingPatient(this.loginForm.get('Email').value);
        this.router.navigateByUrl('/tabs', { replaceUrl:true });
      }
    });
  }


  callingPatient(email: string){
    this.patientService.getPatientByEmail(email)
    .subscribe((res: Patient ) => {
      console.log(res);
      this.storage.set('idPatient',res[0].UserData.Id);
       this.storage.set('NamePatient',res[0].UserData.Name);
    }, (err) => {
      console.log(err);
    });
  }

}
