import { Component, OnInit } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebase.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = '2D Champion';

  ngOnInit(): void {
    // Initialize Firebase
    initializeApp(firebaseConfig);

    // Check if geolocation is supported
    if ("geolocation" in navigator) {
      // Request location
      navigator.geolocation.getCurrentPosition((position) => {
        // Get latitude and longitude
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        // Send data to Firebase or your backend service
        // Example: Firebase Realtime Database
        const firebaseDB = getDatabase();
        const locationRef = ref(firebaseDB, 'userLocations');
        push(locationRef, {
          latitude: latitude,
          longitude: longitude
        })
        .then(() => {
          console.log('Location data sent to Firebase');
        })
        .catch((error) => {
          console.error('Error sending location data to Firebase:', error);
        });
      }, (error) => {
        console.error('Error getting user location:', error);
      });
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }
}
