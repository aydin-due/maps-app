import { PermissionStatus } from '@/infrastructure/interfaces/location';
import * as Location from 'expo-location';
import { Alert, Linking } from 'react-native';

export const requestLocationPermisison = async (): Promise<PermissionStatus> => {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
        if (status === 'denied') {
            manualPermissionRequest()
        }
        manualPermissionRequest();
        return PermissionStatus.denied
    }

    return PermissionStatus.granted
}

export const checkLocationPermisison = async () => {
    const { status } = await Location.getForegroundPermissionsAsync();
    switch (status) {
        case 'granted':
            return PermissionStatus.granted
        case 'denied':
            return PermissionStatus.denied
        default:
            return PermissionStatus.undetermined

    }
}

export const manualPermissionRequest = async () => {
    Alert.alert(
        'location permission required',
        'enable location permission on settings to continue',
        [{
            text: 'open settings', onPress: () => {
                Linking.openSettings()
            },
        },
        {
            text: 'cancel',
            style: 'destructive'
        }
        ])
}