import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rides: [
    {
      id: "r1",
      driverId: "u1",
      driverName: "Alice Smith",
      pickup: "North Dorm",
      destination: "Engineering Building",
      time: "09:00 AM",
      seats: 3,
      vehicle: "Toyota Corolla",
      contact: "123-456-7890",
      notes: "Leaving exactly on time.",
    },
    {
      id: "r2",
      driverId: "u2",
      driverName: "Bob Jones",
      pickup: "Library",
      destination: "South Campus",
      time: "02:00 PM",
      seats: 1,
      vehicle: "Honda Civic",
      contact: "098-765-4321",
      notes: "Happy to play music.",
    },
  ],
  bookings: [],
};

const rideSlice = createSlice({
  name: "rides",
  initialState,
  reducers: {
    addRide: (state, action) => {
      state.rides.push({ id: Date.now().toString(), ...action.payload });
    },
    bookRide: (state, action) => {
      const { rideId, userId } = action.payload;
      const ride = state.rides.find((r) => r.id === rideId);
      if (ride && ride.seats > 0) {
        ride.seats -= 1;
        state.bookings.push({ id: Date.now().toString(), rideId, userId });
      }
    },
    cancelBooking: (state, action) => {
      const { bookingId, rideId } = action.payload;
      state.bookings = state.bookings.filter((b) => b.id !== bookingId);
      const ride = state.rides.find((r) => r.id === rideId);
      if (ride) {
        ride.seats += 1;
      }
    },
  },
});

export const { addRide, bookRide, cancelBooking } = rideSlice.actions;
export default rideSlice.reducer;
