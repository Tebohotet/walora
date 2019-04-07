import firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBS6B7aq6uKEAT41ynA350vjvPYu6L8iuU',
  authDomain: 'blog-6f73f.firebaseapp.com',
  databaseURL: 'https://blog-6f73f.firebaseio.com',
  projectId: 'blog-6f73f',
  storageBucket: 'blog-6f73f.appspot.com',
  messagingSenderId: '949952095270'
};

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
const settings = {};
firestore.settings(settings);
export default firebase;
/*


<script src="https://www.gstatic.com/firebasejs/5.9.2/firebase.js"></script>
<script>
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBS6B7aq6uKEAT41ynA350vjvPYu6L8iuU",
    authDomain: "blog-6f73f.firebaseapp.com",
    databaseURL: "https://blog-6f73f.firebaseio.com",
    projectId: "blog-6f73f",
    storageBucket: "blog-6f73f.appspot.com",
    messagingSenderId: "949952095270"
  };
  firebase.initializeApp(config);
</script>*/
