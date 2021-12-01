import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';


const Header = props => {
    return (
        <View style={styles.header}>
            <View style={styles.buttonContainer}>
                <Button title="LOGOUT" onPress={props.logout} />
            </View>
            <Text style={styles.headerTitle}>{props.title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 90,
        paddingTop: 20,
        backgroundColor: '#f7287b',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        alignItems: 'flex-end',
        width: '100%',
        //backgroundColor: 'blue'
    },
    headerTitle: {
        color: 'black',
        fontSize: 24,
        justifyContent: 'center'
    }
});
export default Header;
