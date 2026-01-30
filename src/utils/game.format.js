import generateUniqueId from "generate-unique-id";

export const generateGameKey = () => {
  const raw = generateUniqueId({
    length: 15,
    useLetters: true,
    useNumbers: true,
  });

  return raw
    .toUpperCase()
    .match(/.{1,5}/g)
    .join("-");
};
