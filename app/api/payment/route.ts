import createTransaction from "@/lib/midtrans/transaction";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { order_id, items, customer, deliveryFee, discount } = body;

    const itemDetails = [...items];

    if (deliveryFee && deliveryFee > 0) {
      itemDetails.push({
        id: "DELIVERY_FEE",
        price: deliveryFee,
        quantity: 1,
        name: "Delivery Fee",
      });
    }

    if (discount && discount > 0) {
      itemDetails.push({
        id: "DISCOUNT",
        price: -discount,
        quantity: 1,
        name: "Discount",
      });
    }

    const gross_amount = itemDetails.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    const transactionParams = {
      transaction_details: {
        order_id,
        gross_amount,
      },
      customer_details: customer,
      item_details: itemDetails,
    };

    const transaction = await createTransaction(transactionParams);

    return NextResponse.json(
      { success: true, data: transaction },
      { status: 200 }
    );
  } catch (error) {
    console.error("Midtrans transaction error:", error);
    return NextResponse.json(
      { message: "Failed to create transaction" },
      { status: 500 }
    );
  }
}
