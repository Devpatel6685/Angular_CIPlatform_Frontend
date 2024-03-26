import { Component, OnInit } from '@angular/core';
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
import { filterFormType } from '../../../models/mission-listing-model';

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
  filterForm: FormGroup<filterFormType> = new FormGroup<filterFormType>({
    searchByText: new FormControl(''),
    countryId: new FormControl([0]),
    cityId: new FormControl([0]),
    themeId: new FormControl([0]),
    skillId: new FormControl([0]),
  });

  constructor() {}

  ngOnInit(): void {}
}
