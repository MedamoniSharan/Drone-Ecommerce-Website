import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, Star, X, ChevronDown, ChevronUp, ArrowRight, Zap } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import {
  CATEGORY_ICONS,
  getProductsByCategory,
  getProductPath,
  type CatalogProduct,
} from '@/data/products';

const parsePrice = (value: string) => parseFloat(value.replace(/[^\d.]/g, '')) || 0;

const formatPrice = (value: number) =>
  value.toLocaleString('en-IN', { maximumFractionDigits: 0 });

const GRID_COLS_CLASSES: Record<number, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-2 sm:grid-cols-2 lg:grid-cols-4',
  5: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5',
  6: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6',
};

const GRID_OPTIONS = [1, 2, 3, 4, 5, 6];

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'most-relevant', label: 'Most relevant' },
  { value: 'best-selling', label: 'Best selling' },
  { value: 'alpha-az', label: 'Alphabetically, A-Z' },
  { value: 'alpha-za', label: 'Alphabetically, Z-A' },
  { value: 'price-low', label: 'Price, low to high' },
  { value: 'price-high', label: 'Price, high to low' },
  { value: 'date-old', label: 'Date, old to new' },
  { value: 'date-new', label: 'Date, new to old' },
] as const;

const SortDropdown = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const activeLabel = SORT_OPTIONS.find((option) => option.value === value)?.label ?? 'Sort';

  useEffect(() => {
    if (!open) return;
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center justify-between gap-3 min-w-[200px] pl-5 pr-4 py-3 border border-gray-200 rounded-full text-sm font-medium bg-white cursor-pointer hover:bg-gray-50 transition-colors"
      >
        <span>{activeLabel}</span>
        <ChevronDown
          className={cn('w-4 h-4 text-gray-500 transition-transform', open && 'rotate-180')}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 z-30 mt-3 w-[300px] max-w-[90vw] rounded-2xl bg-white shadow-2xl shadow-black/10 ring-1 ring-black/5 py-3"
          >
            {SORT_OPTIONS.map((option) => {
              const isActive = option.value === value;
              return (
                <li key={option.value} role="option" aria-selected={isActive}>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(option.value);
                      setOpen(false);
                    }}
                    className={cn(
                      'relative w-full text-left pl-8 pr-6 py-2.5 text-[15px] transition-colors',
                      isActive
                        ? 'font-bold text-gray-900 bg-gray-100'
                        : 'font-medium text-gray-600 hover:bg-gray-50',
                    )}
                  >
                    {isActive && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r bg-gray-900" />
                    )}
                    {option.label}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

const FilterSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-b border-gray-100 py-5">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center justify-between w-full text-left"
      >
        <span className="text-lg font-bold text-gray-900">{title}</span>
        {open ? (
          <ChevronUp className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </button>
      {open && <div className="mt-4">{children}</div>}
    </div>
  );
};

interface FilterSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activeCategory: string;
  inStock: boolean;
  outOfStock: boolean;
  onToggleInStock: (checked: boolean) => void;
  onToggleOutOfStock: (checked: boolean) => void;
  inStockCount: number;
  outOfStockCount: number;
  maxPrice: number;
  priceRange: [number, number];
  onPriceChange: (range: [number, number]) => void;
}

const FilterSidebar = ({
  open,
  onOpenChange,
  activeCategory,
  inStock,
  outOfStock,
  onToggleInStock,
  onToggleOutOfStock,
  inStockCount,
  outOfStockCount,
  maxPrice,
  priceRange,
  onPriceChange,
}: FilterSidebarProps) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="left"
        className="w-full sm:max-w-[380px] p-0 gap-0 flex flex-col font-albert text-sm leading-[1.6]"
      >
        <SheetHeader className="px-6 py-4 border-b border-gray-100 bg-gray-50">
          <SheetTitle className="flex items-center gap-2 text-base font-semibold tracking-wide">
            <SlidersHorizontal className="w-4 h-4" />
            FILTER
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6">
          <FilterSection title="Product categories">
            <div className="flex flex-col gap-3">
              {CATEGORY_ICONS.map((cat) => {
                const isActive = cat.slug === activeCategory;
                return (
                  <Link
                    key={cat.id}
                    to={`/products/${cat.slug}`}
                    onClick={() => onOpenChange(false)}
                    className={cn(
                      'text-[15px] transition-colors w-fit',
                      isActive
                        ? 'font-bold text-gray-900'
                        : 'font-medium text-gray-600 hover:text-cyan-600',
                    )}
                  >
                    {cat.label}
                  </Link>
                );
              })}
            </div>
          </FilterSection>

          <FilterSection title="Availability">
            <div className="flex flex-col gap-3">
              <label className="flex items-center gap-3 cursor-pointer text-[15px] text-gray-700">
                <Checkbox
                  checked={inStock}
                  onCheckedChange={(checked) => onToggleInStock(checked === true)}
                />
                In stock ({inStockCount})
              </label>
              <label className="flex items-center gap-3 cursor-pointer text-[15px] text-gray-700">
                <Checkbox
                  checked={outOfStock}
                  onCheckedChange={(checked) => onToggleOutOfStock(checked === true)}
                />
                Out of stock ({outOfStockCount})
              </label>
            </div>
          </FilterSection>

          <FilterSection title="Price">
            <div className="flex flex-col gap-5">
              <Slider
                min={0}
                max={maxPrice}
                step={100}
                value={priceRange}
                onValueChange={(value) => onPriceChange([value[0], value[1]] as [number, number])}
                className="[&_[data-slot=slider-range]]:bg-red-500 [&_[data-slot=slider-thumb]]:border-red-500 [&_[data-slot=slider-track]]:bg-gray-200"
              />
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <span className="font-medium">Price:</span>
                <div className="flex items-center gap-1 border border-gray-200 rounded-md px-2 py-1">
                  <span>₹</span>
                  <input
                    type="number"
                    min={0}
                    max={priceRange[1]}
                    value={priceRange[0]}
                    onChange={(e) =>
                      onPriceChange([
                        Math.min(Number(e.target.value) || 0, priceRange[1]),
                        priceRange[1],
                      ])
                    }
                    className="w-16 bg-transparent focus:outline-none"
                  />
                </div>
                <span>-</span>
                <div className="flex items-center gap-1 border border-gray-200 rounded-md px-2 py-1">
                  <span>₹</span>
                  <input
                    type="number"
                    min={priceRange[0]}
                    max={maxPrice}
                    value={priceRange[1]}
                    onChange={(e) =>
                      onPriceChange([
                        priceRange[0],
                        Math.max(Number(e.target.value) || 0, priceRange[0]),
                      ])
                    }
                    className="w-20 bg-transparent focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </FilterSection>
        </div>
      </SheetContent>
    </Sheet>
  );
};

