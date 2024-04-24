import { uploadPhoto, createUser } from './utils';

export default async function asyncUploadUser() {
  let every = {};

  try {
    const photo = await uploadPhoto();
    const user = await createUser();
    every = { photo, user };
  } catch (err) {
    every = { photo: null, user: null };
  }
  return every;
}
