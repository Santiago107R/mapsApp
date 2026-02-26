import { PermissionStatus } from '@/infrastucture/interfaces/location'
import { router, useNavigationContainerRef } from 'expo-router'
import React, { useEffect, useState, type PropsWithChildren } from 'react'
import { AppState } from 'react-native'
import { usePermissionStore } from '../store/usePermissionsStore'

const PermissionCheckerProvider = ({ children }: PropsWithChildren) => {

    const { locationStatus, checkLocationPermission } = usePermissionStore()
    const navigationRef = useNavigationContainerRef()
    const [isNavigationReady, setIsNavigationReady] = useState(false)

    useEffect(() => {
        const unsubscribe = navigationRef?.addListener('state', () => {
            setIsNavigationReady(true)
        })
        
        return unsubscribe
    }, [navigationRef])

    useEffect(() => {
        if (!isNavigationReady) return

        if (locationStatus === PermissionStatus.GRANTED) {
            router.replace('/map')
        } else if (locationStatus !== PermissionStatus.CHECKING) {
            router.replace('/permissions')
        }

    }, [locationStatus, isNavigationReady])

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