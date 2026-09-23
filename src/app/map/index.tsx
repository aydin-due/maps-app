import CustomMap from '@/presentation/components/map/CustomMap'
import { useLocationStore } from '@/presentation/store/useLocationStore'
import { useEffect } from 'react'
import { ActivityIndicator, View } from 'react-native'

const LoadingScreen = () => {
    const { lastKnownLocation, getLocation } = useLocationStore()

    useEffect(() => {
        if (lastKnownLocation === null) {
            getLocation()
        }
    }, [])

    if (lastKnownLocation === null) {
        return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator />
        </View>)
    }

    return (
        <View>
            <CustomMap
                initialLocation={lastKnownLocation}
            />
        </View>
    )
}

export default LoadingScreen
