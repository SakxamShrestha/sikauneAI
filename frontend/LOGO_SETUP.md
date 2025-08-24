# 🎨 Adding Your Logo to MeroGuru Dashboard

## **Quick Setup (Recommended)**

### 1. **Place Your Logo File**
Put your logo image file in the `frontend/public/` folder:
```
frontend/public/logo.png
```

**Supported formats:** PNG, JPG, SVG, WebP
**Recommended size:** 32px height (will scale automatically)

### 2. **Update the Logo Path (if needed)**
In `frontend/src/App.js` and `frontend/src/GradeSelector.js`, the logo source is already set to:
```javascript
src="/logo.png"  // ← This is already set up!
```

### 3. **Test It!**
- Start your frontend: `npm start`
- Your logo should appear in **both places**:
  - **Top-left corner** (header) - clickable, returns to grade selector
  - **Homepage center** - beautiful circular background with hover effects

## **🎯 Where Your Logo Will Appear:**

### **1. Header Logo (Top-left)**
- **Size:** 32px height
- **Function:** Clickable, returns to grade selector
- **Style:** Clean, professional look

### **2. Homepage Logo (Center)**
- **Size:** 96px height (6rem - 50% larger than before)
- **Function:** Clean, simple display without background
- **Style:** Original logo colors with subtle hover effects

## **Advanced Options**

### **Option A: Import Logo as Component**
```javascript
import logoImage from './assets/logo.png';

// Then use:
<img src={logoImage} alt="MeroGuru Logo" className="logo-image" />
```

### **Option B: Use SVG Logo**
```javascript
// For SVG files, you can import them directly
import { ReactComponent as Logo } from './assets/logo.svg';

// Then use:
<Logo className="logo-image" />
```

### **Option C: Multiple Logo Sizes**
```javascript
<img 
  src="/logo.png"
  srcSet="/logo@2x.png 2x, /logo@3x.png 3x"
  alt="MeroGuru Logo" 
  className="logo-image"
/>
```

## **Logo Specifications**

- **Header Logo:** 32px height (2rem) - will scale automatically
- **Homepage Logo:** 48px height (3rem) - will scale automatically
- **Width:** Auto (maintains aspect ratio)
- **Format:** PNG, JPG, SVG, WebP
- **Background:** 
  - Header: Transparent or white works best
  - Homepage: Will be automatically converted to white on gradient background
- **Quality:** High resolution for crisp display

## **Current Features**

✅ **Header Logo** - Clickable, returns to grade selector  
✅ **Homepage Logo** - Beautiful circular gradient background  
✅ **Responsive** - Scales on mobile devices  
✅ **Hover Effects** - Subtle scale and shadow animations  
✅ **Fallback** - Shows Brain icon if logo fails to load  
✅ **Smooth Transitions** - Professional animations  
✅ **Automatic Styling** - White logo on gradient background  

## **Need Help?**

If your logo isn't showing up:
1. Check the file path in both `App.js` and `GradeSelector.js`
2. Ensure the file is in the `public` folder
3. Check browser console for errors
4. Try refreshing the page

## **File Locations Updated:**

- ✅ **`frontend/src/App.js`** - Header logo (top-left)
- ✅ **`frontend/src/GradeSelector.js`** - Homepage logo (center)
- ✅ **`frontend/src/index.css`** - Logo styling for both locations

**Your logo will now appear in both the header and homepage, making MeroGuru look professional and uniquely yours!** 🚀✨
