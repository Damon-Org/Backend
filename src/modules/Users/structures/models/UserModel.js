import UserSchema from '../schemas/UserSchema.js';

/**
 * 
 * @param {Object} user 
 * @returns {UserSchema}
 */
export const createUser = (user) => {
    return new UserSchema(user).save();
};

/**
 * @param {Object} user 
 * @returns {UserSchema}
 */
export const deleteUser = (user) => {
    return UserSchema.findOneAndDelete(user).exec();
};

/**
 * Find a user based on a user object
 * @param {Object} q 
 * @param {boolean} getPassword If a password should be returned when fetching the user.
 * @returns {UserSchema}
 */
export const getUser = (q, getPassword) => {
    return UserSchema
        .findOne(q)
        .select(getPassword ? {} : { password: 0 })
        .exec();
};

/**
 * 
 * @param {Object} q query
 * @param {boolean} getPassword If the password should be returned for these users
 * @returns {Array<UserSchema>}
 */
export const getUsers = (q, getPassword) => {
    return UserSchema
        .find(q)
        .select(getPassword ? {} : { password: 0 })
        .exec();
};

/**
 * 
 * @param {Object} q Search query
 * @param {Object} update Updated object
 * @returns 
 */
export const updateUser = (q, update) => {
    return UserSchema.findOneAndUpdate(q, update, { new: true }).exec();
};

export default {
    createUser,
    deleteUser,
    getUser,
    getUsers,
    updateUser
};