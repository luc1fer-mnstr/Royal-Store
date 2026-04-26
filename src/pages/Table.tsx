import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LucideSquareArrowLeft } from "lucide-react";

interface Row {
  item?: string;
  quantity?: number;
  price?: number;
  cash?: number;
  kpay?: number;
  name?: string;
  time?: string;
}

export default function Table() {
  const [data, setData] = useState<Row[]>([]);

  useEffect(() => {
    fetch("https://sheetdb.io/api/v1/9aab7ran2e6eg")
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => console.error(err));
  }, []);

  // totals
  const totalPrice = data.reduce((sum, row) => sum + Number(row.price || 0), 0);

  const totalKpay = data.reduce((sum, row) => sum + Number(row.kpay || 0), 0);

  return (
    <div className="p-6">
      <div className="flex justify-between">
        <h2 className="text-xl font-bold mb-4">Sales Table</h2>
        <Link
          to="/form"
          className="flex mr-4 underline hover:text-muted-foreground"
        >
          <LucideSquareArrowLeft /> Back to Form
        </Link>
      </div>

      <div className="overflow-x-auto border rounded-lg">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Item</th>
              <th className="p-3">Quantity</th>
              <th className="p-3">Price</th>
              <th className="p-3">Cash</th>
              <th className="p-3">Kpay</th>
              <th className="p-3">Name</th>
              <th className="p-3">Time</th>
            </tr>
          </thead>

          <tbody>
            {data.map((row, index) => (
              <tr key={index} className="border-t">
                <td className="p-3">{row.item}</td>
                <td className="p-3">{row.quantity}</td>
                <td className="p-3">{row.price}</td>
                <td className="p-3">{row.cash}</td>
                <td className="p-3">{row.kpay}</td>
                <td className="p-3">{row.name}</td>
                <td className="p-3">{row.time}</td>
              </tr>
            ))}
          </tbody>

          {/* TOTAL ROW */}
          <tfoot className="bg-gray-300 font-semibold">
            <tr>
              <td className="p-3">Total</td>
              <td></td>
              <td></td>
              <td className="p-3">{totalPrice}</td>
              <td className="p-3">{totalKpay}</td>
              <td></td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
