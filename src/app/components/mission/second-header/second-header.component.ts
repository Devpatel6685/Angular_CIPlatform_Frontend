import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {
  FilterOptionDTO,
  CityDTO,
  CountryDTO,
  MissionSearchDTO,
  SkillDTO,
  ThemeDTO,
  filterFormType,
} from '../../../models/mission-listing.model';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-second-header',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatInputModule,
  ],
  templateUrl: './second-header.component.html',
  styleUrl: './second-header.component.css',
})
export class SecondHeaderComponent implements OnInit {
  @Output() filterMissions = new EventEmitter<MissionSearchDTO>();
  @Output() filterOptions = new EventEmitter<FilterOptionDTO[]>();

  countryList: CountryDTO[] = [];
  cityList: CityDTO[] = [];
  themeList: ThemeDTO[] = [];
  skillList: SkillDTO[] = [];

  filterForm: FormGroup<filterFormType> = new FormGroup<filterFormType>({
    searchByText: new FormControl(''),
    countryId: new FormControl([]),
    cityId: new FormControl([]),
    themeId: new FormControl([]),
    skillId: new FormControl([]),
  });

  constructor(private commonService: CommonService) {}

  ngOnInit(): void {
    this.getDropdownValues();
  }

  get ctrl(): filterFormType {
    return this.filterForm.controls;
  }

  getDropdownValues = (): void => {
    this.commonService.GetAllCountries().subscribe((result) => {
      this.countryList = result.data;
    });

    this.commonService.GetAllThemes().subscribe((result) => {
      this.themeList = result.data;
    });

    this.commonService.GetAllSkills().subscribe((result) => {
      this.skillList = result.data;
    });

    this.ctrl.countryId.valueChanges.subscribe((value) => {
      if (value?.length && value?.length > 0) {
        this.commonService.GetCitiesByCountry(value).subscribe((result) => {
          this.cityList = result.data ?? [];
        });
      } else {
        this.cityList = [];
      }
    });
  };
}
