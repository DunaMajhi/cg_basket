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

  // Price in INR
  price: { 
    type: Number, 
    required: [true, 'Please provide product price'],
    min: [0, 'Price cannot be negative']
  },
  // Optional compare at price for discounts
  compareAtPrice: {
    type: Number,
    default: null
  },
  unit: {
    type: String,
    required: true, 
    enum: ['kg', 'g', 'packet', 'liter', 'jar']
  },
  
  weightValue: {
    type: Number, 
    required: true // e.g., 1 or 250 or 500
  },

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

  farmerDetails: {
    name: { type: String, required: true }, // Who grew this?
    location: { type: String, required: true }, // e.g., "Bastar"
    story: { type: String } // Short bio for the frontend card
  },
  // Highlight flag
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