import snap from "./init";

interface TransactionParams {
  transaction_details: {
    order_id: string;
    gross_amount: number;
  };
  customer_details?: {
    first_name?: string;
    last_name?: string;
    email?: string;
    phone?: string;
  };
  item_details?: Array<{
    id?: string;
    price: number;
    quantity: number;
    name: string;
  }>;
  [key: string]: unknown;
}

interface TransactionResponse {
  token: string;
  redirect_url: string;
}

/**
 * Create a Midtrans transaction
 * @param params Transaction parameters
 * @returns Promise with transaction response
 */
const createTransaction = async (
  params: TransactionParams
): Promise<TransactionResponse> => {
  try {
    const transaction = await snap.createTransaction(params);
    return transaction;
  } catch (error) {
    console.error("Midtrans transaction error:", error);
    throw new Error("Failed to create transaction");
  }
};

export default createTransaction;
