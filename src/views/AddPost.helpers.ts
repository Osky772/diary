// @ts-nocheck
import { storage } from '@/backend/init';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

export function MyCustomUploadAdapterPlugin(editor) {
  // eslint-disable-next-line no-param-reassign
  editor.plugins.get('FileRepository').createUploadAdapter = (loader) => new MyUploadAdapter(loader);
}

export class MyUploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }

  // Starts the upload process.
  upload() {
    return this.loader.file.then(
      (file) => new Promise((resolve, reject) => {
        console.log('file', file);
        const imageRef = ref(storage, `/images/${file.name}`);
        const uploadTask = uploadBytesResumable(imageRef, file);

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress}% done`);

            if (snapshot.state === 'paused') {
              console.log('Upload is paused');
              return;
            }
            if (snapshot.state === 'running') {
              console.log('Upload is running');
            }
          },
          (error) => {
            // eslint-disable-next-line default-case
            switch (error.code) {
              case 'storage/unauthorized':
                throw Error(" User doesn't have permission to access the object");

              case 'storage/canceled':
                throw Error('User canceled the upload');

              case 'storage/unknown':
                throw Error(
                  'Unknown error occurred, inspect error.serverResponse',
                );
            }
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log('File available at', downloadURL);
              resolve({
                default: downloadURL,
              });
            });
          },
        );
      }),
    );
  }
}
