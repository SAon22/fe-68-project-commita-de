import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ReservationItem } from "../../../interface"

type ReserveState = {
    reserveItems: ReservationItem[]
}

const initialState: ReserveState = { reserveItems: [] }

export const reserveSlice = createSlice({
    name: "reserve",
    initialState,
    reducers: {

        addReservation: (state, action: PayloadAction<ReservationItem>) => {

            const index = state.reserveItems.findIndex(item =>
                item.shopName === action.payload.shopName &&
                item.date === action.payload.date
            );

            if (index !== -1) {
                state.reserveItems[index] = action.payload;
            } else {
                state.reserveItems.push(action.payload);
            }
        },

        removeReservation: (state, action: PayloadAction<ReservationItem>) => {
            state.reserveItems = state.reserveItems.filter(item =>
                !(
                    item.shopName === action.payload.shopName &&
                    item.date === action.payload.date
                )
            );
        }

    }
})

export const { addReservation, removeReservation } = reserveSlice.actions
export default reserveSlice.reducer