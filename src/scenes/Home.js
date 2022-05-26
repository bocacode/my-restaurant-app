import { useEffect, useState, useContext } from 'react';
import { ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { SingleRestContext } from '../../App';
import RestaurantCard from '../components/RestaurantCard';

export default function Home({ navigation }) {
  const [allRestaurants, setAllRestaurants] = useState();
  const { setCurrentRest } = useContext(SingleRestContext);

  useEffect(() => {
    fetch('https://my-first-firestore-bc.web.app/restaurants/')
      .then(res => res.json())
      .then(setAllRestaurants)
      .catch(console.error)
  }, [])

  const handlePress = (singleRest) => {
    setCurrentRest(singleRest);
    navigation.navigate('Details');
  }

  return (
    <ScrollView>
      {!allRestaurants
          ? <ActivityIndicator size='large' color='orange' />
          : allRestaurants.map(singleRest => (
              <TouchableOpacity key={singleRest.id}
                  onPress={() => handlePress(singleRest)}>
                <RestaurantCard singleRest={singleRest} />
              </TouchableOpacity>
            ))
          }
    </ScrollView>
  )
}