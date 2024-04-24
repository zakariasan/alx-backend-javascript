import { uploadPhoto, createUser } from './utils';

export default async function asyncUploadUser() {
  try {
    const photos = await uploadPhoto();
    const users = await createUser();
    return {
      photo: photos,
      user: users
    };
  } catch (err) {
    return {
      photo: null,
      user: null
    };
  }
}