const EmiWidget = ({ price }: { price: string }) => (
  <div className="flex items-center gap-1 mt-1 text-[11px] sm:text-xs">
    <div className="flex items-center px-2 py-1 bg-white border border-gray-100 rounded-md shadow-sm">
      <span className="text-gray-500 mr-1">or</span>
      <span className="font-bold text-black flex items-center">
        ₹<span className="mx-0.5">{price}</span>/Month
      </span>
    </div>
    <button
      type="button"
      className="bg-[#2DA257] hover:bg-[#258a49] text-white px-2 py-1 rounded-md font-semibold flex items-center gap-1 transition-colors"
    >
      <span className="hidden sm:inline">Buy on EMI</span>
      <span className="sm:hidden">EMI</span>
      <motion.div animate={{ x: [0, 2, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
        <ArrowRight className="w-2.5 h-2.5" />
      </motion.div>
    </button>
  </div>
);

const ListingProductCard = ({ product }: { product: CatalogProduct }) => {
  return (
    <Link to={getProductPath(product.id)} className="group relative flex flex-col h-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex flex-col h-full"
      >
        <div className="relative aspect-square overflow-hidden rounded-[20px] bg-[#F2F2F2] border border-[#EBEBEB] transition-all duration-300 group-hover:shadow-xl group-hover:shadow-black/5">
          <div className="relative w-full h-full">
            <img
              src={product.mainImage}
              alt={product.title}
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out group-hover:opacity-0"
            />
            <img
              src={product.hoverImage}
              alt={`${product.title} Alternate View`}
              className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"
            />
          </div>

          {product.soldOut && (
            <div className="absolute top-4 right-4 z-10">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-white/90 backdrop-blur-sm text-black shadow-sm">
                Sold out
              </span>
            </div>
          )}

          <div className="absolute bottom-0 left-0 right-0 z-10 flex items-center justify-between bg-[#FACC15] text-black px-4 py-2 text-[11px] sm:text-xs font-semibold">
            <div className="flex items-center gap-1.5 truncate pr-2">
              <Zap className="w-3 h-3 fill-current shrink-0" />
              <span className="truncate uppercase tracking-wider">{product.features}</span>
            </div>
            <div className="flex items-center gap-1 bg-white px-2 py-0.5 rounded-full shadow-sm shrink-0">
              <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
              <span>{product.rating.toFixed(1)}</span>
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-col flex-grow px-2">
          <h3 className="text-sm font-bold text-gray-900 line-clamp-2 min-h-[40px] group-hover:text-blue-600 transition-colors leading-tight">
            {product.title}
          </h3>

          <p className="mt-1 text-[11px] text-gray-500 font-medium truncate uppercase tracking-tight">
            {product.subtitle}
          </p>

          <div className="my-3 border-t border-dashed border-gray-300 w-full" />

          <div className="flex flex-col gap-0.5">
            <span className="text-xl font-black text-gray-900 tracking-tight">{product.price}</span>
            {product.comparePrice && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400 line-through">{product.comparePrice}</span>
                <span className="text-xs font-bold text-green-600">{product.discount}</span>
              </div>
            )}
          </div>

          <div className="mt-3">
            <EmiWidget price={product.emiPrice} />
          </div>

          <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="w-full py-2 bg-black text-white text-xs font-bold rounded-lg group-hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
              VIEW DETAILS
              <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

const ListingProductRow = ({ product }: { product: CatalogProduct }) => {
  const description = product.descriptionPoints?.join('. ') ?? product.subtitle;
  const hasVariants = (product.models?.length ?? 0) > 0 || (product.batteryOptions?.length ?? 0) > 0;

  return (
    <Link
      to={getProductPath(product.id)}
      className="group flex flex-col sm:flex-row gap-5 sm:gap-7 py-6 border-b border-gray-100"
    >
      <div className="relative shrink-0 w-full sm:w-[260px] aspect-square overflow-hidden rounded-[20px] bg-[#F2F2F2] border border-[#EBEBEB]">
        <img
          src={product.mainImage}
          alt={product.title}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out group-hover:opacity-0"
        />
        <img
          src={product.hoverImage}
          alt={`${product.title} Alternate View`}
          className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"
        />
        {product.soldOut && (
          <div className="absolute top-4 right-4 z-10">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-white/90 backdrop-blur-sm text-black shadow-sm">
              Sold out
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1 min-w-0">
        <h3 className="text-base md:text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors leading-snug">
          {product.title}
        </h3>

        <div className="mt-2 flex items-center gap-3 flex-wrap">
          <span className="text-base md:text-lg font-bold text-gray-900">
            {hasVariants ? `From ${product.price}` : product.price}
          </span>
          {product.comparePrice && (
            <>
              <span className="text-sm text-gray-400 line-through">{product.comparePrice}</span>
              {product.discount && (
                <span className="text-sm font-bold text-green-600">{product.discount}</span>
              )}
            </>
          )}
        </div>

        <p className="mt-3 text-sm text-gray-500 leading-[1.6] line-clamp-2 max-w-[680px]">
          {description}
        </p>

        <div className="mt-auto pt-4 hidden sm:block">
          <span className="inline-flex items-center gap-2 px-5 py-2 bg-black text-white text-xs font-bold rounded-lg group-hover:bg-gray-800 transition-colors w-fit">
            VIEW DETAILS
            <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default function ProductsPage() {
  const { category: categoryParam } = useParams<{ category?: string }>();
  const location = useLocation();
  const category =
    categoryParam ??
    (location.pathname.startsWith('/products') ? undefined : location.pathname.slice(1)) ??
    'drones';
  const [sortBy, setSortBy] = useState('best-selling');
  const [columns, setColumns] = useState(3);
  const [filterOpen, setFilterOpen] = useState(false);
  const [inStock, setInStock] = useState(false);
  const [outOfStock, setOutOfStock] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number] | null>(null);

  const categoryProducts = useMemo(() => getProductsByCategory(category), [category]);

  const maxPrice = useMemo(() => {
    const highest = categoryProducts.reduce((max, product) => {
      const value = parsePrice(product.price);
      return value > max ? value : max;
    }, 0);
    return Math.ceil(highest / 100) * 100 || 100000;
  }, [categoryProducts]);

  const inStockCount = useMemo(
    () => categoryProducts.filter((product) => !product.soldOut).length,
    [categoryProducts],
  );
  const outOfStockCount = useMemo(
    () => categoryProducts.filter((product) => product.soldOut).length,
    [categoryProducts],
  );

  // Reset price + availability filters when switching category.
  useEffect(() => {
    setPriceRange(null);
    setInStock(false);
    setOutOfStock(false);
  }, [category]);

  const effectiveRange: [number, number] = priceRange ?? [0, maxPrice];
  const isPriceFiltered = effectiveRange[0] > 0 || effectiveRange[1] < maxPrice;

  const products = useMemo(() => {
    let list = categoryProducts;

    if (inStock && !outOfStock) {
      list = list.filter((product) => !product.soldOut);
    } else if (outOfStock && !inStock) {
      list = list.filter((product) => product.soldOut);
    }

    list = list.filter((product) => {
      const value = parsePrice(product.price);
      return value >= effectiveRange[0] && value <= effectiveRange[1];
    });

    if (sortBy === 'price-low') {
      list = [...list].sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    } else if (sortBy === 'price-high') {
      list = [...list].sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    } else if (sortBy === 'alpha-az') {
      list = [...list].sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'alpha-za') {
      list = [...list].sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortBy === 'date-old') {
      list = [...list].reverse();
    }
    return list;
  }, [categoryProducts, inStock, outOfStock, effectiveRange, sortBy]);

  const activeCategory = category || 'drones';

  return (
    <main className="min-h-screen bg-white font-albert text-sm font-normal leading-[1.6] text-foreground">
      <Navbar />

      <FilterSidebar
        open={filterOpen}
        onOpenChange={setFilterOpen}
        activeCategory={activeCategory}
        inStock={inStock}
        outOfStock={outOfStock}
        onToggleInStock={setInStock}
        onToggleOutOfStock={setOutOfStock}
        inStockCount={inStockCount}
        outOfStockCount={outOfStockCount}
        maxPrice={maxPrice}
        priceRange={effectiveRange}
        onPriceChange={setPriceRange}
      />

      <div className="pt-[98px] md:pt-[113px]">
        {/* Category icon strip */}
        <section className="bg-white">
          <div className="max-w-[1540px] mx-auto px-5 md:px-10 py-8 overflow-x-auto">
            <div className="flex items-start justify-center gap-8 md:gap-14 min-w-max md:min-w-0">
              {CATEGORY_ICONS.map((cat) => {
                const isActive = cat.slug === activeCategory;
                return (
                  <Link
                    key={cat.id}
                    to={`/products/${cat.slug}`}
                    className="flex flex-col items-center gap-3 group w-[80px] md:w-[96px] shrink-0"
                  >
                    <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
                      <img
                        src={cat.image}
                        alt={cat.label}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span
                      className={cn(
                        'text-[13px] md:text-sm text-center leading-tight transition-colors',
                        isActive
                          ? 'font-bold text-black'
                          : 'font-semibold text-gray-900 group-hover:text-cyan-600',
                      )}
                    >
                      {cat.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Toolbar */}
        <section className="border-b border-gray-100">
          <div className="max-w-[1540px] mx-auto px-5 md:px-10 py-4 flex flex-wrap items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => setFilterOpen(true)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
              FILTER
            </button>

            <div className="hidden md:flex items-center gap-4 text-gray-400">
              {GRID_OPTIONS.map((cols) => (
                <button
                  key={cols}
                  type="button"
                  onClick={() => setColumns(cols)}
                  aria-label={`${cols} columns`}
                  aria-pressed={columns === cols}
                  className={cn(
                    'p-1 rounded cursor-pointer hover:text-black transition-colors',
                    columns === cols && 'text-black',
                  )}
                >
                  {cols === 1 ? (
                    <div className="flex flex-col gap-1">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="w-4 h-0.5 rounded-full bg-current" />
                      ))}
                    </div>
                  ) : (
                    <div
                      className="grid gap-1"
                      style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
                    >
                      {Array.from({ length: cols }).map((_, i) => (
                        <div key={i} className="w-1.5 h-1.5 rounded-full bg-current" />
                      ))}
                    </div>
                  )}
                </button>
              ))}
            </div>

            <SortDropdown value={sortBy} onChange={setSortBy} />
          </div>
        </section>

        {/* Results */}
        <section className="max-w-[1540px] mx-auto px-5 md:px-10 py-10">
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <p className="text-sm font-semibold text-gray-900">
              {products.length} Product{products.length !== 1 ? 's' : ''} Found
            </p>
            {inStock && (
              <button
                type="button"
                onClick={() => setInStock(false)}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-gray-200 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors"
              >
                In stock
                <X className="w-3 h-3" />
              </button>
            )}
            {outOfStock && (
              <button
                type="button"
                onClick={() => setOutOfStock(false)}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-gray-200 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Out of stock
                <X className="w-3 h-3" />
              </button>
            )}
            {isPriceFiltered && (
              <button
                type="button"
                onClick={() => setPriceRange(null)}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-gray-200 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors"
              >
                ₹{formatPrice(effectiveRange[0])} - ₹{formatPrice(effectiveRange[1])}
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {products.length > 0 ? (
            columns === 1 ? (
              <div className="flex flex-col border-t border-gray-100">
                {products.map((product) => (
                  <ListingProductRow key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className={cn('grid gap-x-6 gap-y-12', GRID_COLS_CLASSES[columns])}>
                {products.map((product) => (
                  <ListingProductCard key={product.id} product={product} />
                ))}
              </div>
            )
          ) : (
            <div className="text-center py-24 text-gray-500">
              <p className="text-lg font-medium">No products found in this category.</p>
              <Link to="/products/drones" className="text-cyan-600 hover:underline mt-2 inline-block">
                Browse all drones
              </Link>
            </div>
          )}
        </section>

        <Footer />
      </div>
    </main>
  );
}
