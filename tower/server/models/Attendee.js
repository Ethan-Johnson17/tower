import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

export const AttendeeSchema = new Schema({
  eventId: { type: ObjectId, required: true },
  accountId: { type: ObjectId, required: true },
  creatorName: { type: String, ref: 'Profile' }
  // account: { type: Object, ref: 'Account', required: true }
}, { timestamps: true, toJSON: { virtuals: true } })

AttendeeSchema.index({ creatorId: 1, eventId: 1 }, { unique: true })

AttendeeSchema.virtual('account', {
  localField: 'accountId',
  ref: 'Profile',
  foreignField: '_id',
  justOne: true
})

AttendeeSchema.virtual('user', {
  localField: 'creatorName',
  ref: 'Profile',
  foreignField: 'name',
  justOne: true
})

AttendeeSchema.virtual('event', {
  localField: 'eventId',
  ref: 'Event',
  foreignField: '_id',
  justOne: true
})
