import AddOrderForm from "@/components/orders/add-order-form";
import OrderList from "@/components/orders/order-list";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";

export default function OrdersPage() {
  return (
    <div className="grid grid-cols-2">
      <Card className="p-2 m-2">
        <AddOrderForm></AddOrderForm>
      </Card>
      <OrderList></OrderList>

      <Link className="text-center" target="_blank" href={"/admin"}>
        For Admin Portal Click on this link
      </Link>
    </div>
  );
}
