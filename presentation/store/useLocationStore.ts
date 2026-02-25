import { getCurrentLocation } from "@/core/actions/location/location";
import type { Lating } from "@/infrastucture/interfaces/lat-lng";
import type { LocationSubscription } from "expo-location";
import { create } from "zustand";
import { watchCurrentPosition } from '../../core/actions/location/location';


interface LocationState {
    lastKnownLocation: Lating | null;
    userLocationList: Lating[];
    watchSubscriptionID: LocationSubscription | null;

    getLocation: () => Promise<Lating>;
    watchLocation: () => void;
    clearWatchLocation: () => void;
}

export const useLocationStore = create<LocationState>()((set, get) => ({

    lastKnownLocation: null,
    userLocationList: [],
    watchSubscriptionID: null,

    getLocation: async () => {
        const location = await getCurrentLocation()
        set({ lastKnownLocation: location })
        return location
    },

    watchLocation: async () => {

        const oldSubscription = get().watchSubscriptionID
        if (oldSubscription !== null) {
            get().clearWatchLocation()
        }

        const watchSubscription = await watchCurrentPosition(
            (lating) => {
                set({
                    lastKnownLocation: lating,
                    userLocationList: [...get().userLocationList, lating]
                })
            })

        set({ watchSubscriptionID:  watchSubscription})
    },

    clearWatchLocation: () => { 
        const subscription = get().watchSubscriptionID

        if (subscription !== null) {
            subscription.remove()
        }

    }

}))