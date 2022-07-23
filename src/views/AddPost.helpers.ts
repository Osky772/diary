// @ts-nocheck
import { storage } from '@/backend/init';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import imageCompression from 'browser-image-compression';

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
      (file) => new Promise((resolve) => {
        const imageRef = ref(storage, `/images/${file.name}`);

        handleImageCompress(file).then((compressedFile) => {
          const uploadTask = uploadBytesResumable(imageRef, compressedFile);
          const el = document.createElement('div');
          el.classList.add('zo-progress-bar');
          document.body.appendChild(el);

          uploadTask.on(
            'state_changed',
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              el.style.width = `${progress}%`;

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
                  window.alert('User doesn\'t have permission to access the object');
                  throw Error(" User doesn't have permission to access the object");

                case 'storage/canceled':
                  window.alert('User canceled the upload');
                  throw Error('User canceled the upload');

                case 'storage/unknown':
                  window.alert('Unknown error occurred, inspect error.serverResponse');
                  throw Error(
                    'Unknown error occurred, inspect error.serverResponse',
                  );
              }
              el.remove();
            },
            () => {
              el.remove();
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log('File available at', downloadURL);
                resolve({
                  default: downloadURL,
                });
              });
            },
          );
        });
      }),
    );
  }
}

async function handleImageCompress(file) {
  console.log('originalFile instanceof Blob', file instanceof Blob); // true
  console.log(`originalFile size ${file.size / 1024 / 1024} MB`);

  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };
  try {
    const compressedFile = await imageCompression(file, options);
    console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
    console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB

    return compressedFile;
  } catch (error) {
    window.alert('Error occurred while compressing the image', error);
    console.log(error);
    return file;
  }
}
