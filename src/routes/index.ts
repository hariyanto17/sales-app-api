import { Request, Response, Router } from "express";

import authRoute from "../app/auth/auth.route";
import categoryRoute from "../app/category/category.route";
import productRoute from "../app/product/product.route";
import saleRoute from "../app/sale/sale.route";

const route = Router();

route.use("/auth", authRoute);
route.use("/category", categoryRoute);
route.use("/product", productRoute);
route.use("/sale", saleRoute);

route.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    status: "active",
    message: "your express router its already activated",
  });
});

export default route;
