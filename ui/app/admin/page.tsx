"use client";
import { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { get } from "@/service/api-service";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function AdminPage() {
  var eventSource: EventSource;

  const [orders, setOrder] = useState<Array<any>>([]);
  useEffect(() => {
    eventSource = new EventSource("http://localhost:3000/admin/orders");
    eventSource.onmessage = (event) => {
      console.log(event);
      const data = JSON.parse(event.data);
      if (data.type == "add") {
        setOrder([...orders, data.data]);
      }
      if (data.type == "delete") {
        setOrder([...orders.filter((x) => x._id !== data)]);
      }
      if (data.type == "update") {
        setOrder([
          ...orders.with(
            orders.findIndex((x) => x._id === data.data._id),
            data.data
          ),
        ]);
      }
    };
    eventSource.onerror = (error) => {
      console.log("error", error.target);
    };

    return () => eventSource.close();
  }, []);

  const { data, error } = useQuery({
    queryKey: ["order"],
    queryFn: async () => {
      const response: any = await get("admin");
      if (response.success) {
        setOrder(response.data);
      }
      return response.data ?? [];
    },
  });

  if (error) return <div>Something went wrong</div>;
  return (
    <div className="m-2">
      <ScrollArea>
        {orders && orders.length == 0 ? (
          <div> No Order Available</div>
        ) : (
          orders?.map((order: any) => {
            return (
              <Card
                key={order._id}
                className="grid grid-cols-[4fr_1fr_1fr_1fr] gap-1"
              >
                <span className="my-auto top-0 bottom-0">
                  sessionId: {order.sessId}
                </span>
                <span className="my-auto top-0 bottom-0">{order.itemId}</span>
                <span>
                  <div>Qty: {order.qty}</div>
                  {/* <div>Price: {order.price}</div> */}
                </span>
                <span className="my-auto top-0 bottom-0 font-bold">
                  {/* <div>Net Price: {order.price * order.Qty}</div> */}
                  <div>Status: {order.status}</div>
                </span>
              </Card>
            );
          })
        )}
      </ScrollArea>
    </div>
  );
}
