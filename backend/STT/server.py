from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
from werkzeug.utils import secure_filename
import os
from ultralytics import YOLO

app = Flask(__name__)
CORS(app)  # Enable CORS

MODEL_PATH = "weights/best.pt"
if not os.path.exists(MODEL_PATH):
    raise FileNotFoundError(f"Model file not found: {MODEL_PATH}")

model = YOLO(MODEL_PATH)

ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg"}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route("/predict", methods=["POST"])
def predict():
    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    file = request.files["image"]
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file_path = os.path.join("uploads", filename)
        os.makedirs("uploads", exist_ok=True)
        file.save(file_path)

        # Run YOLO model
        results = model(file_path)

        # Extract detected objects
        detected_objects = []
        for result in results:
            for box in result.boxes:
                cls_id = int(box.cls[0].item())  # Class ID
                conf = round(float(box.conf[0].item()), 2)  # Confidence score
                class_name = model.names[cls_id]  # Get class label
                xyxy = box.xyxy[0].tolist()  # [x1, y1, x2, y2]
                if class_name.lower() == 'hand':
                    detected_objects.append({
                        "class": class_name,
                        "confidence": conf,
                        "bbox": xyxy  # [x1, y1, x2, y2]
                    })

        return jsonify({"predictions": detected_objects})

    return jsonify({"error": "Invalid file format"}), 400

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")  # Allows access from different devices
