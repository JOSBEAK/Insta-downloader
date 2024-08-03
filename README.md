# Instagram Video Downloader

This project is a full-stack application that allows users to download videos from Instagram. It consists of a Next.js frontend and a FastAPI backend.

## Project Structure

```
instagram-video-downloader/
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── styles/
│   └── package.json
├── backend/
│   ├── main.py
│   └── requirements.txt
└── README.md
```

## Features

- User-friendly interface to input Instagram video URLs
- Backend API to fetch video data from Instagram
- Video preview and download functionality

## Technologies Used

- Frontend: Next.js, React, Tailwind CSS
- Backend: FastAPI, Python

## Setup and Installation

### Prerequisites

- Node.js (v14 or later)
- Python (v3.7 or later)
- npm or yarn
- pip

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```
   or
   ```
   yarn install
   ```

3. Create a `.env.local` file in the frontend directory and add any necessary environment variables.

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Create a virtual environment:
   ```
   python -m venv venv
   ```

3. Activate the virtual environment:
   - On Windows:
     ```
     venv\Scripts\activate
     ```
   - On macOS and Linux:
     ```
     source venv/bin/activate
     ```

4. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

5. Create a `.env` file in the backend directory and add the following variables:
   ```
   RAPIDAPI_KEY=your_rapidapi_key_here
   RAPIDAPI_HOST=your_rapidapi_host_here
   RAPIDAPI_ENDPOINT=your_rapidapi_endpoint_here
   ```

## Running the Application Locally

1. Start the backend server:
   ```
   cd backend
   uvicorn main:app --reload
   ```

2. In a new terminal, start the frontend development server:
   ```
   cd frontend
   npm run dev
   ```
   or
   ```
   yarn dev
   ```

3. Open your browser and navigate to `http://localhost:3000`

## Deployment

This project is configured for deployment on Vercel. Follow these steps to deploy:

1. Install the Vercel CLI:
   ```
   npm i -g vercel
   ```

2. From the project root, run:
   ```
   vercel
   ```

3. Follow the prompts to link your project to your Vercel account.

4. Set up environment variables in the Vercel dashboard.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[MIT License](https://opensource.org/licenses/MIT)

## Disclaimer

This tool is for educational purposes only. Please respect Instagram's terms of service and use this responsibly.
