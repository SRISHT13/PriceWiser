"use client";

import { addProduct } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import AuthModal from "../AuthModal";

export default function AddProductForm({ user }) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("BUTTON CLICKED");

    if (!user) {
      console.log("NO USER FOUND");
      setShowAuthModal(true);
      return;
    }

    console.log("USER FOUND:", user.email);

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("url", url);

      console.log("CALLING addProduct...");

      const result = await addProduct(formData);

      //nsole.log("RESULT:", result);
      console.log("RESULT:", JSON.stringify(result, null, 2));

      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success(
          result?.message || "Product tracked successfully!"
        );
        setUrl("");
      }
    } catch (error) {
      console.error("HANDLE SUBMIT ERROR:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste product URL (Amazon, Walmart, etc.)"
            className="h-12 text-base"
            required
            disabled={loading}
          />

          <Button
            type="submit"
            disabled={loading}
            className="bg-orange-500 hover:bg-orange-600 h-10 sm:h-12 px-8"
            size="lg"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Adding...
              </>
            ) : (
              "Track Price"
            )}
          </Button>
        </div>
      </form>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
}