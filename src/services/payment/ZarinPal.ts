// src/services/payment/zarinpal.ts
import axios from 'axios';

interface PaymentRequest {
  amount: number;
  description: string;
  callbackUrl: string;
  mobile?: string;
  email?: string;
}

interface PaymentResponse {
  authority: string;
  url: string;
}

interface VerificationRequest {
  authority: string;
  amount: number;
}

interface VerificationResponse {
  refId: number;
  cardHash: string;
}

export class ZarinpalService {
  private static readonly MERCHANT_ID = 'YOUR-ZARINPAL-MERCHANT-ID';
  private static readonly BASE_URL = 'https://api.zarinpal.com/pg/v4';
  private static readonly PAYMENT_URL = 'https://www.zarinpal.com/pg/StartPay';
  private static readonly SANDBOX = true; // در محیط تولید false کنید

  static async requestPayment(data: PaymentRequest): Promise<PaymentResponse> {
    try {
      const response = await axios.post(
        `${this.BASE_URL}/payment/request.json`,
        {
          merchant_id: this.MERCHANT_ID,
          amount: data.amount,
          description: data.description,
          callback_url: data.callbackUrl,
          metadata: {
            mobile: data.mobile,
            email: data.email,
          },
        }
      );

      if (response.data.data.code === 100) {
        return {
          authority: response.data.data.authority,
          url: `${this.PAYMENT_URL}/${response.data.data.authority}`,
        };
      }

      throw new Error('خطا در ایجاد تراکنش');
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
        `${this.BASE_URL}/payment/verify.json`,
        {
          merchant_id: this.MERCHANT_ID,
          amount: data.amount,
          authority: data.authority,
        }
      );

      if (response.data.data.code === 100) {
        return {
          refId: response.data.data.ref_id,
          cardHash: response.data.data.card_hash,
        };
      }

      throw new Error('تراکنش تایید نشد');
    } catch (error) {
      console.error('Zarinpal verification error:', error);
      throw error;
    }
  }
}
