import { View, Text } from 'react-native'
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

    return <>{children}</>
}

export default PermissionCheckerProvider