export const mapUserToDb = (user, hashedPassword) => {
  if (!user) return null;

  return {
    username: user.username,
    email: user.email,
    hashed_password: hashedPassword,
    profile_photo: user.profile_photo,
  };
};
