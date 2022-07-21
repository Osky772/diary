import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/backend/init';

interface PostEntry {
  html: string;
  name: string;
  createdAt: Date;
}

export {
  addPost,
};

async function addPost(post: PostEntry) {
  try {
    const docRef = await addDoc(collection(db, 'posts'), post);
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}
