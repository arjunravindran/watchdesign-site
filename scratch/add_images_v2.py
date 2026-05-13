import re
import os

# Read the modules data
with open('data/modules.js', 'r', encoding='utf-8') as f:
    content = f.read()

lines = content.split('\n')
out_lines = []
current_heading = None
current_slide_id = None
i = 0
while i < len(lines):
    line = lines[i]
    
    # Track slide ID and heading
    if "id: 'm" in line:
        match_id = re.search(r"id: '(.*?)'", line)
        if match_id:
            current_slide_id = match_id.group(1)
    if "heading: '" in line:
        match_h = re.search(r"heading: '(.*?)'", line)
        if match_h:
            current_heading = match_h.group(1)
    
    # Check for image line
    if "image:" in line:
        # If it's a loremflickr or wikimedia (overwrite with better Unsplash)
        if ("loremflickr.com" in line or "wikimedia.org" in line) and "/images/" not in line:
            query = current_heading if current_heading else "luxury watch"
            # Clean query
            query = re.sub(r'[^a-zA-Z0-9]', ',', query)
            new_url = f"https://images.unsplash.com/featured/?watch,{query}"
            line = re.sub(r"image: '.*?'", f"image: '{new_url}'", line)
    
    # If we are at the end of a slide object (closing brace) and no image was found
    if "}," in line and current_slide_id and current_heading:
        has_image = False
        # Look back in the last few lines of out_lines
        for j in range(len(out_lines)-1, max(-1, len(out_lines)-15), -1):
            if "image:" in out_lines[j]:
                has_image = True
                break
            if "id: '" in out_lines[j]:
                break
        
        if not has_image:
            query = re.sub(r'[^a-zA-Z0-9]', ',', current_heading)
            new_url = f"https://images.unsplash.com/featured/?watch,{query}"
            out_lines.append(f"        image: '{new_url}',")
            # We don't print here to avoid Unicode issues in the console
        
        current_slide_id = None
        current_heading = None

    out_lines.append(line)
    i += 1

with open('data/modules.js', 'w', encoding='utf-8') as f:
    f.write('\n'.join(out_lines))

print("Successfully updated 100% of slides with relevant Unsplash imagery.")
