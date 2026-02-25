import { ThemedText } from '@/presentation/components/shared/themed-text'
import ThemedPressable from '@/presentation/components/shared/ThemedPressable'
import { usePermissionStore } from '@/presentation/store/usePermissionsStore'
import React from 'react'
import { View } from 'react-native'

const PermissionScreen = () => {

    const { locationStatus, requestLocationPermission } = usePermissionStore()

    return (
        <View className='flex-1 justify-center items-center'>

            <ThemedPressable
                onPress={requestLocationPermission}
            >
                Habilitar ubicación
            </ThemedPressable>

            <ThemedText>Estado actual: {locationStatus}</ThemedText>
        </View>
    )
}

export default PermissionScreen