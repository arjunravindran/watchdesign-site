import os
import re

# Base directory for public images
IMAGE_DIR = 'public/images/generated'
MODULES_JS = 'data/modules.js'

if not os.path.exists(IMAGE_DIR):
    os.makedirs(IMAGE_DIR)
    print(f"Created directory: {IMAGE_DIR}")
    print("Please drop your generated images in this directory and run this script again.")
    exit(0)

# Get all files in the directory
files = os.listdir(IMAGE_DIR)
if not files:
    print(f"No files found in {IMAGE_DIR}. Please drop your generated images there.")
    exit(0)

print(f"Found {len(files)} files in {IMAGE_DIR}. Processing...")

# Read modules.js
with open(MODULES_JS, 'r', encoding='utf-8') as f:
    content = f.read()

updated_count = 0

for file in files:
    if not file.lower().endswith('.png'):
        continue
    
    # Try to extract slide ID from filename
    # e.g., m01_s01_something.png -> m01-s01
    match = re.match(r'^(m\d+)_s(\d+)', file)
    if not match:
        print(f"Skipping file with unrecognized name format: {file}")
        continue
    
    module_str = match.group(1)
    slide_num_str = match.group(2)
    slide_id = f"{module_str}-s{slide_num_str}"
    
    # We want to replace the image field for this slide ID
    # A slide looks like:
    # {
    #   id: 'm01-s01',
    #   type: 'hero',
    #   ...
    #   image: '...',
    # }
    # Let's search for this slide block using regex
    # We can match slide block using the id: 'slide_id'
    pattern = rf"(\{{\s*id:\s*'{slide_id}',[\s\S]*?image:\s*')(.*?)(')"
    
    # Check if this slide exists in modules.js
    if re.search(pattern, content):
        new_path = f"/images/generated/{file}"
        
        # Replace the image field
        content = re.sub(pattern, rf"\g<1>{new_path}\g<3>", content)
        print(f"Updated slide {slide_id} to use local image: {new_path}")
        updated_count += 1
    else:
        print(f"Slide ID {slide_id} not found in modules.js (from file: {file})")

if updated_count > 0:
    # Save modules.js
    with open(MODULES_JS, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"\nSuccessfully updated {updated_count} slides in {MODULES_JS}!")
else:
    print("\nNo slides were updated. Make sure file names match the format (e.g. m01_s01_name.png)")
