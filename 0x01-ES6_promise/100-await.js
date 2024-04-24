import { uploadPhoto, createUser } from './utils';

export default async function asyncUploadUser() {
  try {
    const [photos, users] = await Promise.all([uploadPhoto(), createUser()])
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
