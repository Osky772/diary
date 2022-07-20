import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { app } from './init';

const auth = getAuth(app);

// TODO add user
// createUserWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     const { user } = userCredential;
//     // ...
//     console.log('user', user);
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     console.log('error', error);
//     // ..
//   });
