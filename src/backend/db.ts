import {
  collection, addDoc, getDocs, getDoc, doc as firestoreDoc, deleteDoc, query, orderBy,
} from 'firebase/firestore';
import { db } from '@/backend/init';

export interface PostEntry extends PostEntryCreateNew {
  id: string;
}

interface PostEntryCreateNew {
  html: string;
  name: string;
  createdAt: string;
}

export {
  addPost,
  getPosts,
  getSinglePost,
  deleteSinglePost,
};

async function addPost(post: PostEntryCreateNew): Promise<PostEntry | null> {
  try {
    const docRef = await addDoc(collection(db, 'posts'), post);
    return {
      ...post,
      id: docRef.id,
    };
  } catch (e: any) {
    throw Error(e);
  }
}

async function getPosts(): Promise<PostEntry[] | null> {
  const postsRef = collection(db, 'posts');

  try {
    const q = query(postsRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }) as PostEntry);
  } catch (e: any) {
    throw Error(e);
  }
}

async function getSinglePost(id: string): Promise<PostEntry | null> {
  try {
    const docRef = await getDoc(firestoreDoc(db, 'posts', id));
    return {
      ...docRef.data(),
      id: docRef.id,
    } as PostEntry;
  } catch (e: any) {
    throw Error(e);
  }
}

async function deleteSinglePost(id: string) {
  try {
    await deleteDoc(firestoreDoc(db, 'posts', id));
  } catch (e: any) {
    throw Error(e);
  }
}
