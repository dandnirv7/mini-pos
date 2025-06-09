import { MessageSquare, Package, Settings, ShoppingBag } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function QuickActions() {
  return (
    <Card className="bg-secondary">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button className="justify-start w-full" asChild>
          <Link href="/user/shop">
            <ShoppingBag className="w-4 h-4 mr-2" />
            Browse Products
          </Link>
        </Button>
        <Button
          variant="outline"
          className="justify-start w-full border-gray-100 bg-secondary hover:bg-gray-100"
          asChild
        >
          <Link href="/user/orders">
            <Package className="w-4 h-4 mr-2" />
            Track Orders
          </Link>
        </Button>
        <Button
          variant="outline"
          className="justify-start w-full border-gray-100 bg-secondary hover:bg-gray-100"
          asChild
        >
          <Link href="/user/reviews">
            <MessageSquare className="w-4 h-4 mr-2" />
            My Reviews
          </Link>
        </Button>
        <Button
          variant="outline"
          className="justify-start w-full border-gray-100 bg-secondary hover:bg-gray-100"
          asChild
        >
          <Link href="/user/settings">
            <Settings className="w-4 h-4 mr-2" />
            Account Settings
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
