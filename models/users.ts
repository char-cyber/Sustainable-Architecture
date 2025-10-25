import mongoose, { Schema, Document } from 'mongoose';

interface Building {
  name: string;
  sustainabilityScore: number;
  sustainabilitySummary: string;
  recommendations: {
    'Energy Efficiency': string[];
    'Water Conservation': string[];
    'Sustainable Materials': string[];
    'Site & Waste Management': string[];
  };
}

export interface IUser extends Document {
  username: string;
  password: string;
  buildings: Building[];
}

const BuildingSchema: Schema = new Schema({
  name: { type: String, required: true },
  sustainabilityScore: { type: Number, required: true },
  sustainabilitySummary: { type: String, required: true },
  recommendations: {
    'Energy Efficiency': [{ type: String }],
    'Water Conservation': [{ type: String }],
    'Sustainable Materials': [{ type: String }],
    'Site & Waste Management': [{ type: String }],
  }
});

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  buildings: [BuildingSchema]
});

export default mongoose.model<IUser>('User', UserSchema);
