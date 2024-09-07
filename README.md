# Multimodal Test Case Generator

This tool generates detailed testing instructions for any digital product feature, based on uploaded screenshots and optional text context. It leverages a multimodal large language model (LLM) to generate comprehensive, step-by-step test cases, helping QA teams and developers streamline their testing processes.

## Features

- **Optional Context**: A text box for adding additional context to provide more detailed test cases.
- **Multi-Image Uploader**: Upload screenshots that showcase the functionality or feature you want to test.
- **Detailed Test Cases**: Automatically generate a step-by-step guide for testing each feature, including:
  - **Description**: A summary of the test case.
  - **Pre-conditions**: Requirements or setup needed before testing.
  - **Testing Steps**: Clear and actionable steps for performing the test.
  - **Expected Result**: The expected outcome if the functionality works correctly.

## Getting Started

### Prerequisites
- Node.js
- Multimodal LLM API key (e.g., OpenAI API or any other provider)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ScreenshotsTestCaseGenerator.git
   cd ScreenshotsTestCaseGenerator

2. Install dependencies:
   ```bash
   npm install
   
3. Set up your API keys:
   Add your multimodal LLM API key to the .env file:
   ```bash
   API_KEY=your_api_key

4. Start the server:
   ```bash
   cd ./server
   npm start

5. Start the client:
   ```bash
   cd ./client
   npm start

## Features

1. Open the web page in your browser.
2. Upload screenshots of the feature you want to generate test cases for.
2. Optionally, add any context or description for better results.
3. Click the Describe Testing Instructions button.
4. Review the detailed test cases, including pre-conditions, testing steps, and expected results.

## Technologies Used
- Front-End: React.js
- Back-End: Node.js, Express.js

## Screenshots
![Test Case Generator img1](https://github.com/user-attachments/assets/aefa2342-bb6b-421f-a02a-50d607421bc6)

![Test Case Generator img2](https://github.com/user-attachments/assets/fbe1714a-bea9-4be2-9b57-034f5d446099)

![Test Case Generator img3](https://github.com/user-attachments/assets/c3eb461c-d4da-4163-9e26-e62b5636779a)

![Test Case Generator img4](https://github.com/user-attachments/assets/8429d9ec-5287-4434-af0a-1241f31f44c5)


## Prompting Strategy
See the prompt in index.js and gave it a sample example to handle the proper format of response and such that the result can be displayed properly in html using ReactMarkdown.

