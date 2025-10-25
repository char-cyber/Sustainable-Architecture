import mongoose, { Schema, Document } from 'mongoose';

interface Building {
  purpose: string;
  floors: number;
  area: number;
  location: string;
  materials: string;
  energySource: string;
  waterSystem: string;
  additionalFeatures: string;
  analysisResult?: {
    score?: number;
    recommendations?: string;
  };
  createdAt?: Date;
}

export interface IUser extends Document {
  username: string;
  password: string;
  buildings: Building[];
}

const BuildingSchema = new Schema<Building>({
  purpose: { type: String, required: true },
  floors: { type: Number, required: true },
  area: { type: Number, required: true },
  location: { type: String, required: true },
  materials: { type: String },
  energySource: { type: String },
  waterSystem: { type: String },
  additionalFeatures: { type: String },
  analysisResult: {
    score: { type: Number },
    recommendations: { type: String },
  },
  createdAt: { type: Date, default: Date.now },
});

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  buildings: [BuildingSchema],
});

const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
