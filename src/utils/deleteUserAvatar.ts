import { GridFSBucket, ObjectId } from 'mongodb';
import { getDB } from './api-routes';

export async function deleteUserAvatarFromGridFS(userId: string) {
  try {
    const db = await getDB();
    const bucket = new GridFSBucket(db, { bucketName: 'avatars' });
    const userIdObjectId = new ObjectId(userId);

    const avatarFile = await db.collection('avatars.files').findOne({
      'metadata.userId': userIdObjectId,
    });

    if (avatarFile) {
      await bucket.delete(avatarFile._id);
      console.log(
        `Аватар пользователя ${userId} удален после удаления аккаунта`
      );
    } else
      console.error(
        'Ошибка при удалении аватара. Не удалось найти аватар.'
      );
  } catch (error) {
    console.error('Ошибка при удалении аватара:', error);
  }
}
