import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef } from "react";
import {
  FileText,
  Plus,
  Trash2,
  Printer,
  Download,
  Receipt,
  Sparkles,
  ShoppingBag,
  Building2,
  User,
  Calendar,
  Hash,
  Phone,
  RotateCcw,
} from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { MENU, RESTAURANT } from "@/lib/menu-data";

export const Route = createFileRoute("/billing")({
  component: BillingPage,
});

export type InvoiceItem = {
  id: string;
  name: string;
  quantity: number;
  price: number;
};

export function BillingPage() {
  const todayStr = new Date().toISOString().split("T")[0] ?? "2026-09-23";

  const [invoiceNumber, setInvoiceNumber] = useState<string>("INV-2026-001");
  const [invoiceDate, setInvoiceDate] = useState<string>(todayStr);
  const [customerName, setCustomerName] = useState<string>("Rahul Sharma");
  const [customerContact, setCustomerContact] = useState<string>("+91 98765 43210");

  const [items, setItems] = useState<InvoiceItem[]>([
    { id: "1", name: "Malabar Chicken Biryani", quantity: 2, price: 240 },
    { id: "2", name: "Puttum Beefum", quantity: 1, price: 180 },
    { id: "3", name: "Sulaimani", quantity: 2, price: 30 },
  ]);

  const [taxPercent, setTaxPercent] = useState<number>(5); // 5% GST default
  const [discountValue, setDiscountValue] = useState<number>(50); // Flat ₹50 or %
  const [discountType, setDiscountType] = useState<"flat" | "percent">("flat");

  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const invoicePreviewRef = useRef<HTMLDivElement>(null);

  // Quick add from menu
  const [selectedMenuItemId, setSelectedMenuItemId] = useState<string>("");

  const handleAddMenuItem = (menuId: string) => {
    const menuItem = MENU.find((m) => m.id === menuId);
    if (!menuItem) return;

    // Check if item already exists
    const existingIndex = items.findIndex((i) => i.name === menuItem.name);
    if (existingIndex >= 0) {
      const updated = [...items];
      const existingItem = updated[existingIndex];
      if (existingItem) {
        existingItem.quantity += 1;
        setItems(updated);
      }
    } else {
      setItems((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          name: menuItem.name,
          quantity: 1,
          price: menuItem.price,
        },
      ]);
    }
    setSelectedMenuItemId("");
  };

  const handleAddItem = () => {
    setItems((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        name: "New Item / Service",
        quantity: 1,
        price: 100,
      },
    ]);
  };

  const handleRemoveItem = (id: string) => {
    if (items.length <= 1) {
      alert("Invoice must contain at least one product or service item.");
      return;
    }
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleItemChange = (id: string, field: keyof InvoiceItem, value: string | number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        return {
          ...item,
          [field]: value,
        };
      })
    );
  };

  // Calculation Math
  const subtotal = items.reduce((acc, item) => acc + (item.quantity || 0) * (item.price || 0), 0);
  const taxAmount = (subtotal * (taxPercent || 0)) / 100;
  const discountAmount =
    discountType === "percent" ? (subtotal * (discountValue || 0)) / 100 : discountValue || 0;
  const grandTotal = Math.max(0, subtotal + taxAmount - discountAmount);

  // Format currency in INR (₹)
  const formatINR = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(val);
  };

  // Handle PDF Generation
  const handleDownloadPdf = async () => {
    if (!invoicePreviewRef.current) return;
    setIsGeneratingPdf(true);
    try {
      const element = invoicePreviewRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#0d0f12",
        logging: false,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${invoiceNumber || "Invoice"}.pdf`);
    } catch (err) {
      console.error("Failed to generate PDF invoice:", err);
      alert("An error occurred while generating PDF. Please try again.");
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  // Handle Print
  const handlePrint = () => {
    window.print();
  };

  const handleResetForm = () => {
    setInvoiceNumber(`INV-${Date.now().toString().slice(-6)}`);
    setInvoiceDate(todayStr);
    setCustomerName("");
    setCustomerContact("");
    setItems([{ id: "1", name: "Kerala Meal Combo", quantity: 1, price: 180 }]);
    setTaxPercent(5);
    setDiscountValue(0);
  };

  return (
    <div className="min-h-screen bg-background text-foreground py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header Title Banner */}
        <div className="no-print flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-border/60 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30 text-xs uppercase tracking-wider">
                Billing System
              </Badge>
              <span className="text-xs text-muted-foreground">GST Ready</span>
            </div>
            <h1 className="mt-2 font-display text-3xl md:text-4xl text-foreground">
              Bill & Invoice Generator
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Create professional, itemized GST invoices for TERRA Mindspace customers.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button variant="outline" size="sm" onClick={handleResetForm} className="gap-2">
              <RotateCcw className="size-4" />
              Reset Form
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrint}
              className="gap-2 border-primary/40 hover:bg-primary/10"
            >
              <Printer className="size-4 text-primary" />
              Print Invoice
            </Button>
            <Button
              variant="gold"
              size="sm"
              onClick={handleDownloadPdf}
              disabled={isGeneratingPdf}
              className="gap-2 shadow-glow"
            >
              <Download className="size-4" />
              {isGeneratingPdf ? "Generating PDF..." : "Download Invoice PDF"}
            </Button>
          </div>
        </div>

        {/* Main Grid: Left = Form Inputs, Right = Live Invoice Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: FORM INPUTS (Hidden during print) */}
          <div className="no-print lg:col-span-6 space-y-6">
            {/* Invoice Meta & Customer Details */}
            <Card className="border-border/60 bg-card/80 backdrop-blur">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="size-5 text-primary" />
                  Invoice Details & Customer Info
                </CardTitle>
                <CardDescription>
                  Enter customer details and basic invoice metadata
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="inv-num" className="flex items-center gap-1.5 text-xs">
                      <Hash className="size-3.5 text-muted-foreground" />
                      Invoice Number
                    </Label>
                    <Input
                      id="inv-num"
                      value={invoiceNumber}
                      onChange={(e) => setInvoiceNumber(e.target.value)}
                      placeholder="e.g. INV-2026-001"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="inv-date" className="flex items-center gap-1.5 text-xs">
                      <Calendar className="size-3.5 text-muted-foreground" />
                      Invoice Date
                    </Label>
                    <Input
                      id="inv-date"
                      type="date"
                      value={invoiceDate}
                      onChange={(e) => setInvoiceDate(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cust-name" className="flex items-center gap-1.5 text-xs">
                      <User className="size-3.5 text-muted-foreground" />
                      Customer Name
                    </Label>
                    <Input
                      id="cust-name"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Enter customer name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cust-contact" className="flex items-center gap-1.5 text-xs">
                      <Phone className="size-3.5 text-muted-foreground" />
                      Customer Contact
                    </Label>
                    <Input
                      id="cust-contact"
                      value={customerContact}
                      onChange={(e) => setCustomerContact(e.target.value)}
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Itemized Products / Services */}
            <Card className="border-border/60 bg-card/80 backdrop-blur">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Receipt className="size-5 text-primary" />
                      Products & Services
                    </CardTitle>
                    <CardDescription>
                      Add line items, adjust quantities and prices
                    </CardDescription>
                  </div>
                  <Button variant="ghost" size="sm" onClick={handleAddItem} className="gap-1 text-primary">
                    <Plus className="size-4" />
                    Custom Line
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Quick Add from Restaurant Menu */}
                <div className="p-3 rounded-lg border border-border/40 bg-background/50 space-y-2">
                  <Label className="text-xs text-muted-foreground flex items-center gap-1">
                    <ShoppingBag className="size-3.5 text-primary" />
                    Quick Add from TERRA Menu
                  </Label>
                  <Select
                    value={selectedMenuItemId}
                    onValueChange={(val) => handleAddMenuItem(val)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select dish from menu..." />
                    </SelectTrigger>
                    <SelectContent>
                      {MENU.map((dish) => (
                        <SelectItem key={dish.id} value={dish.id}>
                          {dish.name} — ₹{dish.price} ({dish.category})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Items Table Form */}
                <div className="space-y-3">
                  {items.map((item, index) => (
                    <div
                      key={item.id}
                      className="p-3 rounded-md border border-border/50 bg-background/60 space-y-3"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-semibold text-muted-foreground">
                          Item #{index + 1}
                        </span>
                        {items.length > 1 && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-7 text-destructive hover:bg-destructive/10"
                            onClick={() => handleRemoveItem(item.id)}
                            title="Remove item"
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                        <div className="sm:col-span-6 space-y-1">
                          <Label className="text-[0.7rem] text-muted-foreground">Item Name / Service</Label>
                          <Input
                            value={item.name}
                            onChange={(e) => handleItemChange(item.id, "name", e.target.value)}
                            placeholder="Product name"
                          />
                        </div>

                        <div className="sm:col-span-3 space-y-1">
                          <Label className="text-[0.7rem] text-muted-foreground">Qty</Label>
                          <Input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) =>
                              handleItemChange(item.id, "quantity", Math.max(1, parseInt(e.target.value) || 1))
                            }
                          />
                        </div>

                        <div className="sm:col-span-3 space-y-1">
                          <Label className="text-[0.7rem] text-muted-foreground">Price (₹)</Label>
                          <Input
                            type="number"
                            min="0"
                            step="1"
                            value={item.price}
                            onChange={(e) =>
                              handleItemChange(item.id, "price", Math.max(0, parseFloat(e.target.value) || 0))
                            }
                          />
                        </div>
                      </div>

                      <div className="text-right text-xs text-muted-foreground">
                        Line Total: <span className="font-semibold text-foreground">₹{((item.quantity || 0) * (item.price || 0)).toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Taxes & Discounts */}
            <Card className="border-border/60 bg-card/80 backdrop-blur">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Sparkles className="size-5 text-primary" />
                  Tax & Discounts
                </CardTitle>
                <CardDescription>
                  Configure GST/Tax rate and promotional discounts
                </CardDescription>
              </CardHeader>

              <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tax-pct" className="text-xs">
                    GST / Tax (%)
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="tax-pct"
                      type="number"
                      min="0"
                      max="100"
                      value={taxPercent}
                      onChange={(e) => setTaxPercent(Math.max(0, parseFloat(e.target.value) || 0))}
                    />
                    <span className="text-sm font-semibold text-muted-foreground">%</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="disc-val" className="text-xs">
                      Discount
                    </Label>
                    <div className="flex items-center text-[0.7rem] bg-muted rounded p-0.5">
                      <button
                        type="button"
                        onClick={() => setDiscountType("flat")}
                        className={`px-1.5 py-0.5 rounded ${
                          discountType === "flat" ? "bg-primary text-primary-foreground font-semibold" : "text-muted-foreground"
                        }`}
                      >
                        ₹ Flat
                      </button>
                      <button
                        type="button"
                        onClick={() => setDiscountType("percent")}
                        className={`px-1.5 py-0.5 rounded ${
                          discountType === "percent" ? "bg-primary text-primary-foreground font-semibold" : "text-muted-foreground"
                        }`}
                      >
                        % Pct
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      id="disc-val"
                      type="number"
                      min="0"
                      value={discountValue}
                      onChange={(e) => setDiscountValue(Math.max(0, parseFloat(e.target.value) || 0))}
                    />
                    <span className="text-sm font-semibold text-muted-foreground">
                      {discountType === "percent" ? "%" : "₹"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* RIGHT: LIVE INVOICE PREVIEW CARD (Printable & Exportable) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="no-print flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <FileText className="size-4 text-primary" /> Live Invoice Preview
              </h2>
              <span className="text-xs text-muted-foreground">A4 Ready</span>
            </div>

            <div
              ref={invoicePreviewRef}
              className="printable-invoice-container bg-[#0f1115] border border-border/80 rounded-xl p-6 sm:p-8 shadow-2xl text-slate-100 space-y-6"
            >
              {/* Header: Business Logo & Meta */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 border-b border-border/60 pb-6">
                <div>
                  <div className="flex items-center gap-2">
                    <Building2 className="size-6 text-amber-500" />
                    <span className="font-display text-2xl tracking-wider text-white uppercase">
                      TERRA <span className="text-amber-500">Mindspace</span>
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-slate-400">
                    {RESTAURANT.tagline}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-400">
                    {RESTAURANT.address}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-400">
                    Phone: {RESTAURANT.phone} | GSTIN: 32ABCDE1234F1Z5
                  </p>
                </div>

                <div className="sm:text-right space-y-1">
                  <Badge variant="outline" className="invoice-badge border-amber-500/50 text-amber-400 text-xs px-3 py-1">
                    TAX INVOICE
                  </Badge>
                  <div className="text-sm font-mono font-bold text-white mt-2">
                    {invoiceNumber || "INV-0000"}
                  </div>
                  <div className="text-xs text-slate-400">
                    Date: <span className="text-slate-200">{invoiceDate}</span>
                  </div>
                </div>
              </div>

              {/* Billed To / Customer Box */}
              <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row sm:justify-between gap-4">
                <div>
                  <div className="text-[0.65rem] tracking-wider text-amber-500 uppercase font-semibold">
                    Billed To
                  </div>
                  <div className="text-base font-semibold text-white mt-0.5">
                    {customerName || "Walk-in Guest"}
                  </div>
                  {customerContact && (
                    <div className="text-xs text-slate-400 mt-0.5">
                      Contact: {customerContact}
                    </div>
                  )}
                </div>

                <div className="sm:text-right">
                  <div className="text-[0.65rem] tracking-wider text-slate-400 uppercase font-semibold">
                    Payment Status
                  </div>
                  <div className="text-xs font-semibold text-emerald-400 mt-0.5">
                    PAID / COMPLETED
                  </div>
                  <div className="text-[0.7rem] text-slate-400 mt-0.5">
                    Currency: INR (₹)
                  </div>
                </div>
              </div>

              {/* Itemized Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 uppercase text-[0.65rem] tracking-wider">
                      <th className="py-2.5 px-2">Sl.</th>
                      <th className="py-2.5 px-2">Item Description</th>
                      <th className="py-2.5 px-2 text-center">Qty</th>
                      <th className="py-2.5 px-2 text-right">Price</th>
                      <th className="py-2.5 px-2 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {items.map((item, i) => {
                      const itemTotal = (item.quantity || 0) * (item.price || 0);
                      return (
                        <tr key={item.id} className="text-slate-200">
                          <td className="py-3 px-2 text-slate-500">{i + 1}</td>
                          <td className="py-3 px-2 font-medium text-white">{item.name || "Custom Item"}</td>
                          <td className="py-3 px-2 text-center text-slate-300">{item.quantity}</td>
                          <td className="py-3 px-2 text-right text-slate-300">₹{(item.price || 0).toFixed(2)}</td>
                          <td className="py-3 px-2 text-right font-semibold text-white">₹{itemTotal.toFixed(2)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <Separator className="bg-slate-800" />

              {/* Calculation Summary Box */}
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
                <div className="text-xs text-slate-400 space-y-1">
                  <p className="font-semibold text-slate-300">Terms & Conditions:</p>
                  <p>1. Invoice generated electronically by TERRA Mindspace.</p>
                  <p>2. Prices are inclusive of applicable taxes.</p>
                  <p className="mt-2 text-amber-500 italic">Thank you for dining with TERRA Mindspace!</p>
                </div>

                <div className="w-full sm:w-64 space-y-2 bg-slate-900/80 p-4 rounded-lg border border-slate-800 text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span>Subtotal:</span>
                    <span>{formatINR(subtotal)}</span>
                  </div>
                  {taxPercent > 0 && (
                    <div className="flex justify-between text-slate-400">
                      <span>GST ({taxPercent}%):</span>
                      <span>+{formatINR(taxAmount)}</span>
                    </div>
                  )}
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-400">
                      <span>Discount ({discountType === "percent" ? `${discountValue}%` : "Flat"}):</span>
                      <span>-{formatINR(discountAmount)}</span>
                    </div>
                  )}

                  <div className="border-t border-slate-700 pt-2 flex justify-between items-center text-base font-bold text-amber-400">
                    <span>Grand Total:</span>
                    <span>{formatINR(grandTotal)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons Below Preview */}
            <div className="no-print flex items-center justify-end gap-3 pt-2">
              <Button variant="outline" size="sm" onClick={handlePrint} className="gap-2">
                <Printer className="size-4 text-primary" />
                Print
              </Button>
              <Button
                variant="gold"
                size="sm"
                onClick={handleDownloadPdf}
                disabled={isGeneratingPdf}
                className="gap-2"
              >
                <Download className="size-4" />
                {isGeneratingPdf ? "Generating PDF..." : "Download PDF"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
