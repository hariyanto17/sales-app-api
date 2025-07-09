import { Sale, SaleItem } from "@prisma/client";
import { CustomRequest } from "../../utils/interface";

export interface SaleRequest extends CustomRequest {
  body: Sale & {
    saleItem: SaleItem[];
  };
}

export interface PayloadQuery {
  startDate: Date;
  endDate: Date;
  categoryId?: string;
  productId?: string;
}

type PropertiesToString<T> = {
  [P in keyof T]: string;
};

export interface SaleRequestWithQuery extends CustomRequest {
  query: PropertiesToString<PayloadQuery>;
}
