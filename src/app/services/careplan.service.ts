/* eslint-disable max-len */
import { VitalSign } from './../models/vitalSign.model';

/* eslint-disable @typescript-eslint/ban-types */

import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {of, Observable} from 'rxjs';
import { CarePlan } from '../models/carePlan.model';
import { CareActivity } from '../models/careActivity.model';




@Injectable({
  providedIn: 'root'
})
export class CarePlanService {
  idUser: number;
  color: string;
constructor(private http: HttpClient) {

}
// Care Plan Template By id PatientProfile
/* public getCarePlantemplateByIdPatientProfile( uid: number): Observable<object>{
  if (!uid) { uid = null; }
  return this.http.get <CarePlanTemplate>(`${environment.base_url}/CarePlanTemplate/PatientProfileCarePlanTemplate?idPatientProfile=${uid}` );
} */

public getColor(): string{
  return this.color;
}

public setColor(color: string){
this.color = color;
}

// Care Plan
public getAllCarePlan(): Observable<object>{
  return this.http.get(`${environment.base_url}/CarePlan/ReadAll`);
}

public getCarePlanById( uid: number): Observable<object>{
  if (!uid) { uid = null; }
  return this.http.get <CarePlan>(`${environment.base_url}/CarePlan/${uid}` );
}

public getCarePlanByIdScenario( uid: number): Observable<object>{
  if (!uid) { uid = null; }
  return this.http.get <CarePlan>(`${environment.base_url}/CarePlan/CarePlanScenario?idIoTScenario=${uid}` );
}
/* public createCarePlan( data: CarePlan ): Observable<object> {
  return this.http.post(`${environment.base_url}/CarePlan/New_`, data);
} */

public deleteCarePlan(uid) {
  return this.http.delete(`${environment.base_url}/CarePlan/Destroy?p_careplan_oid=${uid}`);
}

// Vital Signs

public getAllVitalSign(): Observable<object>{
  return this.http.get(`${environment.base_url}/VitalSign/ReadAll`);
}

public getVitalSignById( uid: number): Observable<object>{
  if (!uid) { uid = null; }
  return this.http.get <VitalSign>(`${environment.base_url}/VitalSign/${uid}` );
}

public getVitalSignByIdScenario( uid: number): Observable<object>{
  if (!uid) { uid = null; }
  return this.http.get <VitalSign>(`${environment.base_url}/VitalSign/VitalSignsScenario?idIoTScenario=${uid}` );
}
/* public createVitalSign( data: CarePlan ): Observable<object> {
  return this.http.post(`${environment.base_url}/VitalSign/New_`, data);
} */

public deleteVitalSign(uid) {
  return this.http.delete(`${environment.base_url}/VitalSign/Destroy?p_vitalsign_oid=${uid}`);
}


// Care Activities

public getAllCareActivities(): Observable<object>{
  return this.http.get(`${environment.base_url}/IMCareActivity/ReadAll`);
}

public getCareActivityById( uid: number): Observable<object>{
  if (!uid) { uid = null; }
  return this.http.get <CareActivity>(`${environment.base_url}/IMCareActivity/${uid}` );
}

public getCareActivityByIdScenario( uid: number): Observable<object>{
  if (!uid) { uid = null; }
  return this.http.get <CareActivity>(`${environment.base_url}/IMCareActivity/CareActivitiesScenario?idIoTScenario=${uid}`);
}

public getCareActivityByTimeByIdScenario( uid: number): Observable<object>{
  if (!uid) { uid = null; }
  return this.http.get <CareActivity>(`${environment.base_url}/IMCareActivity/ReadByTime?idscenario=${uid}`);
}

public changeStateNotification( id: number , newState: number, idUser: number): Observable<object> {
  return this.http.post(`${environment.base_url}/IMCareActivity/ChangeState?p_oid=${id}&originstate=1&targetstate=${newState}&p_iduser=${idUser}`,null);
}


/* public createCareActivity( data: CareActivity ): Observable<object> {
  return this.http.post(`${environment.base_url}/IMCareActivity/New_`, data);
}
 */
// Appointment
public getAppointmentByIdCareActivity( uid: number): Observable<object>{
  if (!uid) { uid = null; }
  return this.http.get <any>(`${environment.base_url}/IMAppointment/AppointmentCareActitivy?idIMCareActivity=${uid}` );
}

// Medication
public getMedicationByIdCareActivity( uid: number): Observable<object>{
  if (!uid) { uid = null; }
  return this.http.get <any>(`${environment.base_url}/IMMedication/MedicationCareActivity?idIMCareActivity=${uid}` );
}

//Nutrition Order
public getNutritionyByIdCareActivity( uid: number): Observable<object>{
  if (!uid) { uid = null; }
  return this.http.get <any>(`${environment.base_url}/IMNutritionOrder/NutritionOrderCareActivity?idIMCareActivity=${uid}` );
}


//Communication
public getCommunicationByIdCareActivity( uid: number): Observable<object>{
  if (!uid) { uid = null; }
  return this.http.get <any>(`${environment.base_url}/IMCommunication/CommunicationCareActivity?idIMCareActivity=${uid}` );
}

// Goal
public getGoalByIdCarePlan( uid: number): Observable<object>{
  if (!uid) { uid = null; }
  return this.http.get <any>(`${environment.base_url}/IMGoal/GoalsCarePlan?idCarePlan=${uid}` );
}

//Target
public getTargetByIdCarePlan( uid: number): Observable<object>{
  if (!uid) { uid = null; }
  return this.http.get <any>(`${environment.base_url}/IMTarget/TargetsCarePlan?idCarePlan=${uid}` );
}

//
// Assign Care Plan Template to Care Plan
/* public assignCarePlanTemplateToCarePlan(carePlanId: number, carePlanTemplateId: number): Observable<object> {
  return this.http.put(`${environment.base_url}/CarePlan/AssignCarePlan?p_careplan_oid=${carePlanId}&p_template_oid=${carePlanTemplateId}`,null);
}
 */
}
