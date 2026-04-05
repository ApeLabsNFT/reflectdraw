import { ShoppingBag } from "lucide-react";
import { PageIntro } from "@/components/page-intro";
import { shopProducts } from "@/lib/demo-data";

export default function ShopPage() {
  return (
    <div className="route-section space-y-6 pt-1 pb-6">
      <PageIntro
        eyebrow="Shop"
        title="A quieter kind of commerce."
        description="Only products that deepen the ritual belong here. Nothing urgent, nothing manipulative."
      />

      <section className="space-y-4">
        {shopProducts.map((product, index) => (
          <div key={product.id} className="surface-panel overflow-hidden rounded-[2.3rem] p-3">
            <div
              className={`h-56 rounded-[2rem] ${
                index % 2 === 0 ? "artwork-water" : "artwork-lotus"
              }`}
            />
            <div className="space-y-3 px-2 pb-2 pt-4">
              <p className="font-serif text-[2.2rem] leading-[0.96] text-[var(--charcoal)]">
                {product.title}
              </p>
              <p className="text-sm leading-7 text-[rgba(117,123,116,0.92)]">
                {product.description}
              </p>
              <div className="flex items-center justify-between">
                <p className="text-xl font-semibold text-[var(--charcoal)]">
                  {product.price}
                </p>
                <button
                  type="button"
                  className="primary-cta h-11 px-5 text-sm font-semibold"
                >
                  <ShoppingBag className="size-4" />
                  Preview
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
