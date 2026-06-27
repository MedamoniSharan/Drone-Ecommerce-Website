export const WHATSAPP_NUMBER = '919999999999';

export function buildWhatsAppOrderUrl(items: {
  title: string;
  price: string;
  quantity: number;
  model?: string;
  battery?: string;
}[], total: string) {
  const lines = [
    'Hi! I would like to place an order:',
    '',
    ...items.flatMap((item, index) => {
      const details = [
        `${index + 1}. ${item.title}`,
        `   Qty: ${item.quantity}`,
        `   Price: ${item.price}`,
      ];
      if (item.model) details.splice(2, 0, `   Model: ${item.model}`);
      if (item.battery) details.splice(item.model ? 3 : 2, 0, `   Battery: ${item.battery}`);
      return [...details, ''];
    }),
    `Estimated Total: ${total}`,
    '',
    'Please confirm availability and delivery details. Thank you!',
  ];

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
}

export function buildWhatsAppInquiryUrl(message = 'Hi! I have a question about DJI products.') {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
