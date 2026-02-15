import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

interface Character {
  id: string;
  name: string;
  vision: string;
  image: string;
}

export default function Home() {
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    fetchCharacters();
  }, []);

  async function fetchCharacters() {
    try {
      const res = await fetch('https://genshin.jmp.blue/characters/');
      const charactersID = await res.json();

      const completeCharacters = await Promise.all(
        charactersID.map(async (c: Character) => {
          const res = await fetch(
            `https://genshin.jmp.blue/characters/${c}?lang=en`,
          );
          const characterData = await res.json();

          return {
            id: c,
            name: characterData.name,
            vision: characterData.vision,
            image: `https://genshin.jmp.blue/characters/${c}/card`,
          };
        }),
      );

      setCharacters(completeCharacters);
    } catch (error) {
      console.log(error);
    }
  }

  const renderCharacter = ({ id, name, vision, image }: Character) => {
    return (
      <Link href={{ pathname: '/details', params: { id } }} key={id}>
        <View
          style={{
            width: '100%',
          }}
        >
          <View
            style={[
              styles.container,
              {
                backgroundColor: `${colorByVision[vision as keyof typeof colorByVision]}80`,
              },
            ]}
          >
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.vision}>{vision}</Text>
            <Image
              style={{
                width: 150,
                height: 250,
              }}
              resizeMode="contain"
              source={{
                uri: image,
              }}
            />
          </View>
        </View>
      </Link>
    );
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeAreaView}>
        <FlatList
          data={characters}
          renderItem={({ item }) => renderCharacter(item)}
          keyExtractor={(cha) => cha.id}
          contentContainerStyle={{
            gap: 16,
          }}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    paddingTop: 16,
  },
  container: {
    flex: 1,
    width: '60%',
    marginHorizontal: 'auto',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 10,
    ...Platform.select({
      android: {
        padding: 10,
      },
      ios: {
        padding: 16,
      },
      default: {},
    }),
  },
  name: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  vision: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'gray',
    textAlign: 'center',
  },
});

const colorByVision = {
  Pyro: '#FF4C4C',
  Hydro: '#4CA6FF',
  Electro: '#B14CFF',
  Anemo: '#4CFFD9',
  Geo: '#FFD14C',
  Dendro: '#4CFF6B',
  Cryo: '#4CDFFF',
};
