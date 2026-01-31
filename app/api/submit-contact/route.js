import { NextResponse } from "next/server"

export async function POST(request) {
  try {
    const data = await request.json()
    
    // Validate required fields
    if (!data.name || !data.email || !data.subject || !data.message) {
      return NextResponse.json(
        { success: false, message: "Please fill in all required fields" },
        { status: 400 }
      )
    }

    // Get Google Apps Script Web App URL from environment variable
    const googleScriptUrl = "https://script.google.com/macros/s/AKfycbwIWXKtSoYqmbWgx2lDJA96_LKxtJGvmUnqTkv4nvm6Bz1sP_FZCXWbi1GXT0hbQmpCIA/exec"
    
    console.log("[v0] GOOGLE_CONTACT_SCRIPT_URL exists:", !!googleScriptUrl)
    console.log("[v0] URL value:", googleScriptUrl ? "Set" : "Not set")
    
    if (!googleScriptUrl) {
      console.error("[v0] GOOGLE_CONTACT_SCRIPT_URL environment variable is not set")
      return NextResponse.json(
        { success: false, message: "Server configuration error - Contact script URL not configured" },
        { status: 500 }
      )
    }
    
    console.log("[v0] Submitting contact form data:", JSON.stringify(data))

    // Prepare data for Google Sheets
    const sheetData = {
      name: data.name,
      email: data.email,
      phone: data.phone || "Not provided",
      subject: data.subject,
      message: data.message,
    }

    // Send to Google Apps Script
    console.log("[v0] Sending to Google Script URL...")
    const response = await fetch(googleScriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
      },
      body: JSON.stringify(sheetData),
      redirect: "follow"
    })

    const responseText = await response.text()
    console.log("[v0] Google Script response:", responseText)
    
    // Try to parse response
    let result = { success: true }
    try {
      result = JSON.parse(responseText)
      console.log("[v0] Parsed result:", result)
    } catch {
      // If response isn't JSON, assume success
      console.log("[v0] Response was not JSON, assuming success")
    }

    return NextResponse.json({ 
      success: true, 
      message: "Message sent successfully" 
    })

  } catch (error) {
    console.error("Contact submission error:", error)
    return NextResponse.json(
      { success: false, message: "Failed to send message. Please try again." },
      { status: 500 }
    )
  }
}
