import { NextResponse } from "next/server";

// 🇵🇰 Pakistan DATE only (YYYY-MM-DD)
function getPakistanDate() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Karachi",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

export async function POST(request) {
  try {
    const orderData = await request.json();

    // Validate required fields
    const { name, email, phone, address, city, items, subtotal } = orderData;

    if (!name || !email || !phone || !address || !city || !items || items.length === 0) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Google Apps Script Web App URL
    const googleScriptUrl =
      "https://script.google.com/macros/s/AKfycbyfQADQ2Q-D5eD5ktsU05HU9pw8lxPnh2xXhwnGXse22euG-K0d3CyY-WpGq_qKOtfx/exec";

    if (!googleScriptUrl) {
      console.error("[Google Script] URL is not set");
      return NextResponse.json(
        { success: false, message: "Server configuration error" },
        { status: 500 }
      );
    }

    // Format items for Google Sheet
    const itemsString = items
      .map(
        (item) =>
          `${item.name} (Qty: ${item.quantity}) - Rs. ${item.total.toLocaleString()}`
      )
      .join(" | ");

    // Prepare data for Google Sheets
    const sheetData = {
      timestamp: getPakistanDate(), // ✅ DATE ONLY
      name,
      email,
      phone,
      city,
      address,
      items: itemsString,
      totalItems: items.reduce((sum, item) => sum + item.quantity, 0),
      subtotal: `Rs. ${subtotal.toLocaleString()}`,
      notes: orderData.notes || "",
      status: "New",
    };

    // Send to Google Apps Script
    const response = await fetch(googleScriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain", // required for GAS
      },
      body: JSON.stringify(sheetData),
      redirect: "follow",
    });

    const responseText = await response.text();
    console.log("[Google Script] Response:", responseText);

    return NextResponse.json({
      success: true,
      message: "Order submitted successfully",
    });
  } catch (error) {
    console.error("Error submitting order:", error);
    return NextResponse.json(
      { success: false, message: "Failed to submit order" },
      { status: 500 }
    );
  }
}
