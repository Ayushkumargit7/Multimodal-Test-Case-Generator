const express = require("express");
const multer = require("multer");
const cors = require("cors");  // Import the cors package
const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = 5000;

app.use(cors()); 

const storage = multer.memoryStorage();
const upload = multer({ storage }).array("images");

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

app.post("/api/describe", upload, async (req, res) => {
  try {
    const { context } = req.body;
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({ error: "No images uploaded" });
    }

    // Prepare images in base64 format for API request .
    const images = files.map((file) => {
      return {
        inlineData: {
          data: file.buffer.toString("base64"),
          mimeType: file.mimetype, 
        },
      };
    });

    let prompt = `
      Describe test cases based on the provided screenshots ${context ? `and the following context: ${context}` : ''}.
      - Output should describe a detailed, step-by-step guide on how to test each functionality.
      Each test case should include:
      - Description: What the test case is about.
      - Pre-conditions: What needs to be set up or ensured before testing.
      - Testing Steps: Clear, step-by-step instructions on how to perform the test.
      - Expected Result: What should happen if the feature works correctly.
      
      Note:Follow the below example format-
      **Test Cases for Bus Booking App**

      **Test Case 1: Verify Bus Details**

      - **Description:** Verify that the bus details are displayed correctly.
      - **Pre-conditions:** The app is open and a bus route is selected.
      - **Testing Steps:**
      - **1.** Observe the displayed bus details, including the departure time, arrival time, duration, number of seats available, bus operator name, and bus type.
      - **2.** Verify that the information matches the selected bus route.
      - **Expected Result:** The displayed bus details should be accurate and consistent with the selected bus route.


        **Test Case 2: Verify Price and Discount**

      - **Description:** Verify the price and discount information is displayed correctly.
      - **Pre-conditions:** The app is open and a bus route is selected.
      - **Testing Steps:**
      - **1.** Observe the displayed price and discount information, including the original price, discount amount, and final price.
      - **2.** Verify that the discount amount is correctly calculated and deducted from the original price.
      - **Expected Result:** The displayed price and discount should be accurate and reflect the correct calculations.

      **Test Case 3: Verify Bus Rating**

      - **Description:** Verify that the bus rating is displayed correctly.
      - **Pre-conditions:** The app is open and a bus route is selected.
      - **Testing Steps:**
      -  **1.** Observe the displayed bus rating, including the star rating and the number of reviews. 
      -  **2.** Verify that the rating is accurate and consistent with the bus operator’s reputation.
      - **Expected Result:** The displayed bus rating should be accurate and consistent with the bus operator’s reputation.
    `;

    const input = [prompt, ...images];

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Send the request to the model
    const result = await model.generateContent(input);

    // Send back the response from the model
    res.json({ description: result.response.text() });
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ error: "Failed to generate description" });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

