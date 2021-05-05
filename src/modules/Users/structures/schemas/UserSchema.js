import { PermissionLevel, PermissionLevels, SaltRounds } from '../../util/Constants.js'
import bcrypt from 'bcrypt'
import mongoose from 'mongoose'

const user = new mongoose.Schema({
    discord_id: { type: String, required: true, unique: true },
    email: { type: String, unique: true },
    password: { type: String },
    permission: { type: String, enum: PermissionLevels, default: PermissionLevel.NORMAL }
});

user.pre('save', async function() {
    if (this.password)
        this.password = await bcrypt.hash(this.password, SaltRounds);
});
user.pre('findOneAndUpdate', async function() {
    if (this._update.password)
        this._update.password = await bcrypt.hash(this._update.password, SaltRounds);
});

export default mongoose.model('users', user);
