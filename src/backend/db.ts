import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '@/backend/init';

interface PostEntry extends PostEntryCreateNew {
  id: string;
}

interface PostEntryCreateNew {
  html: string;
  name: string;
  createdAt: Date;
}

export {
  addPost,
  getPosts,
};

async function addPost(post: PostEntryCreateNew) {
  try {
    const docRef = await addDoc(collection(db, 'posts'), post);
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}

async function getPosts(): Promise<PostEntry[] | null> {
  try {
    const querySnapshot = await getDocs(collection(db, 'posts'));
    return querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }) as PostEntry);
  } catch (e) {
    console.error('Error getting documents: ', e);
    return null;
  }
}
