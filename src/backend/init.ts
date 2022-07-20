// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const prodConfig = {
  apiKey: 'AIzaSyAO4CN9aOUaASb2X3s9e0EeUMludXWu6P8',
  authDomain: 'diary-1caec.firebaseapp.com',
  projectId: 'diary-1caec',
  storageBucket: 'diary-1caec.appspot.com',
  messagingSenderId: '869701955475',
  appId: '1:869701955475:web:39c80b9c7f89e42d74c266',
};

const devConfig = {
  apiKey: 'AIzaSyBO7D_aINPwYKu3EiS4QZVMbSf8OZQjuI4',
  authDomain: 'diary-local.firebaseapp.com',
  projectId: 'diary-local',
  storageBucket: 'diary-local.appspot.com',
  messagingSenderId: '975372528904',
  appId: '1:975372528904:web:698fd2059dd0b839aed0bd',
};

const firebaseConfig = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;
console.log('process.env.NODE_ENV', process.env.NODE_ENV);
console.log('firebaseConfig', firebaseConfig);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
