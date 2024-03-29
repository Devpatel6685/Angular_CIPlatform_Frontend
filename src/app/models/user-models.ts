export interface Banner {
  bannerId: number;
  image: string;
  text: string;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface RegisterDTO {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
}

export interface ResetPasswordDTO {
  token: string;
  password: string;
}

export interface CurrentUserDTO {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  phoneNumber: string;
  avatar: string;
  whyIVolunteer: string;
  employeeId: string;
  department: string;
  profileText: string;
  linkedInUrl: string;
  title: string;
  status: boolean;
}
