import os
import re

SVG_DIR = "backend/TTS/img"

def replace_black_with_white(svg_path):
    with open(svg_path, "r", encoding="utf-8") as f:
        content = f.read()
    # Replace various black color codes with white
    content_new = re.sub(r'fill="#000(?:000)?"', 'fill="#fff"', content, flags=re.IGNORECASE)
    content_new = re.sub(r'stroke="#000(?:000)?"', 'stroke="#fff"', content_new, flags=re.IGNORECASE)
    # Also handle rgb(0,0,0) and similar
    content_new = re.sub(r'fill="rgb\\(0, ?0, ?0\\)"', 'fill="#fff"', content_new, flags=re.IGNORECASE)
    content_new = re.sub(r'stroke="rgb\\(0, ?0, ?0\\)"', 'stroke="#fff"', content_new, flags=re.IGNORECASE)
    if content != content_new:
        with open(svg_path, "w", encoding="utf-8") as f:
            f.write(content_new)
        print(f"Updated: {svg_path}")

for filename in os.listdir(SVG_DIR):
    if filename.lower().endswith(".svg"):
        replace_black_with_white(os.path.join(SVG_DIR, filename))

print("Batch conversion complete.")