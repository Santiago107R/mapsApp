import React from 'react';
import { View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapScreen = () => {
    return (
        <View className='flex-1'>
            <MapView
                style={{ width: '100%', height: '100%' }}
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                <Marker
                    coordinate={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                    }}
                    title='Aqui estoy'
                    description='Esta es mi otra casa'
                />
            </MapView>
        </View>
    )
}

export default MapScreen