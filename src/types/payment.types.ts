export interface PaymentRequest {
    amount: number;
    description: string;
    callbackUrl: string;
    mobile?: string;
    email?: string;
    metadata?: Record<string, unknown>;
  }
  
  export interface PaymentResponse {
    authority: string;
    url: string;
  }
  
  export interface VerificationRequest {
    authority: string;
    amount: number;
  }
  
  export interface VerificationResponse {
    refId: number;
    cardHash?: string;
    cardPan?: string;
  }
  
  export interface PaymentError {
    code: string | number;
    message: string;
  }
  
  export interface PaymentConfig {
    merchantId: string;
    callbackUrl: string;
    sandbox: boolean;
  }