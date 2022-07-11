import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { File } from "../models";

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(
    private http: HttpClient,
  ) { }

  rootURL = '/api';

  getFiles(): Observable<File[]> {
    return this.http.get<File[]>(`${this.rootURL}/files`);
  }

  getFileContent(name: string): Observable<any> {
    return this.http.get(`${this.rootURL}/files/${name}`);
  }
}
