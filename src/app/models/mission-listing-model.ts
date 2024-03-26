import { FormControl } from '@angular/forms';

export type filterFormType = {
  searchByText: FormControl<string | null>;
  countryId: FormControl<number[] | null>;
  cityId: FormControl<number[] | null>;
  themeId: FormControl<number[] | null>;
  skillId: FormControl<number[] | null>;
};
