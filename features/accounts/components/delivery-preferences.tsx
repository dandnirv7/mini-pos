import { MapPin } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { deliveryPreferences } from "../mock/data";

export default function DeliveryPreferences() {
  return (
    <Card className="bg-secondary">
      <CardHeader>
        <CardTitle>Delivery Preferences</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium text-gray-700">Default Address</p>
            <p className="text-sm text-gray-500">
              {deliveryPreferences.address}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700">
              Special Instructions
            </p>
            <p className="text-sm text-gray-500">
              {deliveryPreferences.instructions}
            </p>
          </div>
        </div>
        <Separator />
        <Button
          variant="outline"
          className="w-full border-gray-100 bg-secondary hover:bg-gray-100"
          size="sm"
          asChild
        >
          <Link href="/user/settings/addresses">
            <MapPin className="w-4 h-4 mr-2" />
            Manage Addresses
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
