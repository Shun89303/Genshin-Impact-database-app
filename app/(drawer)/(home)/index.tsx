import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import DetailsSheet from './components/details';

interface Character {
  id: string;
  name: string;
  vision: string;
  image: string;
}

export default function HomeScreen() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['40%', '80%'], []);

  useEffect(() => {
    FetchCharacters();
  }, []);

  async function FetchCharacters() {
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
    } finally {
      setLoading(false);
    }
  }

  function RenderImage({ uri }: { uri: string }) {
    const [imageLoading, setImageLoading] = useState(true);

    return (
      <View>
        {imageLoading && <ActivityIndicator />}
        <Image
          style={{
            width: 150,
            height: 250,
          }}
          resizeMode="contain"
          source={{ uri }}
          onLoad={() => setImageLoading(false)}
        />
      </View>
    );
  }

  const RenderCharacter = ({ id, name, vision, image }: Character) => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          width: '60%',
          margin: 'auto',
        }}
      >
        <Pressable onPress={() => sheetRef.current?.expand()} key={id}>
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
            <RenderImage uri={image} />
          </View>
        </Pressable>
      </View>
    );
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeAreaView}>
        {loading && <ActivityIndicator size="small" />}
        <FlatList
          data={characters}
          renderItem={({ item }) => <RenderCharacter {...item} />}
          keyExtractor={(cha) => cha.id}
          ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        />
        <BottomSheet ref={sheetRef} snapPoints={snapPoints} index={-1}>
          <BottomSheetView style={{ flex: 1, alignItems: 'center' }}>
            <DetailsSheet />
          </BottomSheetView>
        </BottomSheet>
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
    width: '100%',
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
