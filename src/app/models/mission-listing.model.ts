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
  missionApplied:boolean;
}

export interface VolunteeringMissionDTO {
  city: string;
  cityId: number;
  comments: CommentDTO[];
  countryId: number;
  description: string;
  endDate: Date;
  goalObjectiveText: string;
  goalValue: number;
  isFavourite: boolean;
  missionId: number;
  missionMedias: MissionMedia[];
  missionSkills: null;
  missionType: string;
  organizationName: string;
  userRating :number;
  rating: number;
  countOfUsersRated: Number;
  relatedMissions: null;
  seatsLeft: number;
  shortDescription: string;
  startDate: Date;
  theme: string;
  themeId: number;
  title: string;
  volunteres: User[];
}

export interface CommentDTO {
  commentId?: number;
  userId: number;
  missionId: number;
  approvalStatus: string;
  commentMessage:string;
  createdAt?: Date;
  updatedAt?: null;
  deletedAt?: null;
  mission?: null;
  user?: User;
}

export interface User {
  avatar: string;
  userId: number;
  firstname: string;
  lastname: string;
  whyIVolunteer?: string;
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
export interface CommentDto {
  commentId?: number;
  userId: number;
  missionId: number;
  approvalStatus: string;
  createdAt?: Date;
  updatedAt?: null;
  deletedAt?: null;
  mission?: null;
  user?: User;
}

export interface MissionRatingDTO {
  userId: number;
  missionId: number;
  ratings: number;
}

export interface MissionMedia {
  missionMediaId: number;
  missionId: number;
  mediaName: string;
  mediaType: string;
  mediaPath: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null;
  mission: null;
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

export interface RecommandUserDTO {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  completed: boolean;
}

export interface RelatedMisssionDTO {
  cityId: number;
  countryId: number;
  themeId: number;
  missionId: number;
  userId: number;
}