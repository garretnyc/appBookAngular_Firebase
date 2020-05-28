import { Component } from '@angular/core';
import * as firebase from "firebase/app";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'projectFirebase';
  constructor(){
            // TODO: Replace the following with your app's Firebase project configuration
            const firebaseConfig = {
              apiKey: "AIzaSyAa162uzMS9nE0dqYT796oyB9v4tESMdLk",
              authDomain: "fir-project-3d9b4.firebaseapp.com",
              databaseURL: "https://fir-project-3d9b4.firebaseio.com",
              projectId: "fir-project-3d9b4",
              storageBucket: "fir-project-3d9b4.appspot.com",
              messagingSenderId: "789005580234",
              appId: "1:789005580234:web:7655bc542c384ed3da8133",
              measurementId: "G-6W86YXLJ00"
            };
            
            // Initialize Firebase
            firebase.initializeApp(firebaseConfig);
            
              }
  
}
