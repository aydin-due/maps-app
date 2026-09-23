import { getCurrentLocation, watchCurrentPosition } from "@/core/actions/location/location";
import { LatLng } from "@/infrastructure/interfaces/lat-lng";
import { LocationSubscription } from "expo-location";
import { create } from "zustand";

interface LocationState {
    lastKnownLocation: LatLng | null
    userLocationList: LatLng[]
    watchSuscription: LocationSubscription | null

    getLocation: () => Promise<LatLng>
    watchLocation: () => void
    stopWatchingLocation: () => void
}

export const useLocationStore = create<LocationState>()((set, get) => ({
    lastKnownLocation: null,
    userLocationList: [],
    watchSuscription: null,
    getLocation: async () => {
        const location = await getCurrentLocation()
        set({ lastKnownLocation: location })
        return location
    },
    watchLocation: async () => {
        const oldSuscription = get().watchSuscription
        if (oldSuscription !== null) {
            get().stopWatchingLocation()
        }
        const watchSuscription = await watchCurrentPosition((latLng) => {
            set({ lastKnownLocation: latLng, userLocationList: [...get().userLocationList, latLng] })
        })
        set({ watchSuscription: watchSuscription })
    },
    stopWatchingLocation: async () => {
        const suscription = get().watchSuscription;
        if (suscription !== null) {
            suscription.remove()
        }
    }
}))