import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2 } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  formatPriceValue,
  parsePriceValue,
  useCart,
} from '@/context/CartContext';
import { buildWhatsAppOrderUrl } from '@/lib/whatsapp';
import { cn } from '@/lib/utils';
import LottiePlayer from '@/components/LottiePlayer';

export default function CartDrawer() {
  const { items, itemCount, isOpen, closeCart, removeItem, updateQuantity } = useCart();

  const { subtotal, savings, totalLabel } = useMemo(() => {
    const subtotalValue = items.reduce(
      (sum, item) => sum + parsePriceValue(item.price) * item.quantity,
      0,
    );
    const compareTotal = items.reduce(
      (sum, item) =>
        sum + (item.comparePrice ? parsePriceValue(item.comparePrice) : parsePriceValue(item.price)) *
          item.quantity,
      0,
    );
    return {
      subtotal: subtotalValue,
      savings: Math.max(compareTotal - subtotalValue, 0),
      totalLabel: formatPriceValue(subtotalValue),
    };
  }, [items]);

  const whatsappUrl = buildWhatsAppOrderUrl(
    items.map((item) => ({
      title: item.title,
      price: item.price,
      quantity: item.quantity,
      model: item.model,
      battery: item.battery,
    })),
    totalLabel,
  );

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent
        side="right"
        showCloseButton
        className="w-full sm:max-w-[420px] p-0 gap-0 flex flex-col"
      >
        <SheetHeader className="px-5 py-4 border-b border-gray-100">
          <SheetTitle className="text-lg font-bold text-left">
            Your Cart ({itemCount} {itemCount === 1 ? 'item' : 'items'})
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-3">
              <LottiePlayer src="/Drone.json" className="w-56 h-56" />
              <p className="text-base font-semibold text-gray-900">Your cart is empty</p>
              <p className="text-sm text-gray-500 max-w-[260px]">
                Browse our products and add drones and gadgets to get started.
              </p>
              <Link
                to="/products/drones"
                onClick={closeCart}
                className="mt-2 px-6 py-2.5 rounded-lg bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 transition-colors"
              >
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.lineId}
                  className="flex gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 rounded-lg object-cover bg-gray-100 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug">
                      {item.title}
                    </h3>
                    {(item.model || item.battery) && (
                      <p className="text-[11px] text-gray-500 mt-1 line-clamp-2">
                        {[item.model, item.battery].filter(Boolean).join(' · ')}
                      </p>
                    )}
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      <span className="text-sm font-bold text-gray-900">{item.price}</span>
                      {item.comparePrice && (
                        <span className="text-xs text-gray-400 line-through">{item.comparePrice}</span>
                      )}
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.lineId, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="p-1.5 hover:bg-gray-50 disabled:opacity-40"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-sm font-medium min-w-[2rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.lineId, item.quantity + 1)}
                          className="p-1.5 hover:bg-gray-50"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.lineId)}
                        className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-gray-100 px-5 py-4 space-y-4 bg-white">
            {savings > 0 && (
              <p className="text-sm font-semibold text-teal-700 bg-teal-50 px-3 py-2 rounded-lg text-center">
                {formatPriceValue(savings)} saved so far
              </p>
            )}

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Estimated Total</span>
              <span className="text-xl font-bold text-gray-900">{totalLabel}</span>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'flex items-center justify-center gap-2 w-full py-3.5 rounded-xl',
                'bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm transition-colors',
              )}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
                <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.978-1.044zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
              Order on WhatsApp
            </a>

            <p className="text-[11px] text-gray-400 text-center">
              Your order details will be sent directly on WhatsApp
            </p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
