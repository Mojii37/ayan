import axios from 'axios';
import { 
  PaymentRequest, 
  PaymentResponse, 
  VerificationRequest, 
  VerificationResponse,
  PaymentConfig
} from '../../types/payment.types';

export class ZarinpalService {
  private static config: PaymentConfig = {
    merchantId: process.env.REACT_APP_ZARINPAL_MERCHANT_ID || 'YOUR-ZARINPAL-MERCHANT-ID',
    callbackUrl: process.env.REACT_APP_ZARINPAL_CALLBACK_URL || '/payment/verify',
    sandbox: process.env.NODE_ENV !== 'production'
  };

  private static readonly BASE_URL = 'https://api.zarinpal.com/pg/v4';
  private static readonly SANDBOX_URL = 'https://sandbox.zarinpal.com/pg/v4';
  private static readonly PAYMENT_URL = 'https://www.zarinpal.com/pg/StartPay';
  private static readonly SANDBOX_PAYMENT_URL = 'https://sandbox.zarinpal.com/pg/StartPay';

  private static getBaseUrl(): string {
    return this.config.sandbox ? this.SANDBOX_URL : this.BASE_URL;
  }

  private static getPaymentUrl(): string {
    return this.config.sandbox ? this.SANDBOX_PAYMENT_URL : this.PAYMENT_URL;
  }

  static async requestPayment(data: PaymentRequest): Promise<PaymentResponse> {
    try {
      const response = await axios.post(
        `${this.getBaseUrl()}/payment/request.json`,
        {
          merchant_id: this.config.merchantId,
          amount: data.amount,
          description: data.description,
          callback_url: `${window.location.origin}${this.config.callbackUrl}`,
          metadata: {
            mobile: data.mobile,
            email: data.email,
            ...data.metadata
          },
        }
      );

      if (response.data.data.code === 100) {
        const authority = response.data.data.authority;
        return {
          authority,
          url: `${this.getPaymentUrl()}/${authority}`,
        };
      }

      throw new Error(`خطا در ایجاد تراکنش: ${response.data.errors.code}`);
    } catch (error) {
      console.error('Zarinpal payment request error:', error);
      throw error;
    }
  }

  static async verifyPayment(
    data: VerificationRequest
  ): Promise<VerificationResponse> {
    try {
      const response = await axios.post(
        `${this.getBaseUrl()}/payment/verify.json`,
        {
          merchant_id: this.config.merchantId,
          amount: data.amount,
          authority: data.authority,
        }
      );

      if (response.data.data.code === 100) {
        return {
          refId: response.data.data.ref_id,
          cardHash: response.data.data.card_hash,
          cardPan: response.data.data.card_pan,
        };
      }

      throw new Error(`تراکنش تایید نشد: ${response.data.errors.code}`);
    } catch (error) {
      console.error('Zarinpal verification error:', error);
      throw error;
    }
  }

  static setConfig(newConfig: Partial<PaymentConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }
}