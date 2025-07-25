import mongoose, { Types } from 'mongoose';
import dotenv from 'dotenv';


dotenv.config();

export const connectDB = async () => {
    try {
      const MONGO_URI = process.env.MONGO_URI ;
      if (!MONGO_URI) {
        throw new Error('MONGO_URI is not defined in environment variables');
      }
  
      await mongoose.connect(MONGO_URI);
      console.log('✅ MongoDB connected successfully');
    } catch (error) {
      console.error('❌ MongoDB connection error:', error);
      process.exit(1); // Exit process if connection fails
    }
  };





// Define the allowed content types
const contentTypes = ['images', 'video', 'article', 'audio'] as const;

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Tag Schema
const tagSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
});

// Link Schema
const linkSchema = new mongoose.Schema({
  hash: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true,
    unique:true
   },
});

// Content Schema
const contentSchema = new mongoose.Schema({
  link: { type: String, required: true },
  type: { type: String, enum: contentTypes, required: true },
  title: { type: String, required: true },
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

// Models
const User = mongoose.model('User', userSchema);
const Tag = mongoose.model('Tag', tagSchema);
const Link = mongoose.model('Link', linkSchema);
const Content = mongoose.model('Content', contentSchema);

// Export models
export { User, Tag, Link, Content };
