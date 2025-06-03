import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import toRupiahs from "@/utils/formatCurrency";
import { subtotal } from "@/utils/subtotal";
import { Order } from "@/features/checkout/payment/types";

interface PaymentSummaryProps {
  order: Order;
  onSubmit: () => void;
  isLoading: boolean;
}

export default function PaymentSummary({
  order,
  onSubmit,
  isLoading,
}: PaymentSummaryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          {order?.items?.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between text-sm"
            >
              <span>
                {item.product.name} ({item.quantity})
              </span>
              <span>{toRupiahs(item.price)}</span>
            </div>
          ))}
        </div>

        <Separator />

        <div className="grid gap-2">
          <div className="flex items-center justify-between text-sm">
            <span>Subtotal</span>
            <span>{toRupiahs(subtotal(order.items))}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span>Discount</span>
            <span className="text-green-600">-{toRupiahs(order.discount)}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span>Delivery Fee</span>
            <span>{toRupiahs(order.deliveryFee)}</span>
          </div>
        </div>

        <Separator />

        <div className="flex items-center justify-between font-medium">
          <span>Total</span>
          <span className="text-lg">{toRupiahs(order.totalAmount)}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full text-white bg-orange-500 hover:bg-orange-600"
          size="lg"
          onClick={onSubmit}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center">
              <div className="w-4 h-4 mr-2 border-2 border-white rounded-full animate-spin border-t-transparent"></div>
              Processing...
            </div>
          ) : (
            "Pay Now"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
