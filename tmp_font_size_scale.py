from pathlib import Path
import re
root = Path('app/dashboard/clients')
files = list(root.rglob('*.tsx')) + list(root.rglob('*.css'))
for path in files:
    text = path.read_text(encoding='utf-8')
    orig = text
    if path.suffix == '.tsx':
        replacements = [
            (r'\btext-5xl\b', 'text-6xl'),
            (r'\btext-4xl\b', 'text-5xl'),
            (r'\btext-3xl\b', 'text-4xl'),
            (r'\btext-2xl\b', 'text-3xl'),
            (r'\btext-xl\b', 'text-2xl'),
            (r'\btext-lg\b', 'text-xl'),
            (r'\btext-base\b', 'text-lg'),
            (r'\btext-sm\b', 'text-base'),
            (r'\btext-xs\b', 'text-sm'),
        ]
        for pattern, replacement in replacements:
            text = re.sub(pattern, replacement, text)
    elif path.suffix == '.css':
        replacements = [
            (r'font-size:\s*20px;', 'font-size: 25px;'),
            (r'font-size:\s*14px;', 'font-size: 17.5px;'),
            (r'font-size:\s*13px;', 'font-size: 16.25px;'),
        ]
        for pattern, replacement in replacements:
            text = re.sub(pattern, replacement, text)
    if text != orig:
        path.write_text(text, encoding='utf-8')
        print(f'Updated {path}')
