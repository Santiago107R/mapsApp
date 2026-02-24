import { View, Text, AppState } from 'react-native'
import React, { useEffect, type PropsWithChildren } from 'react'
import { usePermissionStore } from '../store/usePermissions'
import { PermissionStatus } from '@/infrastucture/interfaces/location'
import { router } from 'expo-router'

const PermissionCheckerProvider = ({children}: PropsWithChildren) => {
    
    const {locationStatus, checkLocationPermission} = usePermissionStore()
    
    useEffect(() => {

        if (locationStatus === PermissionStatus.GRANTED) {
            router.replace('/map')
        } else if (locationStatus !== PermissionStatus.CHECKING) {
            router.replace('/permissions')
        }

    }, [locationStatus])

    useEffect(() => {
        checkLocationPermission()
    }, [])

    // TODO: estar pendiente cuando el estado de la aplicacion cambia

    useEffect(() => {
        
        const subscription = AppState.addEventListener('change', (nextAppState) => {
            if (nextAppState === 'active') {
                checkLocationPermission()
            }

            

        })

        return () => {
            subscription.remove()
        }
    }, [])

    return <>{children}</>
}

export default PermissionCheckerProvider