// Replace photo paths with real headshots. isFounder gets a distinguished
// card treatment in TeamGrid (per spec: founder should stand out).

// Team member photos live in src/assets/teams-images/ — imported directly
// so Vite bundles them correctly (works with the space-free filenames here).
import vipinPhoto from "../assets/teams-images/vipinsir.png";
import mohanPhoto from "../assets/teams-images/mohan.jpg";
import rohitPhoto from "../assets/teams-images/rohitsir.jpg";
import anjuPhoto from "../assets/teams-images/anju.png";

// isFounder gets a distinguished card treatment in TeamGrid.
// Update the names/titles below to the correct ones for each person.
export const team = [
  {
    name: "Vipin (Founder)",
    title: "Founder & CEO",
    photo: vipinPhoto,
    isFounder: true,
  },
  {
    name: "Mohan Singh",
    title: "Network Support Engineer",
    photo: mohanPhoto,
    isFounder: false,
  },
  {
    name: "Rohit Kathuria",
    title: "Operations Head",
    photo: rohitPhoto,
    isFounder: false,
  },
  {
    name: "Anju Adhana",
    title: "HOD ADMIN & HR",
    photo: anjuPhoto,
    isFounder: false,
  },
];
