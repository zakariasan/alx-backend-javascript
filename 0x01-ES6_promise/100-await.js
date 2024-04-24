import { uploadPhoto, createUser } from './utils';

export default async function asyncUploadUser() {
  let every = {};
  try {
    const photos = await uploadPhoto();
    const users = await createUser();
    every =  { photos, users };
  } catch (err) {
    every =  { photo: null, user: null };
  }
  return every;
}
