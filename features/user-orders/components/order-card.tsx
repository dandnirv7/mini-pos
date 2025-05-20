import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle,
  ChevronRight,
  Clock,
  TruckIcon,
  XCircle,
} from "lucide-react";
import Image from "next/image";

interface Order {
  id: string;
  date: string;
  status: string;
  statusText: string;
  total: number;
  items: {
    name: string;
    quantity: number;
    image: string;
  }[];
}

export default function OrderCard({ order }: { order: Order }) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "processing":
        return (
          <Badge className="bg-blue-500 hover:bg-blue-600">Processing</Badge>
        );
      case "shipped":
        return (
          <Badge className="bg-orange-500 hover:bg-orange-600">Shipped</Badge>
        );
      case "delivered":
        return (
          <Badge className="bg-green-500 hover:bg-green-600">Delivered</Badge>
        );
      case "cancelled":
        return <Badge className="bg-red-500 hover:bg-red-600">Cancelled</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "processing":
        return <Clock className="w-5 h-5 text-blue-500" />;
      case "shipped":
        return <TruckIcon className="w-5 h-5 text-orange-500" />;
      case "delivered":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "cancelled":
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base">Order #{order.id}</CardTitle>
            <CardDescription>{order.date}</CardDescription>
          </div>
          {getStatusBadge(order.status)}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-4">
            {order.items.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="relative w-16 h-16 overflow-hidden rounded-md">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Qty: {item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {getStatusIcon(order.status)}
              <span className="text-sm">{order.statusText}</span>
            </div>
            <div className="flex items-center gap-4">
              <p className="font-medium">
                Total: Rp{order.total.toLocaleString()}
              </p>
              <Button variant="outline" size="sm" className="gap-1">
                Details
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
