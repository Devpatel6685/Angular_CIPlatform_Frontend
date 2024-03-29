import { FormControl } from '@angular/forms';

export interface MissionDTO {
  missionImage: string;
  missionImagePath: string;
  city: string;
  CityId: number;
  CountryId: number;
  Country: string;
  theme: string;
  ThemeId: number;
  title: string;
  shortDescription: string;
  organizationName: string;
  rating: number;
  missionType: string;
  goalValue: number;
  goalObjectiveText: string;
  CreatedAt: Date;
  startDate: Date;
  endDate: Date;
  seatsLeft: number;
  missionId: number;
  skill: string;
  isFavourite: boolean;
}

export type filterFormType = {
  searchByText: FormControl<string | null>;
  countryId: FormControl<number[] | null>;
  cityId: FormControl<number[] | null>;
  themeId: FormControl<number[] | null>;
  skillId: FormControl<number[] | null>;
};

export interface CountryDTO {
  countryId: number;
  name: string;
  iso: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export interface CityDTO {
  cityId: number;
  countryId: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export interface ThemeDTO {
  missionThemeId: number;
  title: string;
  status: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export interface SkillDTO {
  skillId: number;
  skillName: string;
  status: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export interface FilterOptionDTO {
  id: number;
  name: string;
  controlName: 'countryId' | 'cityId' | 'themeId' | 'skillId';
}
export interface AddToFavouriteDTO {
  missionId: number;
  userId: number;
}
export interface MissionSearchDTO {
  cityId: number[];
  countryId: number[];
  themeId: number[];
  skillId: number[];
  searchByText: string;
  SortOrder: string;
  userId: number;
}
