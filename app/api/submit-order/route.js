import { NextResponse } from "next/server"

export async function POST(request) {
  try {
    const orderData = await request.json()
    
    // Validate required fields
    const { name, email, phone, address, city, items, subtotal } = orderData
    
    if (!name || !email || !phone || !address || !city || !items || items.length === 0) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      )
    }

    // Get Google Apps Script Web App URL from environment variable
    const googleScriptUrl = process.env.GOOGLE_SCRIPT_URL
    
    if (!googleScriptUrl) {
      console.error("GOOGLE_SCRIPT_URL environment variable is not set")
      return NextResponse.json(
        { success: false, message: "Server configuration error" },
        { status: 500 }
      )
    }

    // Format items for Google Sheet
    const itemsString = items.map(item => 
      `${item.name} (Qty: ${item.quantity}) - Rs. ${item.total.toLocaleString()}`
    ).join(" | ")

    // Prepare data for Google Sheets
    const sheetData = {
      timestamp: new Date().toISOString(),
      name,
      email,
      phone,
      city,
      address,
      items: itemsString,
      totalItems: items.reduce((sum, item) => sum + item.quantity, 0),
      subtotal: `Rs. ${subtotal.toLocaleString()}`,
      notes: orderData.notes || "",
      status: "New"
    }

    // Send to Google Apps Script
    const response = await fetch(googleScriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sheetData),
    })

    if (!response.ok) {
      throw new Error("Failed to submit to Google Sheets")
    }

    return NextResponse.json({ 
      success: true, 
      message: "Order submitted successfully" 
    })

  } catch (error) {
    console.error("Error submitting order:", error)
    return NextResponse.json(
      { success: false, message: "Failed to submit order" },
      { status: 500 }
    )
  }
}
