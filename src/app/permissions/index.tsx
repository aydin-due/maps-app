import { requestLocationPermisison } from '@/core/actions/permissions/location'
import ThemedPressable from '@/presentation/components/shared/themed-pressable'
import { ThemedText } from '@/presentation/components/shared/themed-text'
import { usePermissionStore } from '@/presentation/store/usePermissionsStore'
import { View } from 'react-native'

const PermissionsScreen = () => {
    const { locationStatus } = usePermissionStore()
    return (
        <View style={{
            flex: 1, justifyContent: 'center', alignItems: 'center'
        }}>
            <ThemedText>current state: {locationStatus}</ThemedText>
            <ThemedPressable onPress={requestLocationPermisison}>enable location</ThemedPressable>
        </View>
    )
}

export default PermissionsScreen