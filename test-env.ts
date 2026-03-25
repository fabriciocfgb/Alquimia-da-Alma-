console.log("GEMINI_API_KEY present:", !!process.env.GEMINI_API_KEY);
if (process.env.GEMINI_API_KEY) {
  console.log("Prefix:", process.env.GEMINI_API_KEY.substring(0, 4));
}
