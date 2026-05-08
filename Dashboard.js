import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = "login.html";
    }
});
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_DOMAIN",
  projectId: "YOUR_PROJECT_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function loadBookings() {
    const querySnapshot = await getDocs(collection(db, "bookings"));
    const table = document.querySelector("#bookingTable tbody");

    let count = 0;

    querySnapshot.forEach((doc) => {
        const data = doc.data();
        count++;

        const row = `
            <tr>
                <td>${data.name}</td>
                <td>${data.date}</td>
                <td>${data.time}</td>
                <td>${data.service}</td>
            </tr>
        `;

        table.innerHTML += row;
    });

    document.getElementById("totalBookings").innerText = count;
}

loadBookings();