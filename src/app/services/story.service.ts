import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponseDTO } from '../models/apiresponse-model';
import { MissionSearchDTO } from '../models/mission-listing.model';
import { baseAPIUrl, endPoint } from '../Common/constant';

@Injectable({
  providedIn: 'root'
})
export class StoryService {

  constructor(private httpClient: HttpClient) { }

  GetStoriesByFilter(): Observable<ApiResponseDTO> {
    return this.httpClient.get<ApiResponseDTO>(baseAPIUrl + endPoint.GetStory);
  }

}
