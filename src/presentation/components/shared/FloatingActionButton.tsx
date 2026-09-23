import { Ionicons } from '@react-native-vector-icons/ionicons'
import { ComponentProps } from 'react'
import { StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native'

interface Props {
    onPress: () => void
    style?: StyleProp<ViewStyle>
    icon: IoniconsName


}

type IoniconsName = ComponentProps<typeof Ionicons>['name']

const FloatingActionButton = ({ onPress, style, icon }: Props) => {
    return (
        <View style={[styles.btn, style]}>
            <TouchableOpacity onPress={onPress}>
                <Ionicons name={icon} color='white' size={35} />
            </TouchableOpacity>
        </View>
    )
}

export default FloatingActionButton

const styles = StyleSheet.create({
    btn: {
        zIndex: 99,
        position: 'absolute',
        height: 50,
        width: 50,
        borderRadius: 30,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        shadowOpacity: 0.3,
        shadowOffset: {
            height: 0.27,
            width: 4.5
        },
        elevation: 5
    }

})