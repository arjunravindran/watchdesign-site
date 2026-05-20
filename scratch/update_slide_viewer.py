import re

with open('components/slides/SlideViewer.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Add SlideImage component
slide_image_component = '''
function SlideImage({ s, className = "mt-4 mb-4" }) {
  if (!s.image) return null
  return (
    <div className={${className} rounded-sm overflow-hidden border border-rule}>
      <img src={s.image} alt={s.heading || s.title || 'Slide image'} className="w-full h-auto max-h-64 object-cover" />
    </div>
  )
}
'''

if 'function SlideImage' not in content:
    content = content.replace('function Heading({ text }) {', slide_image_component + '\nfunction Heading({ text }) {')

# Add <SlideImage s={s} /> after <Heading text={s.heading} />
# We need to use regex because heading might be indented
content = re.sub(r'(<Heading text=\{s\.heading\} />)', r'\1\n      <SlideImage s={s} />', content)

# SlideHero
content = re.sub(r'(<h1[^>]*>[\s\S]*?</h1>)', r'\1\n      <SlideImage s={s} className="mt-5 mb-5" />', content)

# SlideEndcard
content = re.sub(r'(<div className="font-serif text-2xl text-mist italic">\{s\.heading \|\| s\.title\}</div>)', r'\1\n      <SlideImage s={s} className="mt-5 mb-5" />', content)

# Remove the old image rendering block from SlideContent
old_image_block = r'''      \{s\.image && \(\s*<div className="mt-4 mb-4 rounded-sm overflow-hidden border border-rule">\s*<img src=\{s\.image\} alt=\{s\.heading \|\| 'Slide image'\} className="w-full h-auto object-cover" />\s*</div>\s*\)\}'''
content = re.sub(old_image_block, '', content)

# Fix duplicate SlideImage in SlideContent (since it has a Heading)
# Actually, the regex above added <SlideImage s={s} /> right after Heading, which is exactly what we want.

with open('components/slides/SlideViewer.js', 'w', encoding='utf-8') as f:
    f.write(content)
