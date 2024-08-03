import { NextResponse } from "next/server";

export async function POST(request) {
  console.log("API route called"); // Add this line
  const { url, quality } = await request.json();
  console.log("Received request:", { url, quality }); // Add this line

  try {
    console.log("Sending request to backend"); // Add this line
    const response = await fetch("http://127.0.0.1:8000/download", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url, quality }),
    });

    console.log("Backend response status:", response.status); // Add this line

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Backend error response:", errorText);
      throw new Error(
        `Failed to fetch video data: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    console.log("Data received from backend:", data); // Add this line
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
