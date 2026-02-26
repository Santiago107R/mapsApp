import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import CustomMap from '../../presentation/components/map/CustomMap';
import { useLocationStore } from '@/presentation/store/useLocationStore';

const MapScreen = () => {

    const {lastKnownLocation, getLocation} = useLocationStore()

    useEffect(() => {
        if (lastKnownLocation === null) {
            getLocation();
        }

    }, [])

    if (lastKnownLocation === null) {
        return (
            <View className='flex-1 justify-center, items-center'>
                <ActivityIndicator />
            </View>
        )
    }

    return (
        <View className='flex-1'>
            <CustomMap
                initalLocation={lastKnownLocation}
                style={{flex: 1}}
                showUserLocation
            />
            
        </View>
    )
}

export default MapScreen