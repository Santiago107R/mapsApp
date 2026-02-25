
import * as Location from 'expo-location'
import type { Lating } from '../../../infrastucture/interfaces/lat-lng'

export const getCurrentLocation = async (): Promise<Lating> => {

    try {
        const { coords } = await Location.getCurrentPositionAsync({
            // configurar segun necesidades de app 
            accuracy: Location.Accuracy.Highest
        })

        return {
            latitude: coords.latitude,
            longitude: coords.longitude,
        }

    } catch (error) {
        throw new Error('Error getting users location')
    }

}

export const watchCurrentPosition = (locationCallback: (location: Lating) => void) => {


    return Location.watchPositionAsync({
        accuracy: Location.Accuracy.Highest,
        timeInterval: 1000,
        distanceInterval: 10,
    },
        ({ coords }) => {
            locationCallback({
                latitude: coords.latitude,
                longitude: coords.longitude,
            })
        })
}