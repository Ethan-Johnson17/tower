import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

export const AttendeeSchema = new Schema({
  eventId: { type: ObjectId, required: true },
  accountId: { type: ObjectId, required: true }
})
