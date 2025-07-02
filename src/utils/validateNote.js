export const validateNote = (title, content) => {
  if (!title || !content) {
    throw new Error("Both Fields are required");
  }

  if (!title) {
    throw new Error("Title are required!");
  }

  if (!content) {
    throw new Error("Content are required!");
  }
};
