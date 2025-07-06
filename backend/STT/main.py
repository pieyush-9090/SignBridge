from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import os
from ultralytics import YOLO
import shutil

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MODEL_PATH = "weights/best.pt"
if not os.path.exists(MODEL_PATH):
    raise FileNotFoundError(f"Model file not found: {MODEL_PATH}")

model = YOLO(MODEL_PATH)

@app.get("/")
def read_root():
    return {"message": "Backend is running!"}

@app.post("/predict")
async def predict(image: UploadFile = File(...)):
    if image.content_type not in ["image/png", "image/jpeg"]:
        raise HTTPException(status_code=400, detail="Invalid file format")
    os.makedirs("uploads", exist_ok=True)
    file_path = os.path.join("uploads", image.filename)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)

    results = model(file_path)
    detected_objects = []
    for result in results:
        for box in result.boxes:
            cls_id = int(box.cls[0].item())
            conf = round(float(box.conf[0].item()), 2)
            class_name = model.names[cls_id]
            xyxy = box.xyxy[0].tolist()
            if class_name.lower() == 'hand':
                detected_objects.append({
                    "class": class_name,
                    "confidence": conf,
                    "bbox": xyxy
                })
    return JSONResponse(content={"predictions": detected_objects}) 