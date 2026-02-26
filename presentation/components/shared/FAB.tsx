import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

interface Props {
    iconName: keyof typeof Ionicons.glyphMap;
    onPress: () => void;

    className?: string;
}

const FAB = ({ onPress, className, iconName }: Props) => {
    return (
        <View className={`z-10 absolute h-[50px] w-[50px] rounded-full bg-black justify-center items-center ${className}`}>
            <TouchableOpacity
                onPress={onPress}
            >
                <Ionicons name={iconName} color={'white'} size={35} />
            </TouchableOpacity>
        </View>
    )
}

export default FAB