import mongoose from 'mongoose';
const { Schema } = mongoose;


const AmbulanceSchema = new Schema({
  vehicle_number: String,
  driver: {type: Schema.Types.ObjectId, ref: "Driver"}, // Embedded document
  status: { type: String, enum: ["active", "inactive"] },
  nurse_id: { type: Number, ref: 'Nurse' }
});

const BedSchema = new Schema({
  bed_number: Number,
  nurse_id: { type: Number, ref: 'Nurse' },
  patient_id: { type: Number, ref: 'Patient' },
  status: { type: String, enum: ["occupied", "vacant"] }
});

const RoomSchema = new Schema({
  room_number: Number,
  room_type: { type: String, enum: ["general", "private", "semi_private"] },
  bed_count: Number,
  dept_id: { type: mongoose.Types.ObjectId, ref: 'Department' },
  beds: [BedSchema] // Embedded array of beds
});

const DailyOccupancySchema = new Schema({
  date: { type: Date, required: true, unique: true }, // The specific date
  occupiedBeds: [{ type: mongoose.Types.ObjectId, ref: 'Bed' }] // List of occupied bed IDs
}, { timestamps: true }); // Automatically add createdAt and updatedAt timestamps

const Ambulance = mongoose.model('Ambulance', AmbulanceSchema);
const Room = mongoose.model('Room', RoomSchema);
const Bed = mongoose.model('Bed', BedSchema);
const DailyOccupancy = mongoose.model('DailyOccupancy', DailyOccupancySchema);
export { Ambulance, Room, Bed ,DailyOccupancy};

