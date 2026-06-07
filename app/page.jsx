
import AuthButton from "@/components/AuthButton";
import ProductCard from "@/components/ProductCard";
import AddProductForm from "@/components/ui/AddProductForm";
import { createClient } from "@/utils/supabase/server";
import { Bell, Rabbit, Shield, TrendingDown } from "lucide-react";
import Image from "next/image";
import { getProducts } from "./actions";

export default async function Home() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const products = user ? await getProducts() : [];

  const FEATURES = [
    {
      icon: Rabbit,
      title: "Lightning Fast",
      description:
        "Extract product prices in seconds, even from dynamic e-commerce websites.",
    },
    {
      icon: Shield,
      title: "Always Reliable",
      description:
        "Works across major online stores with secure and accurate tracking.",
    },
    {
      icon: Bell,
      title: "Smart Alerts",
      description:
        "Receive instant notifications whenever your tracked prices drop.",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">

      {/* Header */}
      <header className="sticky top-0 z-10 bg-[#2F3863] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Image
            src="/image.png"
            alt="Price Wise Logo"
            width={500}
            height={300}
            className="h-14 w-auto"
          />

          <AuthButton user={user} />
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto text-center">

          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-6 py-2 rounded-full text-sm font-medium mb-8">
            Smart Price Tracking & Instant Alerts
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-[#2F3863] leading-tight">
            Track Prices.
            <span className="text-orange-500"> Save More.</span>
          </h1>

          <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
            Monitor products across your favorite online stores and get notified
            instantly whenever prices drop. Never overpay again.
          </p>

          
            <AddProductForm user={user} />
          
          {/*features*/}
          {products.length === 0 && (
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-20">
              {FEATURES.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mb-5 mx-auto">
                    <Icon className="w-7 h-7 text-orange-500" />
                  </div>

                  <h3 className="text-lg font-semibold text-[#2F3863] mb-3">
                    {title}
                  </h3>

                  <p className="text-gray-600">{description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Product Grid */}
      {user && products.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 pb-20">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-[#2F3863]">
              Your Tracked Products
            </h3>

            <span className="text-sm text-gray-500">
              {products.length}{" "}
              {products.length === 1 ? "product" : "products"}
            </span>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Empty State */}
      {user && products.length === 0 && (
        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <div className="bg-white rounded-2xl border-2 border-dashed border-gray-300 p-12">
            <TrendingDown className="w-16 h-16 text-orange-400 mx-auto mb-4" />

            <h3 className="text-xl font-semibold text-[#2F3863] mb-2">
              No Products Added Yet
            </h3>

            <p className="text-gray-600">
              Add your first product above and start tracking prices instantly.
            </p>
          </div>
        </section>
      )}
    </main>
  );
}

