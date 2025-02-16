export interface APIEndpoint {
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  description: string;
  parameters?: APIParameter[];
  responses?: APIResponse[];
}

export interface APIParameter {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

export interface APIResponse {
  status: number;
  description: string;
  schema?: object;
}

export interface APIGroup {
  name: string;
  description: string;
  endpoints: APIEndpoint[];
}
