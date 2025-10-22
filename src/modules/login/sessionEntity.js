//sessionEntity.js
const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
    index: true
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },

  userType: {
    type: String,
    enum: ['admin', 'client'],
    required: true
  },

  ip: {
    type: String
  },

  userAgent: {
    type: String
  },

  expiresAt: {
    type: Date,
    required: true,
    index: true
  },

  active: {
    type: Boolean,
    default: true,
    index: true
  }
}, {
  timestamps: true,
  versionKey: false
});

SessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

SessionSchema.index({ userId: 1, active: 1 });
SessionSchema.index({ token: 1, active: 1 });

module.exports = mongoose.model('Session', SessionSchema);