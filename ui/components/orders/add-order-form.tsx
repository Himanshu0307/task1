"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddOrderSchema } from "@/types/add-order-schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { toast } from "sonner";
import { post } from "@/service/api-service";

export default function AddOrderForm() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const queryClient = useQueryClient();
  const form = useForm({
    defaultValues: { itemId: "", qty: 1 },
    resolver: zodResolver(AddOrderSchema),
  });
  const { data, mutate, reset, status } = useMutation({
    mutationFn: async (formData: z.infer<typeof AddOrderSchema>) => {
      const response = await post("orders", formData);
      return response;
    },
    onSuccess: (data: any) => {
      if (data.success) {
        toast("Order Placed");
      } else {
        toast(data.message ?? "Failed to place order");
      }
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });

  function onSubmit(formData: z.infer<typeof AddOrderSchema>) {
    mutate(formData);
  }

  return (
    <div className="text-start">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="itemId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Order</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  required={true}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a dish" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Manchurian">Manchurian</SelectItem>
                    <SelectItem value="Frenc fries">Frenc fries</SelectItem>
                    <SelectItem value="Curd">Curd</SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="qty"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Quantity"
                    required={true}
                    {...field}
                    type="number"
                  ></Input>
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <Button
              type="submit"
              className={`w-full ${
                status === "pending" ? "animate-pulse" : ""
              }`}
            >
              Place Order
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
