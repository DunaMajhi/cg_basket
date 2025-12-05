# Chhattisgarh Basket - Agri-Startup MVP

This is the source code for the *Chhattisgarh Basket* e-commerce platform. 
It is built using *Next.js 14, **Tailwind CSS, and a **WhatsApp Checkout* system designed for high performance and zero-cost maintenance.

## 🚀 Quick Start (How to Run)

1.  *Install Node.js*: Ensure you have Node.js (v18 or higher) installed.
2.  *Install Dependencies*:
    bash
    npm install
    
3.  *Run Development Server*:
    bash
    npm run dev
    
4.  *Open Browser*: Go to http://localhost:3000.

---

## ⚙ Configuration (MUST READ)

### 1. Changing the WhatsApp Number
To receive orders on the correct phone, you must update the phone number in the Checkout code.

* *File:* app/checkout/page.jsx
* *Line:* Look for const SELLER_PHONE = '...'
* *Action:* Replace 919876543210 with the client's WhatsApp Business number.
    * Format: Country code + Number. No spaces, no + sign.
    * Correct: 919826012345
    * Incorrect: +91 98260-12345

### 2. Updating Product Inventory (Static Mode)
Currently, the shop runs in "Static Mode" for maximum speed and zero hosting costs. To add or remove products:

* *File:* app/shop/page.jsx
* *Section:* Look for the INITIAL_PRODUCTS array.
* *How to Add a Product:* Copy an existing block and change the details.
    javascript
    {
      _id: '7', // Unique ID
      slug: 'tamarind-1kg', // unique-url-friendly-name
      name: 'Fresh Tamarind',
      price: 150,
      unit: 'kg',
      weightValue: 1,
      category: 'Forest Produce',
      stock: 50,
      images: [{ url: '/images/tamarind.jpg' }], // Matches image filename
      farmerDetails: { name: 'Sita Bai', location: 'Jagdalpur' }
    },
    

---

## 📸 Image Management

All images are stored in the public/images/ folder.

*Step-by-Step Guide to Adding Images:*
1.  Take the photo (Packaging/Product).
2.  Rename the file to something simple (e.g., black-rice.jpg instead of IMG_2024_10_01.jpg).
3.  Paste the file into the public/images/ folder in this project.
4.  Update the code in app/shop/page.jsx to match the filename:
    * images: [{ url: '/images/your-new-photo.jpg' }]

*Required Images for Setup:*
Ensure these files exist in public/images/ to prevent broken links:
* black-rice.jpg
* red-rice.jpg
* honey.jpg
* chironjee.jpg
* turmeric.jpg
* papad.jpg
* bastar-forest-bg.jpg (For the Homepage Banner)

---

## 🎨 Customization

### Changing Colors
The "Tribal/Kraft" theme is defined in tailwind.config.js.
* *Kraft Paper Color:* Change colors.kraft
* *Brand Colors:* Change colors.tribal (clay, turmeric, forest)

---

## ☁ Deployment

This project is optimized for *Vercel*.
1.  Push code to GitHub.
2.  Import project into Vercel.
3.  It will detect Next.js automatically.
4.  Click *Deploy*.