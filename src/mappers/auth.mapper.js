export const mapUserToDb = (user, hashedPassword) => {
  return {
    username: user.username,
    email: user.email,
    hashed_password: hashedPassword,
    profile_photo: user.profile_photo,
  };
};

export const mapUserToRep = (userDb) => {
  return {
    id: userDb.id,
    username: userDb.username,
    email: userDb.email,
    profile_photo: userDb.profile_photo,
  };
};
