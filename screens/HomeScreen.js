//import liraries
import React, {useEffect, useLayoutEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Card, ActivityIndicator, Button} from 'react-native-paper';
import {getAllCards} from '../services/card-service';
import {
  getAllCardsAction,
  getAllMechanicsAction,
  startCardsLoading,
  failedCardsLoading,
} from '../store/actions/card-actions';

// create a component
const HomeScreen = (props) => {
  const dispatch = useDispatch();
  const cardsLoading = useSelector((state) => state.CardReducer.cardsLoading);
  // const cards = useSelector((state) => state.CardReducer.cards);
  const mechanics = useSelector((state) => state.CardReducer.mechanics);

  useEffect(() => {
    dispatch(startCardsLoading());
    getAllCards()
      .then((res) => {
        const mechanicsMap = {};
        const loadedCards = Object.values(res.data)
          .map((cardList) => {
            cardList
              .filter((item) => item.mechanics)
              .forEach((item) => {
                item.mechanics.forEach(({name}) => (mechanicsMap[name] = true));
              });
            return cardList;
          })
          .flat();
        dispatch(getAllCardsAction(loadedCards));
        dispatch(getAllMechanicsAction(Object.keys(mechanicsMap)));
      })
      .catch((e) => dispatch(failedCardsLoading()));
  }, [dispatch]);

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => props.navigation.navigate('Search')}>
          Search
        </Button>
      ),
    });
  }, [props.navigation]);

  return (
    <ScrollView style={styles.container}>
      {cardsLoading && (
        <View style={{marginTop: 50}}>
          <ActivityIndicator size="large" color="#00a0f0" />
        </View>
      )}
      {mechanics.map((item) => (
        <TouchableOpacity
          key={item}
          onPress={() =>
            props.navigation.navigate('MechanicsCards', {mechanicsName: item})
          }>
          <Card style={{padding: 10, margin: 10}}>
            <Text>{item}</Text>
          </Card>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

//make this component available to the app
export default HomeScreen;
