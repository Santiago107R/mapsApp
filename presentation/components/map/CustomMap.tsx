import type { Lating } from '@/infrastucture/interfaces/lat-lng';
import { useLocationStore } from '@/presentation/store/useLocationStore';
import React, { useEffect, useRef, useState } from 'react';
import { View, type ViewProps } from 'react-native';
import MapView, { Polyline } from 'react-native-maps';
import FAB from '../shared/FAB';

interface Props extends ViewProps {
    showUserLocation?: boolean;
    initalLocation: Lating

}

const CustomMap = ({ showUserLocation = false, initalLocation, ...rest }: Props) => {

    const mapRef = useRef<MapView>(null)
    const [isFollowingUser, setIsFollowingUser] = useState(true)
    const [isShowingPolyline, setIsShowingPolyline] = useState(false)
    const { watchLocation, clearWatchLocation, lastKnownLocation, getLocation, userLocationList } = useLocationStore()


    useEffect(() => {

        watchLocation()

        return () => {
            clearWatchLocation()
        }
    }, [])

    useEffect(() => {
        if (lastKnownLocation && isFollowingUser) {
            moveCameraToLocation(lastKnownLocation)
        }

    }, [lastKnownLocation, isFollowingUser])

    const moveCameraToLocation = (lating: Lating) => {
        if (!mapRef.current) return

        mapRef.current.animateCamera({
            center: lating,
        })

    }

    const moveToCurrentLocation = async () => {
        if (!lastKnownLocation) {
            moveCameraToLocation(initalLocation)
        } else {
            moveCameraToLocation(lastKnownLocation)
            // setIsFollowingUser(true)

        }

        const locaiton = await getLocation();
        if (!locaiton) return

        moveCameraToLocation(locaiton)


    }

    return (
        <View
            {...rest}
        >
            <MapView
                ref={mapRef}
                onTouchStart={() => setIsFollowingUser(false)}
                style={{ width: '100%', height: '100%' }}
                showsUserLocation={showUserLocation}
                initialRegion={{
                    latitude: initalLocation.latitude,
                    longitude: initalLocation.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                {
                    isShowingPolyline && (
                        <Polyline
                            coordinates={userLocationList}
                            strokeColor='black'
                            strokeWidth={5}

                        />
                    )
                }


            </MapView>

            <FAB
                iconName={isShowingPolyline ? 'eye-outline' : 'eye-off'}
                onPress={() => setIsShowingPolyline(!isShowingPolyline)}
                className='bottom-[140] right-10'
            />

            <FAB
                iconName={isFollowingUser ? 'walk-outline' : 'accessibility-outline'}
                onPress={() => setIsFollowingUser(!isFollowingUser)}
                className='bottom-[80] right-10'
            />

            <FAB
                iconName='compass-outline'
                onPress={moveToCurrentLocation}
                className='bottom-[20] right-10'
            />
        </View>
    )
}

export default CustomMap