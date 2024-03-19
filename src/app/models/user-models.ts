export interface Banner{
    bannerId: number
    image: string
    text: string
    sortOrder: number
    createdAt: Date
    updatedAt: Date
    deletedAt: Date
  }

  export interface LoginDTO {
    email: string,
    password: string
}
