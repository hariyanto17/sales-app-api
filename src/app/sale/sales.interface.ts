import { Sale, SaleItem } from "@prisma/client";
import { CustomRequest } from "../../utils/interface";

export interface SaleRequest extends CustomRequest {
  body: Sale & {
    saleItem: SaleItem[];
  };
}
