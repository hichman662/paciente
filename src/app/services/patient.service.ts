/* eslint-disable max-len */
import { PatientAccess } from './../models/patientAccess.model';
/* eslint-disable @typescript-eslint/ban-types */
import { Patient } from './../models/patient.model';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {of, Observable} from 'rxjs';
import { RelatedPerson } from '../models/relatedPerson.model';
import { Practitioner } from '../models/practitioner.model';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

    patient: Patient;

constructor(private http: HttpClient) {

}

// Patient
public getAllPatient(): Observable<object>{
  return this.http.get(`${environment.base_url}/Patient/ReadAll`);
}

public getPatientById( uid: number): Observable<object>{
  if (!uid) { uid = null; }
  return this.http.get <Patient>(`${environment.base_url}/Patient/${uid}` );
}

public getPatientByIdScenario( uid: number): Observable<object>{
  if (!uid) { uid = null; }
  return this.http.get <Patient>(`${environment.base_url}/Patient/PatientScenario?idIoTScenario=${uid}` );
}

public getPatientByEmail( email: string): Observable<object>{
  return this.http.get <Patient>(`${environment.base_url}/Patient/DamePorEmail?p_email=${email}` );
 }

public createPatient( data: Patient ): Observable<object> {
  return this.http.post(`${environment.base_url}/Patient/New_`, data);
}

// Get All PATIENT PROFILE
public getAllPatientProfile(): Observable<object>{
  return this.http.get(`${environment.base_url}/PatientProfile/ReadAll`);
}

// Assign Patient profile to patient
public assignPatientProfile(patientId: number, patientProfileId: number): Observable<object> {
  return this.http.put(`${environment.base_url}/Patient/AssignPatientProfile?p_patient_oid=${patientId}&p_patientprofile_oid=${patientProfileId}`,null);
}

// Practitioner
public getPractitionerById( uid: number): Observable<object>{
  if (!uid) { uid = null; }
  return this.http.get <Practitioner>(`${environment.base_url}/Practitioner/${uid}` );
}
public getPractitionerByIdScenario( uid: number): Observable<object>{
  if (!uid) { uid = null; }
  return this.http.get <Practitioner>(`${environment.base_url}/Practitioner/Practitioners?idIoTScenario=${uid}` );
}


/* // Related Person
public getAllRelatedPerson(): Observable<object>{
  return this.http.get(`${environment.base_url}/RelatedPerson/ReadAll`);
} */
public getRelatedPersonById( uid: number): Observable<object>{
  if (!uid) { uid = null; }
  return this.http.get <RelatedPerson>(`${environment.base_url}/RelatedPerson/${uid}` );
}
public getRelatedPersonByIdScenario( uid: number): Observable<object>{
  if (!uid) { uid = null; }
  return this.http.get <RelatedPerson>(`${environment.base_url}/RelatedPerson/RelatedPeople?idIoTScenario=${uid}` );
}
public createRelatedPerson( data: RelatedPerson ): Observable<object> {
  return this.http.post(`${environment.base_url}/RelatedPerson/New_`, data);
}

public deleteRelatedPerson(uid) {
  return this.http.delete(`${environment.base_url}/RelatedPerson/Destroy?p_relatedperson_oid=${uid}`);
}


// Patient Access
public getAllPatientAccess(): Observable<object>{
  return this.http.get(`${environment.base_url}/PatientAccess/ReadAll`);
}
public getPatientAccessById( uid: number): Observable<object>{
  if (!uid) { uid = null; }
  return this.http.get <PatientAccess>(`${environment.base_url}/PatientAccess/${uid}` );
}
public getPatientAccessByIdScenario( uid: number): Observable<object>{
  if (!uid) { uid = null; }
  return this.http.get <PatientAccess>(`${environment.base_url}/PatientAccess/PatientAccessScenario?idIoTScenario=${uid}` );
}
public createPatientAccess( data: RelatedPerson ): Observable<object> {
  return this.http.post(`${environment.base_url}/PatientAccess/New_`, data);
}

public deletePatientAccess(uid) {
  return this.http.delete(`${environment.base_url}/PatientAccess/Destroy?p_patientaccess_oid=${uid}`);
}

public getAccessModeByIdPatientprofile( uid: number): Observable<object>{
  if (!uid) { uid = null; }
  return this.http.get <PatientAccess>(`${environment.base_url}/AccessMode/ProfileAccessMode?idPatientProfile=${uid}` );
}

// Assign Access mode to Patient Access
public assignAccessModeToPatientAccess(patientAccess: number, accessMode: number): Observable<object> {
  return this.http.put(`${environment.base_url}/PatientAccess/AssignAccessMode?p_patientaccess_oid=${patientAccess}&p_accessmode_oid=${accessMode}`,null);
}
}
