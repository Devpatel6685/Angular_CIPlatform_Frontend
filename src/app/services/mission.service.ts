import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponseDTO } from '../models/apiresponse-model';
import { baseAPIUrl, endPoint } from '../Common/constant';
import { AddToFavouriteDTO, CommentDTO, MissionRatingDTO, MissionSearchDTO } from '../models/mission-listing.model';

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

  GetVolunteeringMission(missionId: number, userId: number): Observable<ApiResponseDTO> {
    return this.httpClient.get<ApiResponseDTO>(`${baseAPIUrl}${endPoint.GetVolunteeringMission}/${missionId}/${userId}`);
  }

  SaveMissionApplication(body: AddToFavouriteDTO): Observable<ApiResponseDTO> {
    return this.httpClient.post<ApiResponseDTO>(baseAPIUrl + endPoint.SaveMissionApplication, body);
  }

  SaveComment(body: CommentDTO): Observable<ApiResponseDTO> {
    return this.httpClient.post<ApiResponseDTO>(baseAPIUrl + endPoint.SaveComment, body);
  }

  SaveMissionRatings(body: MissionRatingDTO): Observable<ApiResponseDTO> {
    return this.httpClient.post<ApiResponseDTO>(baseAPIUrl + endPoint.SaveRatings, body);
  }

  checkMissionApplied(missionId: number, userId: number): Observable<ApiResponseDTO> {
    return this.httpClient.get<ApiResponseDTO>(`${baseAPIUrl}${endPoint.checkMissionApplied}/${missionId}/${userId}`);
  }
}
