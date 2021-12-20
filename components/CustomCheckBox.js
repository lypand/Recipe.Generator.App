import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { CheckBox } from "react-native-elements";
import React, { useState } from 'react';

const CustomCheckBox = (props) => {

    const [checked, setChecked] = useState(false);

    return (
        <View>
            <CheckBox
                checked={checked}
                checkedColor="#0F0"
                containerStyle={{ width: "75%" }}
                onPress={() => {
                    setChecked(!checked)
                }}
                size={30}
                title={props.info}
                uncheckedColor="#F00"
            />
        </View>
    )
};

export default CustomCheckBox;
