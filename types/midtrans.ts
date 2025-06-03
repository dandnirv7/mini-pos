export {};

declare global {
  interface SnapTransactionResult {
    order_id: string;
    transaction_id: string;
    status_message: string;
    gross_amount: string;
    payment_type: string;
    transaction_status: string;
    fraud_status?: string;
  }

  interface SnapEmbedOptions {
    embedId: string;
    onSuccess?: (result: SnapTransactionResult) => void;
    onPending?: (result: SnapTransactionResult) => void;
    onError?: (result: SnapTransactionResult) => void;
    onClose?: () => void;
  }

  interface Snap {
    embed: (token: string, options: SnapEmbedOptions) => void;
    pay: (token: string, options?: SnapEmbedOptions) => void;
  }

  interface Window {
    snap: Snap;
  }
}
