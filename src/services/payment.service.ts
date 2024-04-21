import { PaymentDto } from '@/common/dto/payment.dto';
import { PaymentModelResponse } from '@/types/response.type';
import axiosInstance from './api.service';

export const paymentService = {
  createPayment: async (data: PaymentDto): Promise<PaymentModelResponse> => {
    try {
      const response = await axiosInstance.post<PaymentModelResponse>(
        '/payment',
        data
      );
      return response.data;
    } catch (error) {
      const message = (error as Error).message;
      return Promise.reject(message);
    }
  },
  getPayments: async (): Promise<PaymentModelResponse[]> => {
    try {
      const response = await axiosInstance.get<PaymentModelResponse[]>(
        '/payment'
      );
      return response.data;
    } catch (error) {
      const message = (error as Error).message;
      return Promise.reject(message);
    }
  },
  getPaymentById: async (id: string): Promise<PaymentModelResponse> => {
    try {
      const response = await axiosInstance.get<PaymentModelResponse>(
        `/payment/${id}`
      );
      return response.data;
    } catch (error) {
      const message = (error as Error).message;
      return Promise.reject(message);
    }
  },
};
