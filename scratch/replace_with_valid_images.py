import re

# Verified working Unsplash watch photo IDs
images_pool = {
    'vintage': [
        '1509048191080-d2984bad6ae5', # Vintage pocket watch
        '1508685096489-7aacd43bd3b1'  # Vintage watch face
    ],
    'movement': [
        '1508057198894-247b23fe5ade', # Skeleton gear watch
        '1600003014755-ba31aa59c4b6'  # Watch movement close up
    ],
    'design': [
        '1511556532299-8f662fc26c06', # Minimal chrono flatlay
        '1639006570490-79c0c53f1080'  # Aesthetic desk watch
    ],
    'luxury': [
        '1585123334904-845d60e97b29', # Luxury gold watch
        '1539874754764-5a96559165b0'  # Luxury close up
    ],
    'minimalist': [
        '1523275335684-37898b6baf30', # Minimalist white watch
        '1526170375885-4d8ecf77b99f'  # Minimalist black watch
    ],
    'leather': [
        '1524592094714-0f0654e20314', # Brown leather strap watch
        '1542496658-e33a6d0d50f6'  # Elegant brown leather strap watch
    ],
    'sport': [
        '1619134778706-7015533a6150', # Black dial diver
        '1604242692760-2f7b0c26856d', # Stainless steel automatic
        '1614164185128-e4ec99c436d7'  # Omega Speedmaster style
    ]
}

all_flat_pool = [img for sub in images_pool.values() for img in sub]

def get_contextual_image(text):
    text = text.lower()
    if any(k in text for k in ['history', 'timeline', 'pocket', 'origins', 'brief', 'ancient']):
        return images_pool['vintage'][0] if 'pocket' in text or 'origins' in text else images_pool['vintage'][1]
    if any(k in text for k in ['mechanical', 'movement', 'escapement', 'inside', 'gear', '3d', 'cad', 'technology']):
        return images_pool['movement'][0] if 'inside' in text or 'escapement' in text else images_pool['movement'][1]
    if any(k in text for k in ['concept', 'sketch', 'render', '2d', 'illustrator', 'design', 'drawing']):
        return images_pool['design'][0] if 'render' in text or 'illustrator' in text else images_pool['design'][1]
    if any(k in text for k in ['materials', 'finishes', 'gold', 'luxury', 'brand', 'premium', 'marketing']):
        return images_pool['luxury'][0] if 'gold' in text or 'luxury' in text else images_pool['luxury'][1]
    if any(k in text for k in ['minimalist', 'clean', 'quartz', 'modern', 'simple']):
        return images_pool['minimalist'][0] if 'white' in text or 'clean' in text else images_pool['minimalist'][1]
    if any(k in text for k in ['leather', 'classic', 'straps', 'vintage', 'traditional']):
        return images_pool['leather'][0] if 'strap' in text else images_pool['leather'][1]
    if any(k in text for k in ['diver', 'sport', 'steel', 'bracelet', 'speedmaster', 'omega', 'rolex']):
        return images_pool['sport'][0] if 'diver' in text else (images_pool['sport'][2] if 'omega' in text else images_pool['sport'][1])
    
    # Hash the text to pick a consistent photo from the flat pool
    idx = abs(hash(text)) % len(all_flat_pool)
    return all_flat_pool[idx]

# Read modules.js
with open('data/modules.js', 'r', encoding='utf-8') as f:
    js_content = f.read()

def replace_image(match):
    full_line = match.group(0)
    image_url = match.group(1)
    
    # Keep local images intact
    if image_url.startswith('/images/'):
        return full_line
    
    # Try to find the slide's heading/title context to pick a good image.
    start_pos = match.start()
    before_text = js_content[max(0, start_pos - 300):start_pos]
    
    # Try to extract heading or title
    heading_match = re.search(r"(?:heading|title):\s*'(.*?)'", before_text)
    context_text = heading_match.group(1) if heading_match else "watch"
    
    photo_id = get_contextual_image(context_text)
    new_url = f"https://images.unsplash.com/photo-{photo_id}?w=800&q=80"
    return f"image: '{new_url}'"

# Replace image: '...' with our new function
new_js_content = re.sub(r"image:\s*'(.*?)'", replace_image, js_content)

with open('data/modules.js', 'w', encoding='utf-8') as f:
    f.write(new_js_content)

print("Done! Replaced broken images.")
