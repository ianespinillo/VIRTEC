type basicForm={
    nombre: string
    apellido: string
    email: string
}
type privateDataForm={
    password: string
    confirmPassword: string
    dni: string

}

export interface basicData {
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  data: basicForm
  next: ()=> void;
}
export interface privateData {
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  data: privateDataForm
  next: ()=> void
  previous: ()=> void
  
}

export interface schoolData {
  handleSelectChange: (value: string|number, prop: string) => void
  formValues: any;
  previous: ()=> void
  
}
