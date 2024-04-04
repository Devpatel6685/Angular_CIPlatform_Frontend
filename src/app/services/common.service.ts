import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponseDTO } from '../models/apiresponse-model';
import { AddToFavouriteDTO } from '../models/mission-listing.model';
import { baseAPIUrl, endPoint } from '../Common/constant';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  constructor(private httpClient: HttpClient) { }

  GetAllBanners(): Observable<ApiResponseDTO> {
    return this.httpClient.get<ApiResponseDTO>(baseAPIUrl + endPoint.GetAllBanners);
  }

  GetAllCountries(): Observable<ApiResponseDTO> {
    return this.httpClient.get<ApiResponseDTO>(baseAPIUrl + endPoint.GetAllCountries);
  }

  GetCitiesByCountry(countryIds: number[]): Observable<ApiResponseDTO> {
    return this.httpClient.get<ApiResponseDTO>(baseAPIUrl + endPoint.GetCitiesByCountry + countryIds);
  }

  GetAllThemes(): Observable<ApiResponseDTO> {
    return this.httpClient.get<ApiResponseDTO>(baseAPIUrl + endPoint.GetAllThemes);
  }

  GetAllSkills(): Observable<ApiResponseDTO> {
    return this.httpClient.get<ApiResponseDTO>(baseAPIUrl + endPoint.GetAllSkills);
  }

  GetAllUsers(): Observable<ApiResponseDTO> {
    return this.httpClient.get<ApiResponseDTO>(baseAPIUrl + endPoint.GetAllUsers);
  }

}
