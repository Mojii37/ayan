// src/services/PaymentService.ts
export class PaymentService {
  private static MERCHANT_ID = 'YOUR-ZARINPAL-MERCHANT-ID';
  private static CALLBACK_URL = 'YOUR-CALLBACK-URL';
  private static API_URL = 'https://api.zarinpal.com/pg/v4/payment';

  static async requestPayment(amount: number, description: string) {
    try {
      const response = await fetch(`${this.API_URL}/request.json`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          merchant_id: this.MERCHANT_ID,
          amount,
          description,
          callback_url: this.CALLBACK_URL,
        }),
      });

      const data = await response.json();

      if (data.data.code === 100) {
        return {
          authority: data.data.authority,
          url: `https://www.zarinpal.com/pg/StartPay/${data.data.authority}`,
        };
      } else {
        throw new Error(`خطا در ایجاد تراکنش: ${data.errors.code}`);
      }
    } catch (error) {
      console.error('Payment request error:', error);
      throw error;
    }
  }

  static async verifyPayment(authority: string, amount: number) {
    try {
      const response = await fetch(`${this.API_URL}/verify.json`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          merchant_id: this.MERCHANT_ID,
          amount,
          authority,
        }),
      });

      const data = await response.json();

      if (data.data.code === 100) {
        return {
          refId: data.data.ref_id,
          cardPan: data.data.card_pan,
        };
      } else {
        throw new Error(`خطا در تایید تراکنش: ${data.errors.code}`);
      }
    } catch (error) {
      console.error('Payment verification error:', error);
      throw error;
    }
  }
}
