import { StyleSheet, View } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'

const LoadingScreen = () => {
    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                // showsPointsOfInterests={false}
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >

                <Marker
                    coordinate={{
                        latitude: 37.7834515,
                        longitude: -122.423967
                    }}
                    title='yea'
                    description='test test test'
                />
            </MapView>
        </View>
    )
}

export default LoadingScreen

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    map: {
        width: '100%',
        height: '100%'
    }

})