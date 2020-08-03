//import liraries
import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Animated,
  Image,
  ScrollView,
} from 'react-native';
import {TextInput, ActivityIndicator} from 'react-native-paper';
import {useDebounce} from '../hooks/useDebounce';
import {searchCards} from '../services/card-service';

// create a component
const SearchScreen = () => {
  const [searchLoading, setSearchLoading] = useState(false);
  const [noDataFound, setNoDataFound] = useState(false);
  const [searchText, setSearchText] = useState(null);
  const [cards, setCards] = useState([]);
  const debouncedSearchTerm = useDebounce(searchText, 500);
  const animVals = useRef({});

  const handleFlip = (cardId) => {
    // useNativeDriver is false to catch up with animation value in javascript. Better could be done.
    Animated.timing(animVals.current[cardId], {
      toValue: animVals.current[cardId]._value === 0 ? 1 : 0,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      setSearchLoading(true);
      setCards([]);
      searchCards(debouncedSearchTerm)
        .then((res) => {
          // delete animVals.current;
          setNoDataFound(false);
          setCards(res.data);
          res.data.forEach(
            (item) => (animVals.current[item.cardId] = new Animated.Value(0)),
          );
          console.log(animVals.current);
        })
        .catch((err) => setNoDataFound(true))
        .finally((_) => setSearchLoading(false));
    }
  }, [debouncedSearchTerm]);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView style={styles.container}>
        <TextInput
          label="Search.."
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
        {searchLoading && (
          <View style={{marginTop: 50}}>
            <ActivityIndicator size="large" color="#00a0f0" />
          </View>
        )}
        {noDataFound && (
          <View style={{marginTop: 50}}>
            <Text>No Data Found...</Text>
          </View>
        )}
        {cards.map((item) => (
          <TouchableWithoutFeedback
            key={item.cardId}
            onPress={() => handleFlip(item.cardId)}>
            <View style={styles.generalCardContainer}>
              <Animated.View
                style={{
                  ...styles.frontSide,
                  transform: [
                    {
                      rotateY: animVals.current[item.cardId]
                        ? animVals.current[item.cardId].interpolate({
                            inputRange: [0, 1],
                            outputRange: ['0deg', '180deg'],
                          })
                        : '0deg',
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
                      rotateY: animVals.current[item.cardId]
                        ? animVals.current[item.cardId].interpolate({
                            inputRange: [0, 1],
                            outputRange: ['180deg', '0deg'],
                          })
                        : '0deg',
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
    </TouchableWithoutFeedback>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
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
export default SearchScreen;
