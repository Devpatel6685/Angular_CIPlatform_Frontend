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
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';

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
    MatChipsModule,
    CommonModule
  ],
  templateUrl: './second-header.component.html',
  styleUrl: './second-header.component.css',
})

export class SecondHeaderComponent implements OnInit {
  @Output() filterMissions = new EventEmitter<MissionSearchDTO>();

  countryList: CountryDTO[] = [];
  cityList: CityDTO[] = [];
  themeList: ThemeDTO[] = [];
  skillList: SkillDTO[] = [];
  filterOptions: any = [];

  filterForm: FormGroup<filterFormType> = new FormGroup<filterFormType>({
    searchByText: new FormControl(''),
    countryId: new FormControl([]),
    cityId: new FormControl([]),
    themeId: new FormControl([]),
    skillId: new FormControl([]),
  });

  constructor(private commonService: CommonService) { }

  ngOnInit(): void {
    this.getDropdownValues();
    this.filterValueChanges();
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
  };

  filterValueChanges = (): void => {
    this.filterForm.valueChanges.subscribe(() => {
      this.filterMissions.emit(this.filterForm.value as MissionSearchDTO);

      this.filterOptions = [
        ...this.cityList
          .filter((item) =>
            this.ctrl.cityId.value?.find((x) => x == item.cityId)
          )
          .map((x) => ({ id: x.cityId, name: x.name, controlName: 'cityId' })),
        ...this.countryList
          .filter((item) =>
            this.ctrl.countryId.value?.find((x) => x == item.countryId)
          )
          .map((x) => ({
            id: x.countryId,
            name: x.name,
            controlName: 'countryId',
          })),
        ...this.themeList
          .filter((item) =>
            this.ctrl.themeId.value?.find((x) => x == item.missionThemeId)
          )
          .map((x) => ({
            id: x.missionThemeId,
            name: x.title,
            controlName: 'themeId',
          })),
        ...this.skillList
          .filter((item) =>
            this.ctrl.skillId.value?.find((x) => x == item.skillId)
          )
          .map((x) => ({
            id: x.skillId,
            name: x.skillName,
            controlName: 'skillId',
          })),
      ];
    });

    this.ctrl.countryId.valueChanges.subscribe((value) => {
      if (value?.length && value?.length > 0) {
        this.commonService.GetCitiesByCountry(value).subscribe((result) => {
          this.cityList = result.data ?? [];
        });
      }
      else {
        this.cityList = [];
      }
    });
  };

  clearOptions = (event: FilterOptionDTO): void => {
    const control = this.filterForm.controls[event.controlName];
    const previousValue = control.value;
    const filteredValue = previousValue?.filter((x) => x != event.id) ?? [];

    control.setValue(filteredValue);
    let cityId = this.ctrl.cityId.value;

    if (event.controlName === 'countryId') {
      this.cityList = [];

      if (filteredValue.length > 0) {
        this.commonService
          .GetCitiesByCountry(filteredValue)
          .subscribe((result) => {
            this.cityList = result.data ?? [];

            const abc = cityId?.filter((x) => result.data.some((city: { cityId: number }) => city.cityId === x));
            this.filterForm.controls.cityId.setValue(abc?.map(x => x) ?? []);
          });
      }
      else {
        this.filterForm.controls.cityId.setValue([]);
      }
    }
  };

  clearAllOptions = (): void => {
    this.filterForm.reset({
      cityId: [],
      countryId: [],
      skillId: [],
      themeId: [],
      searchByText: '',
    });
  };

}
