export interface ApiErrorResponse {
  errors: {
    [key: string]: string;
  };
  detail?: string;
}
