import { TableDto } from '@/common/dto/table.dto';
import { apiController } from '@/controller/api.controller';
import {
  TableModelListResponse,
  TableModelResponse,
} from '@/types/response.type';

export const tableService = {
  getAllTable: async (): Promise<TableModelListResponse> => {
    return await apiController('/api/tables', 'get');
  },
  getTableById: async (id: string | undefined): Promise<TableModelResponse> => {
    return await apiController(`/api/tables/${id}`, 'get');
  },
  createTable: async (tableRequest: TableDto): Promise<TableModelResponse> => {
    return await apiController(`/api/tables`, 'post', tableRequest);
  },
  updateTable: async (
    id: string | undefined,
    tableRequest: TableDto
  ): Promise<TableModelResponse> => {
    return await apiController(`/api/tables/${id}`, 'put', tableRequest);
  },
  deleteTable: async (id: string): Promise<TableModelResponse> => {
    return await apiController(`/api/tables/${id}`, 'delete');
  },
};
