import { PermissionStatus } from '@/infrastructure/interfaces/location'
import { router } from 'expo-router'
import { PropsWithChildren, useEffect } from 'react'
import { AppState } from 'react-native'
import { usePermissionStore } from '../store/usePermissions'

const PermissionsCheckerProvider = ({ children }: PropsWithChildren) => {
    const { locationStatus, checkLocationPermission } = usePermissionStore()

    useEffect(() => {
        if (locationStatus === PermissionStatus.granted) {
            router.replace('/map')
        } else if (locationStatus !== PermissionStatus.checking) {
            router.replace('/permissions')
        }
    }, [locationStatus])

    useEffect(() => {
        checkLocationPermission()
    }, [])

    useEffect(() => {
        const suscription = AppState.addEventListener('change', (nextAppState) => {
            if (nextAppState === 'active') {
                checkLocationPermission()
            }
        })

        return () => {
            suscription.remove()
        }
    }, [])

    return <>{children}</>
}

export default PermissionsCheckerProvider