export const PermissionLevel = {
    NORMAL: 'normal',
    ADMIN: 'admin',
    ROOT: 'root'
};

export const PermissionLevels = Object.freeze(['normal', 'admin', 'root']);

export const SaltRounds = 10;

export default {
    PermissionLevel,
    PermissionLevels,
    SaltRounds
};
