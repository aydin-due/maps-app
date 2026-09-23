import { LatLng } from '@/infrastructure/interfaces/lat-lng'
import { useLocationStore } from '@/presentation/store/useLocationStore'
import { useEffect, useRef, useState } from 'react'
import { StyleSheet, View, ViewProps } from 'react-native'
import MapView, { Polyline, PROVIDER_GOOGLE } from 'react-native-maps'
import FloatingActionButton from '../shared/FloatingActionButton'

interface Props extends ViewProps {
    showUserLocation?: boolean
    initialLocation: LatLng

}

const CustomMap = ({ initialLocation, showUserLocation = true, ...rest }: Props) => {
    const mapRef = useRef<MapView>(null)
    const { watchLocation, stopWatchingLocation, getLocation, lastKnownLocation, userLocationList } = useLocationStore()
    const [isFollowing, setIsFollowing] = useState(true)
    const [showPath, setShowPath] = useState(true)


    useEffect(() => {
        watchLocation()
        return () => {
            stopWatchingLocation()
        }
    }, [])

    useEffect(() => {
        if (lastKnownLocation && isFollowing) {
            moveScreen(lastKnownLocation)
        }

    }, [lastKnownLocation, isFollowing])

    const moveScreen = (latlng: LatLng) => {
        if (!mapRef.current) return;
        mapRef.current.animateCamera({ center: latlng })
    }

    const moveToCurrentLocation = async () => {
        if (!lastKnownLocation) {
            moveScreen(initialLocation)
        } else {
            moveScreen(lastKnownLocation)
        }

        const location = await getLocation();
        if (!location) return
        moveScreen(location)
    }

    return (
        <View {...rest}>
            <MapView
                ref={mapRef}
                style={styles.map}
                // showsPointsOfInterests={false}
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                    latitude: initialLocation.latitude,
                    longitude: initialLocation.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                showsUserLocation={showUserLocation}
                onTouchStart={() => { setIsFollowing(false) }}
            >
                {showPath &&
                    <Polyline
                        coordinates={userLocationList}
                        strokeColor={'black'}
                        strokeWidth={5}
                    />
                }
            </MapView>
            <FloatingActionButton
                icon={showPath ? 'eye-outline' : 'eye-off-outline'}
                style={{ bottom: 140, right: 20 }}
                onPress={() => setShowPath(!showPath)}
            />
            <FloatingActionButton
                icon={isFollowing ? 'walk-outline' : 'accessibility-outline'}
                style={{ bottom: 20, right: 20 }}
                onPress={() => setIsFollowing(!isFollowing)}
            />
            <FloatingActionButton
                icon='compass-outline'
                style={{ bottom: 80, right: 20 }}
                onPress={moveToCurrentLocation}
            />
        </View>
    )
}

export default CustomMap


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    map: {
        width: '100%',
        height: '100%'
    }

})
