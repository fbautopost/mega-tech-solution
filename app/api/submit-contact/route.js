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

    // Use ENV variable (BEST PRACTICE)
    const googleScriptUrl = "https://script.google.com/macros/s/AKfycbwIWXKtSoYqmbWgx2lDJA96_LKxtJGvmUnqTkv4nvm6Bz1sP_FZCXWbi1GXT0hbQmpCIA/exec"
    console.log("GOOGLE_CONTACT_SCRIPT_URL exists:", !!googleScriptUrl)

    if (!googleScriptUrl) {
      console.error("GOOGLE_CONTACT_SCRIPT_URL is not set")
      return NextResponse.json(
        { success: false, message: "Server configuration error" },
        { status: 500 }
      )
    }

    // Prepare data for Google Sheets
    const sheetData = {
      name: data.name,
      email: data.email,
      phone: data.phone || "Not provided",
      subject: data.subject,
      message: data.message,
      timestamp: new Date().toISOString(),
    }

    console.log("Sending data to Google Script:", sheetData)

    const response = await fetch(googleScriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sheetData),
      redirect: "follow",
    })

    const responseText = await response.text()
    console.log("Google Script raw response:", responseText)

    let result
    try {
      result = JSON.parse(responseText)
    } catch {
      result = { success: true }
    }

    if (!response.ok || result.success === false) {
      return NextResponse.json(
        { success: false, message: "Failed to save message" },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: "Message sent successfully",
    })

  } catch (error) {
    console.error("Contact submission error:", error)
    return NextResponse.json(
      { success: false, message: "Failed to send message. Please try again." },
      { status: 500 }
    )
  }
}
