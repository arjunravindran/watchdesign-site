import urllib.request
import urllib.parse
import json
import re
import time
import os

# Read the modules data
with open('data/modules.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Keywords to search for. We'll cycle through these to get images.
search_queries = [
    "watch movement", "watchmaker", "rolex", "patek philippe", "seiko",
    "watch escapement", "chronograph", "tourbillon", "watch dial", "watch hands",
    "luxury watch", "swiss alps", "geneva", "watch gears", "pocket watch",
    "guilloche", "horology", "watch case", "watch spring", "mechanical watch",
    "watch design", "blueprint", "cad design", "typography", "watch strap",
    "watch polishing", "watch assembly", "camera lens", "ecommerce", "luxury lifestyle",
    "vintage watch", "watch repair", "watch jewels", "mainspring", "balance wheel",
    "omega speedmaster", "audemars piguet", "cartier watch", "watch crown", "watch bezel",
    "leather strap", "metal bracelet", "watch luminous", "watch crystal", "watch back",
    "watchmaking tools", "watch sketch", "luxury boutique", "success", "graduation"
]

images_cache = []

def get_wikimedia_image(query):
    url = f"https://commons.wikimedia.org/w/api.php?action=query&format=json&prop=imageinfo&generator=search&gsrsearch={urllib.parse.quote(query)}&gsrnamespace=6&gsrlimit=1&iiprop=url"
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'WatchDesignBot/1.0 (arjun@watchdesign.com)'})
        response = urllib.request.urlopen(req)
        data = json.loads(response.read().decode())
        pages = data.get('query', {}).get('pages', {})
        for page_id, page in pages.items():
            if 'imageinfo' in page and len(page['imageinfo']) > 0:
                img_url = page['imageinfo'][0]['url']
                # Basic filter for non-image files
                if any(img_url.lower().endswith(ext) for ext in ['.jpg', '.jpeg', '.png', '.svg', '.webp']):
                    return img_url
    except Exception as e:
        print(f"Error fetching {query}: {e}")
    return None

print("Fetching images from Wikimedia Commons...")
for q in search_queries:
    img = get_wikimedia_image(q)
    if img:
        images_cache.append(img)
    else:
        # Fallback to a loremflickr watch image
        images_cache.append(f"https://loremflickr.com/800/500/watch?lock={len(images_cache)}")
    time.sleep(0.05) # Be nice to API

print(f"Successfully fetched {len(images_cache)} images.")

out_content = ""
image_idx = 0
added_count = 0

lines = content.split('\n')
i = 0
while i < len(lines):
    line = lines[i]
    out_content += line + '\n'
    
    # Check if this is a slide object and doesn't already have an image
    if 'heading:' in line:
        # Look ahead to see if 'image:' already exists in this object
        has_image = False
        for j in range(max(0, i-2), min(len(lines), i+3)):
            if 'image:' in lines[j]:
                has_image = True
                break
        
        if not has_image:
            if image_idx < len(images_cache):
                img_url = images_cache[image_idx]
                out_content += f"        image: '{img_url}',\n"
                image_idx += 1
                added_count += 1
    i += 1

with open('data/modules.js', 'w', encoding='utf-8') as f:
    f.write(out_content)

print(f"Injected {added_count} images into data/modules.js")
