import { View, Text, Pressable, PressableProps } from 'react-native'
import React from 'react'

interface Props extends PressableProps {
    children: string;
}

const ThemedPressable = ({children, ...rest}: Props) => {
    return (
        <Pressable
            className='bg-black dark:bg-white py-10 px-20 rounded-[100px] m-10'
            {...rest}
        >
            <Text className='text-white dark:text-black'>{children}</Text>
        </Pressable>
    )
}

export default ThemedPressable