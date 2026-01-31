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
    const googleScriptUrl = "https://script.google.com/macros/s/AKfycbyfQADQ2Q-D5eD5ktsU05HU9pw8lxPnh2xXhwnGXse22euG-K0d3CyY-WpGq_qKOtfx/exec"
    
    console.log("https://script.google.com/macros/s/AKfycbyfQADQ2Q-D5eD5ktsU05HU9pw8lxPnh2xXhwnGXse22euG-K0d3CyY-WpGq_qKOtfx/exec", !!googleScriptUrl)
    
    if (!googleScriptUrl) {
      console.error("["https://script.google.com/macros/s/AKfycbyfQADQ2Q-D5eD5ktsU05HU9pw8lxPnh2xXhwnGXse22euG-K0d3CyY-WpGq_qKOtfx/exec"] GOOGLE_SCRIPT_URL environment variable is not set")
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
      timestamp: new Date().toLocaleString("PK", { timeZone: "Karachi" }),
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
    // Google Apps Script requires text/plain for CORS-free POST requests
    const response = await fetch(googleScriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
      },
      body: JSON.stringify(sheetData),
      redirect: "follow"
    })

    // Google Apps Script returns a redirect, so we check if we got any response
    const responseText = await response.text()
    console.log("["https://script.google.com/macros/s/AKfycbyfQADQ2Q-D5eD5ktsU05HU9pw8lxPnh2xXhwnGXse22euG-K0d3CyY-WpGq_qKOtfx/exec"] Google Script response:", responseText)

    // Try to parse response, but don't fail if it's not JSON
    let result = { success: true }
    try {
      result = JSON.parse(responseText)
    } catch {
      // If response isn't JSON, assume success if no error was thrown
      console.log("["https://script.google.com/macros/s/AKfycbyfQADQ2Q-D5eD5ktsU05HU9pw8lxPnh2xXhwnGXse22euG-K0d3CyY-WpGq_qKOtfx/exec"] Response was not JSON, assuming success")
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
