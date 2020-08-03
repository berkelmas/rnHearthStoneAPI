//import liraries
import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Animated,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import {useSelector} from 'react-redux';

// create a component
const MechanicsCardsScreen = (props) => {
  const cards = useSelector((state) => state.CardReducer.cards);
  const [mechanicsCards, setMechanicsCards] = useState([]);
  const animVals = useRef({});

  useEffect(() => {
    const {mechanicsName} = props.route.params;
    const extractedData = cards.filter(
      (item) =>
        item.mechanics &&
        item.mechanics.some(({name}) => name === mechanicsName),
    );
    extractedData.forEach(
      (item) => (animVals.current[item.cardId] = new Animated.Value(0)),
    );
    setMechanicsCards(extractedData);
  }, [props, cards]);

  const handleFlip = (cardId) => {
    // useNativeDriver is false to catch up with animation value in javascript. Better could be done.
    Animated.timing(animVals.current[cardId], {
      toValue: animVals.current[cardId]._value === 0 ? 1 : 0,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  return (
    <ScrollView>
      {mechanicsCards.map((item) => (
        <TouchableWithoutFeedback
          key={item.cardId}
          onPress={() => handleFlip(item.cardId)}>
          <View style={styles.generalCardContainer}>
            <Animated.View
              style={{
                ...styles.frontSide,
                transform: [
                  {
                    rotateY: animVals.current[item.cardId].interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0deg', '180deg'],
                    }),
                  },
                ],
              }}>
              <Image
                style={{height: 465}}
                resizeMode="contain"
                defaultSource={require('../assets/images/loading-image.png')}
                source={{
                  uri: item.img
                    ? item.img
                    : 'https://www.ira-sme.net/wp-content/themes/consultix/images/no-image-found-360x260.png',
                }}
              />
            </Animated.View>

            <Animated.View
              style={{
                ...styles.backSide,
                transform: [
                  {
                    rotateY: animVals.current[item.cardId].interpolate({
                      inputRange: [0, 1],
                      outputRange: ['180deg', '0deg'],
                    }),
                  },
                ],
              }}>
              <Text>Card Id: {item.cardId}</Text>
              <Text>Name: {item.name}</Text>
              <Text>Card Set: {item.cardSet}</Text>
              <Text>Fraction: {item.faction}</Text>
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      ))}
    </ScrollView>
  );
};

// define your styles
const styles = StyleSheet.create({
  frontSide: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backfaceVisibility: 'hidden',
  },
  backSide: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backfaceVisibility: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  generalCardContainer: {
    backgroundColor: 'white',
    margin: 30,
    height: 465,
  },
});

//make this component available to the app
export default MechanicsCardsScreen;
