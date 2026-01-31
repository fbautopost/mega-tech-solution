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
    const googleScriptUrl = process.env.GOOGLE_CONTACT_SCRIPT_URL
    
    if (!googleScriptUrl) {
      console.error("GOOGLE_CONTACT_SCRIPT_URL environment variable is not set")
      return NextResponse.json(
        { success: false, message: "Server configuration error" },
        { status: 500 }
      )
    }

    // Prepare data for Google Sheets
    const sheetData = {
      timestamp: new Date().toLocaleString("en-PK", { timeZone: "Asia/Karachi" }),
      name: data.name,
      email: data.email,
      phone: data.phone || "Not provided",
      subject: data.subject,
      message: data.message,
      status: "New"
    }

    // Send to Google Apps Script
    const response = await fetch(googleScriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
      },
      body: JSON.stringify(sheetData),
      redirect: "follow"
    })

    const responseText = await response.text()
    
    // Try to parse response
    let result = { success: true }
    try {
      result = JSON.parse(responseText)
    } catch {
      // If response isn't JSON, assume success
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
