import { useEffect, useState, Fragment } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, ActivityIndicator, ImageBackground, ScrollView,
  Image  } from 'react-native';
import styles from './src/styles';

const bgImage = { uri: 'https://png.pngtree.com/background/20210709/original/pngtree-food-western-food-steak-tomato-picture-image_941801.jpg' };

export default function App() {
  const [allRestaurants, setAllRestaurants] = useState();

  useEffect(() => {
    fetch('https://my-first-firestore-bc.web.app/restaurants/')
      .then(response => response.json())
      .then(setAllRestaurants)
      .catch(console.error)
  }, [])

  return (
    <View style={styles.container}>
      <ImageBackground resizeMode='cover' source={bgImage} style={styles.container}>
        <ScrollView>
          {!allRestaurants
              ? <ActivityIndicator size='large' color='orange' />
              : 
                allRestaurants.map(singleRest => (
                  <Fragment key={singleRest.id}>
                    <Text style={styles.restaurantsName}>
                      {singleRest.name} / { singleRest.cuisine}
                    </Text>
                    <Image source={{ uri: singleRest.image }} style={{ width: '100%', height: 100 }} />
                  </Fragment>
                ))
          }
        </ScrollView>
        <StatusBar style="auto" />
      </ImageBackground>
    </View>
  );
}
