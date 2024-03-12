
export interface UseFormResultType<T>{
    formValues: T;
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleSelectChange: (value:any, prop: string) => void;
}