"use client";
import { useState } from "react";
import { Card } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { del, get } from "@/service/api-service";
import { Button } from "../ui/button";
import { DeleteIcon, Pen, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function OrderList() {
  const { data, error } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const response: any = await get("orders");

      return response.data ?? [];
    },
  });

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["orders"],
    mutationFn: async (id: string) => {
      return await del(`orders/${id}`);
    },
    onSuccess: (data: any) => {
      if (data.success) {
        toast("Deletion  successful");
      } else {
        toast("Deletion failed");
      }
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
  // delete function
  if (error) return <div>Something went wrong</div>;

  function deleteItem(id: string) {
    mutate(id);
  }

  return (
    <div className="m-2">
      <ScrollArea className="h-[50dvh]">
        {data && data.length == 0 ? (
          <div> You have not placed any orders yet</div>
        ) : (
          data?.map((order: any) => {
            return (
              <Card
                key={order._id}
                className="m-1 p-1 grid grid-cols-[2fr_2fr_2fr_1fr]"
              >
                <span className="my-auto top-0 bottom-0">{order.itemId}</span>
                <span className="my-auto top-0 bottom-0">
                  Qty: {order.qty}
                  {/* <div>Price: {order.price}</div> */}
                </span>
                <span className="my-auto top-0 bottom-0 font-bold">
                  {/* <div>Net Price: {order.price * order.Qty}</div> */}
                  <div>Status: {order.status}</div>
                </span>
                <span className="my-auto top-0 bottom-0 font-bold flex gap-2">
                  <Button onClick={() => deleteItem(order._id)}>
                    <Trash2 />
                  </Button>
                </span>
              </Card>
            );
          })
        )}
      </ScrollArea>
    </div>
  );
}
