import { faker } from "../utils/faker";
import { prisma } from "@/lib/prisma";
import { OrderStatus, PaymentStatus } from "@prisma/client";

export async function seedOrders(
  users: any[],
  products: any[],
  addresses: any[]
) {
  console.log("📦 Creating orders...");

  const orders = await Promise.all(
    users.flatMap((user) => {
      return Array.from({ length: faker.number.int({ min: 1, max: 3 }) }).map(
        async () => {
          const selectedAddress = faker.helpers.arrayElement(
            addresses.filter((a) => a.userId === user.id)
          );
          const orderItems = faker.helpers.arrayElements(
            products,
            faker.number.int({ min: 1, max: 4 })
          );
          const totalAmount = orderItems.reduce(
            (sum, product) => sum + product.price,
            0
          );

          const order = await prisma.order.create({
            data: {
              orderNumber: `ORD-${faker.string.alphanumeric(8).toUpperCase()}`,
              userId: user.id,
              addressId: selectedAddress.id,
              totalAmount,
              deliveryFee: 10000,
              discount: 0,
              status: faker.helpers.enumValue(OrderStatus),
              paymentStatus: PaymentStatus.PAID,
              shippingMethod: "JNE",
              trackingNumber: faker.string.uuid(),
              customerNotes: faker.lorem.sentence(),
            },
          });

          await Promise.all(
            orderItems.map((product) =>
              prisma.orderItem.create({
                data: {
                  orderId: order.id,
                  productId: product.id,
                  quantity: faker.number.int({ min: 1, max: 2 }),
                  price: product.price,
                },
              })
            )
          );

          await prisma.payment.create({
            data: {
              orderId: order.id,
              paymentMethod: "bank_transfer",
              transactionId: faker.string.uuid(),
              transactionTime: faker.date.recent(),
              transactionStatus: "settlement",
              grossAmount: totalAmount,
              bank: "bca",
              vaNumber: faker.finance.accountNumber(),
              cardType: "debit",
              maskedCard: faker.finance.maskedNumber(),
              approvalCode: faker.string.alpha(6),
            },
          });

          return order;
        }
      );
    })
  );

  return orders;
}
