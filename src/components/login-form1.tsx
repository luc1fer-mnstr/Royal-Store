import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Item {
  title?: string;
}

export default function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItem, setSelectedItem] = useState("");
  const [quantity, setQuantity] = useState("");
  const [cash, setCash] = useState("");
  const [kpay, setKpay] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("https://sheetdb.io/api/v1/9aab7ran2e6eg?sheet=data")
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort((a: any, b: any) => {
          const nameA = (a.title || "").toLowerCase();
          const nameB = (b.title || "").toLowerCase();
          return nameA.localeCompare(nameB);
        });

        setItems(sorted);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) return;

    const now = new Date();
    const time = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    // ⚠️ validation
    if ((cash && kpay) || (!cash && !kpay)) {
      alert("Please fill ONLY Cash or Kpay");
      return;
    }

    if (!selectedItem || !quantity || !name) {
      alert("Please fill all required fields");
      return;
    }

    setLoading(true);

    const unitPrice = cash !== "" ? Number(cash) : Number(kpay);
    const total = unitPrice * Number(quantity);

    const formData = {
      item: selectedItem,
      quantity: Number(quantity),
      price: unitPrice,
      cash: cash !== "" ? total : "",
      kpay: kpay !== "" ? total : "",
      name,
      time,
    };

    try {
      await fetch("https://sheetdb.io/api/v1/9aab7ran2e6eg", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: formData }),
      });

      // clear form
      setSelectedItem("");
      setQuantity("");
      setCash("");
      setKpay("");
      setName("");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6 w-5xl", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Sales Form</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Items */}
            <div className="space-y-2">
              <Label>Items</Label>
              <select
                required
                className="w-full border rounded px-3 py-2"
                value={selectedItem}
                onChange={(e) => setSelectedItem(e.target.value)}
              >
                <option value="">
                  -- Choose item out of {items.length} --
                </option>

                {items.map((item, index) => (
                  <option key={index} value={item.title}>
                    {item.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Quantity */}
            <div className="space-y-2">
              <Label>Quantity</Label>
              <Input
                required
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>

            {/* Cash & Kpay */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Cash (Unit Price)</Label>
                <Input
                  type="number"
                  value={cash}
                  onChange={(e) => setCash(e.target.value)}
                  placeholder="Enter cash price"
                />
              </div>

              <div className="space-y-2">
                <Label>Kpay (Unit Price)</Label>
                <Input
                  type="number"
                  value={kpay}
                  onChange={(e) => setKpay(e.target.value)}
                  placeholder="Enter kpay price"
                />
              </div>
            </div>

            {/* Name */}
            <div className="space-y-2">
              <Label>Name</Label>
              <select
                required
                className="w-full border rounded px-3 py-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
              >
                <option value="">-- Choose name --</option>
                <option value="Wai Hlaing Phyo">Wai Hlaing Phyo</option>
                <option value="Theingi Win">Theingi Win</option>
                <option value="Pan Nu Wai">Pan Nu Wai</option>
                <option value="Aye Mon Myint">Aye Mon Myint</option>
                <option value="April">April</option>
                <option value="La Pyae">La Pyae</option>
              </select>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full cursor-pointer"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
