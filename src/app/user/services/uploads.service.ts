// /**
//  * Created by Hiren on 18-06-2017.
//  */
//
// import { Injectable } from "@angular/core";
// // import {Http,Headers} from "@angular/http";
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { environment } from "../../../environments/environment";
// import { ContestHistory } from "../models/contest";
// @Injectable()
// export class UploadsService {
//
//   constructor(private http: HttpClient) {
//
//   }
//
//   getToken(): string {
//     return environment.token;
//   }
//
//   getHeaders(): HttpHeaders {
//     let headers = new HttpHeaders();
//     headers.append('content-type', 'application/json');
//     if (this.getToken()) {
//       headers.append('Authorization', 'Bearer ' + this.getToken());
//     }
//     return headers;
//   }
//
//   // uploadContests(fileList) {
//   //   let file: File = fileList[0];
//   //   let formData: FormData = new FormData();
//   //   formData.append('uploadFile', file, file.name);
//   //   return this.http.post(environment.api_end_point + 'api/uploadContest', formData, {
//   //     headers: new Headers({
//   //       'Content-Type': 'multipart/form-data',
//   //       'Accept': 'application/json',
//   //       'Authorization': 'Bearer ' + this.getToken()
//   //     })
//   //   })
//   //     .map(res => res.json());
//   // }
//   //
//   // downloadFile(contestHistory: ContestHistory) {
//   //   return this.http.get('https://api.dfsportgod.com/' + 'uploads/' + contestHistory.generated_name)
//   //     .map(res => res);
//   // }
//   //
//   // getUploads() {
//   //   return this.http.get(environment.api_end_point + 'api/contest/history', { headers: new Headers({ 'Authorization': 'Bearer ' + this.getToken() }) })
//   //     .map(res => res.json());
//   // }
//   //
//   // deleteUpload(contestHistory: ContestHistory) {
//   //   return this.http.delete(environment.api_end_point + 'api/contest/history/' + contestHistory._id, { headers: new Headers({ 'Authorization': 'Bearer ' + this.getToken() }) })
//   //     .map(res => res.json());
//   // }
//
// }
