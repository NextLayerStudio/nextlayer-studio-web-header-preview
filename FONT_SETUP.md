# Aero Font Setup Instructions

The Aero font configuration has been set up in your Next.js project. You need to download the font files and place them in the correct directory.

## Steps to Complete Font Setup

### 1. Download the Aero Font

You can download the Aero font from one of these sources:
- **DaFont**: https://www.dafont.com/aero.font (Free for personal use)
- **Deefont**: https://www.deefont.com/aero-font/ (Free for personal use)

**Note**: If you're looking for "At Aero" (premium font by Arillatype), visit: https://arillatype.studio/font/at-aero

### 2. Place Font Files

After downloading, extract the font files and place them in:
```
public/fonts/Aero/
```

You'll need these files (in WOFF2 format preferred, or TTF/OTF):
- `Aero-Regular.woff2` (or `Aero-Regular.ttf`)
- `Aero-Bold.woff2` (or `Aero-Bold.ttf`)
- `Aero-RegularItalic.woff2` (optional)
- `Aero-BoldItalic.woff2` (optional)

### 3. Convert TTF/OTF to WOFF2 (if needed)

If you only have TTF or OTF files, you can convert them to WOFF2 using online tools like:
- https://cloudconvert.com/ttf-to-woff2
- https://convertio.co/ttf-woff2/

Or use command-line tools:
```bash
# Using fonttools (install with: pip install fonttools[woff])
pyftsubset Aero-Regular.ttf --output-file=Aero-Regular.woff2 --flavor=woff2
```

### 4. Verify Setup

Once the font files are in place, restart your development server:
```bash
npm run dev
```

The Aero font should now be used throughout your entire website!

## Current Configuration

- **Font file**: `app/fonts.ts` - Defines the Aero font using Next.js `localFont`
- **Layout**: `app/layout.tsx` - Applies the font globally
- **Tailwind**: `tailwind.config.ts` - Sets Aero as the default sans-serif font
- **Global CSS**: `app/globals.css` - Ensures all elements use the Aero font

All text on your website will now use the Aero font exclusively!
