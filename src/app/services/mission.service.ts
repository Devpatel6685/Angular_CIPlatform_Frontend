import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponseDTO } from '../models/apiresponse-model';
import { baseAPIUrl, endPoint } from '../Common/constant';
import { AddToFavouriteDTO, MissionSearchDTO } from '../models/mission-listing.model';

@Injectable({
  providedIn: 'root'
})
export class MissionService {
  constructor(private httpClient: HttpClient) { }

  GetMissionsByFilter(bodyData: MissionSearchDTO): Observable<ApiResponseDTO> {
    return this.httpClient.post<ApiResponseDTO>(baseAPIUrl + endPoint.GetMissionsByFilter, bodyData);
  }

  AddToFavourite(body: AddToFavouriteDTO): Observable<ApiResponseDTO> {
    return this.httpClient.post<ApiResponseDTO>(baseAPIUrl + endPoint.AddToFavourite, body);
  }
}
