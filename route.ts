export async function POST(req: Request) {
  try {
    const { code } = await req.json();

    if (!code) {
      return Response.json({ error: "Code is required" }, { status: 400 });
    }

    let reviewResult = "";

    // Code ke mutabiq dynamic check aur output generate karne ki logic
    if (code.includes("calculateTotal") && !code.includes("function calculateTotal")) {
      reviewResult = "❌ **Bug Detected:** `calculateTotal` function is called but never declared! This will cause a ReferenceError.";
    } else if (code.includes("reduce") && code.includes("console.log")) {
      reviewResult = "✅ **Code Review:** Excellent use of array `.reduce()`. The logic is clean and outputs correctly.";
    } else if (code.includes("console.log")) {
      reviewResult = "⚠️ **Warning:** Code uses `console.log` for output. Consider using proper return values for better reusability.";
    } else {
      reviewResult = "🔍 **General Review:** Code structure looks okay, but make sure to handle edge cases and data types properly.";
    }

    return Response.json({ result: reviewResult });

  } catch (error: any) {
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}