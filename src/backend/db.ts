import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '@/backend/init';

interface PostEntry {
  html: string;
  name: string;
  createdAt: Date;
}

export {
  addPost,
  getPosts,
};

async function addPost(post: PostEntry) {
  try {
    const docRef = await addDoc(collection(db, 'posts'), post);
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}

async function getPosts() {
  try {
    const querySnapshot = await getDocs(collection(db, 'posts'));
    return querySnapshot.docs.map((doc) => doc.data() as PostEntry);
  } catch (e) {
    console.error('Error getting documents: ', e);
    return null;
  }
}
