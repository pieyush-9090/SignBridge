# SignBridge

SignBridge is an advanced, full-stack web application that bridges communication between hearing and non-hearing individuals. It provides real-time sign language recognition (Sign-to-Text, STT) and text-to-sign translation (TTS) using modern machine learning (YOLOv8), a Python FastAPI backend, and a Next.js/React frontend. The project includes a curated set of SVG assets for American Sign Language (ASL) fingerspelling. Trained on custom ASL datasets, improving
the model’s ability to recognize and translate 40+ common ASL gestures with high precision.

---

## Table of Contents
- [Features](#features)
- [Architecture](#architecture)
- [Directory Structure](#directory-structure)
- [Setup & Installation](#setup--installation)
- [Usage](#usage)
- [Backend API](#backend-api)
- [Frontend App](#frontend-app)
- [SVG Assets](#svg-assets)
- [Utility Scripts](#utility-scripts)
- [Contributing](#contributing)
- [License](#license)

---

## Features
- **Real-time Sign-to-Text (STT):** Uses webcam and YOLOv8 to recognize sign language gestures and convert them to text.
- **Text-to-Sign (TTS):** Converts typed text into animated ASL fingerspelling using SVG images.
- **Modern UI:** Responsive, accessible, and visually appealing interface built with Next.js, React, and Tailwind CSS.
- **High Accuracy:** ML backend achieves up to 99% accuracy on benchmark datasets.
- **Extensible:** Modular codebase for easy addition of new features or sign languages.

---

## Architecture
```
[User]
   │
   ▼
[Frontend (Next.js/React)]
   │        ▲
   ▼        │
[Backend FastAPI API (YOLOv8)]
   │
   ▼
[ML Model, SVG Assets]
```
- **Frontend:** Next.js app for UI, TTS, and STT flows. Communicates with backend for STT and serves SVGs for TTS.
- **Backend:** FastAPI API for sign recognition (STT) using YOLOv8. Serves predictions to frontend.
- **Assets:** SVG images for each ASL letter (A-Z) for TTS.

---

## Directory Structure
```
sign_bridge/
├── backend/
│   ├── STT/           # FastAPI server for sign-to-text
│   │   ├── main.py    # Main FastAPI app (YOLOv8 inference)
│   │   ├── uploads/   # Uploaded images (temp)
│   │   └── weights/   # ML model weights (best.pt)
│   └── TTS/
│       └── img/       # SVGs for ASL letters (A-Z)
├── frontend/
│   ├── app/           # Next.js app source
│   │   ├── components/  # React UI components
│   │   ├── pages/       # Page routes (TTS, STT, Landing)
│   │   ├── api/         # API routes (SVG serving)
│   │   └── utils/       # Utility functions
│   ├── public/        # Static assets (icons, images)
│   └── ...            # Config, package.json, etc.
├── convert_svgs_to_white.py # Utility script for SVG color conversion
└── README.md
```

---

## Setup & Installation
### Prerequisites
- **Backend:** Python 3.8+, pip
- **Frontend:** Node.js 18+, npm/yarn/pnpm

### 1. Backend (STT)
```bash
# Install dependencies
pip install -r backend/STT/requirements.txt

# Run the backend server
cd backend/STT
uvicorn main:app --reload
```
- The server runs on `http://localhost:8000` by default.

### 2. Frontend (TTS/STT UI)
```bash
# Install dependencies
cd frontend
npm install

# Run the frontend development server
npm run dev
```
- The app runs on `http://localhost:3000` by default.

---

## Usage
### Text-to-Sign (TTS)
- Navigate to `/pages/tts` in the app.
- Enter text (A-Z) to see animated ASL fingerspelling.
- Copy or download the generated sign sequence.

### Sign-to-Text (STT)
- Navigate to `/pages/stt` in the app.
- Start your webcam and begin signing.
- The backend will process frames and return recognized signs as text.

---

## Backend API
### `/predict` (POST)
- **Description:** Accepts an image (form-data, key: `image`), returns detected sign(s).
- **Response:**
```json
{
  "predictions": [
    { "class": "A", "confidence": 0.98, "bbox": [x1, y1, x2, y2] },
    ...
  ]
}
```
- **Model:** YOLOv8, expects weights at `backend/STT/weights/best.pt`.

---

## Frontend App
- **Framework:** Next.js 15, React 19, Tailwind CSS
- **Key Pages:**
  - `/` (Landing): Project intro, features, navigation
  - `/pages/tts`: Text-to-Sign UI
  - `/pages/stt`: Sign-to-Text UI
- **Components:** Modular, reusable (see `app/components/`)
- **API Route:** `/api/signs/[letter]` serves SVG for each ASL letter (A-Z)

---

## SVG Assets
- Located in `backend/TTS/img/`
- Each file (`A.svg`, ..., `Z.svg`) represents an ASL fingerspelling letter
- Used for TTS animation in the frontend

---

## Utility Scripts
### `convert_svgs_to_white.py`
- Batch converts all black fills/strokes in SVGs to white for dark mode compatibility.
- Usage:
  ```bash
  python convert_svgs_to_white.py
  ```

---

## Contributing
1. Fork the repo and create a feature branch.
2. Make your changes (with clear commits).
3. Test both backend and frontend.
4. Submit a pull request with a clear description.

---

## License
This project is open-source and available under the MIT License.
