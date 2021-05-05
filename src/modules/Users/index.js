import BaseModule from './structures/BaseModule.js'
import Constants from './util/Constants.js'
import UserModel from './structures/models/UserModel.js'

export default class Users extends BaseModule {
    constructor(main) {
        super(main);

        this.register(Users, {
            disabled: true,

            name: 'users',
            requires: [ 'mongo' ]
        });
    }

    get constants() {
        return Constants;
    }

    /**
     * Create a new user
     * @param {Object} user
     */
    createUser(user) {
        return UserModel.createUser(user);
    }

    /**
     * The user to permanently delete from the system
     * @param {Object} user
     */
    deleteUser(user) {
        return UserModel.deleteUser(user);
    }

    /**
     * Get a user's object based on a query string
     * @param {Object} q Search query for the user object
     * @param {boolean} [password = false] If the password of the user should be included in the user object.
     * @returns {Promise<UserSchema>}
     */
    getUser(q, password = false) {
        return UserModel.getUser(q, password);
    }

    getUsers(q, password = false) {
        return UserModel.getUsers(q, password);
    }

    /**
     *
     * @param {Object} user
     * @param {Object} update
     * @returns {Promise<UserSchema>}
     */
    updateUser(user, update) {
        return UserModel.updateUser(user, update);
    }
}
