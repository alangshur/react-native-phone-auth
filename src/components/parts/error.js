import React, { PureComponent } from 'react';
import { Text, StyleSheet, Animated } from 'react-native';

export class ErrorBanner extends PureComponent {
    constructor(props) {
        super(props);
        this.state = { 
            bounceValue: new Animated.Value(0),
            hidden: true
        };
    }

    toggleAnimation = toValue => {
        Animated.timing(
            this.state.bounceValue,
            {
                toValue: toValue,
                timing: 700,
                useNativeDriver: true
            }
        ).start();
    }

    toggle = () => {
        if (!this.state.hidden) return;
        this.setState({ hidden: false });
        this.toggleAnimation(100);
        setTimeout(() => { 
            this.toggleAnimation(0); 
            this.setState({ hidden: true });
        }, 6000);
    }

    render = () => {
        return (
            <Animated.View 
                style={[
                    styles.errorBanner, 
                    {transform: [{ 
                        translateY: this.state.bounceValue 
                    }]}
                ]}
            >
                <Text style={styles.errorText}>{this.props.text}</Text>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    errorBanner: {
        position: 'absolute',
        zIndex: 1,
        top: -100,
        height: 100,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#cc0000'
    },
    errorText: {
        color: 'white',
        fontSize: 16,
        top: 23,
        marginLeft: 30,
        marginRight: 30,
        textAlign: 'center',
        fontWeight: 'bold'
    }
});
