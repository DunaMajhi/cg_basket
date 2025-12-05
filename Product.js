import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  // SEO Friendly URL (e.g., "black-rice-bastar")
  slug: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true, 
    trim: true 
  },

  name: { 
    type: String, 
    required: [true, 'Please provide a product name'], 
    trim: true,
    maxLength: [100, 'Name cannot exceed 100 characters']
  },

  // Description is vital for SEO and explaining "Tribal Roots" value
  description: { 
    type: String, 
    required: [true, 'Please provide product description']
  },

  [span_1](start_span)// Based on your catalog: 180, 120, 150[span_1](end_span)
  price: { 
    type: Number, 
    required: [true, 'Please provide product price'],
    min: [0, 'Price cannot be negative']
  },

  [span_2](start_span)// For "Offer/Discount Templates" mentioned in the plan[span_2](end_span)
  compareAtPrice: {
    type: Number,
    default: null
  },

  [span_3](start_span)// Vital for commodities: "1kg", "250g", "500g"[span_3](end_span)
  unit: {
    type: String,
    required: true, 
    enum: ['kg', 'g', 'packet', 'liter', 'jar']
  },
  
  weightValue: {
    type: Number, 
    required: true // e.g., 1 or 250 or 500
  },

  [span_4](start_span)// Categories derived from the product list[span_4](end_span)
  category: {
    type: String,
    required: [true, 'Please select category'],
    enum: [
      'Grains',         // Black/Red Rice
      'Forest Produce', // Mahua Honey, Tamarind, Chironjee
      'Spices',         // Turmeric
      'Snacks'          // Papad
    ]
  },

  stock: { 
    type: Number, 
    required: true, 
    default: 0 
  },

  images: [
    {
      public_id: { type: String, required: true }, // Cloudinary ID
      url: { type: String, required: true }
    }
  ],

  [span_5](start_span)// CRITICAL: Matches "Farmer Story Posts" & "QR code showing farmer details"[span_5](end_span)
  farmerDetails: {
    name: { type: String, required: true }, // Who grew this?
    location: { type: String, required: true }, // e.g., "Bastar"
    story: { type: String } // Short bio for the frontend card
  },

  [span_6](start_span)// For "Product Highlight Cards"[span_6](end_span)
  isFeatured: {
    type: Boolean,
    default: false
  },

  ratings: {
    average: { type: Number, default: 0 },
    count: { type: Number, default: 0 }
  }

}, { timestamps: true });

// Prevent model overwrite in Next.js hot reloading
export default mongoose.models.Product || mongoose.model('Product', ProductSchema);