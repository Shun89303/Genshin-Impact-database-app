import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

interface Character {
  name: string;
  title?: string | 'unknown';
  vision?: string | 'unknown';
  weapon?: string | 'unknown';
  gender?: string | 'unknown';
  nation?: string | 'unknown';
  affiliation?: string | 'unknown';
  constellation?: string | 'unknown';
  description?: string | 'unknown';
}

export default function Details() {
  const params = useLocalSearchParams();
  const [details, setDetails] = useState<Character>();

  useEffect(() => {
    fetchCharacters();
  }, []);

  async function fetchCharacters() {
    try {
      const res = await fetch(
        `https://genshin.jmp.blue/characters/${params.id}?lang=en`,
      );
      const characterData = await res.json();

      setDetails(characterData);
    } catch (error) {
      console.log(error);
    }
  }

  const renderDetails = ({
    name,
    title,
    vision,
    weapon,
    gender,
    nation,
    affiliation,
    constellation,
    description,
  }: Character) => {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.label}>Name</Text>
          <Text style={styles.value}>{name}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Title</Text>
          <Text style={styles.value}>{title}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Vision</Text>
          <Text style={styles.value}>{vision}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Weapon</Text>
          <Text style={styles.value}>{weapon}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Gender</Text>
          <Text style={styles.value}>{gender}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Nation</Text>
          <Text style={styles.value}>{nation}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Affiliation</Text>
          <Text style={styles.value}>{affiliation}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Constellation</Text>
          <Text style={styles.value}>{constellation}</Text>
        </View>

        <View style={styles.column}>
          <Text style={styles.label}>Description</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaProvider>
      <SafeAreaView>{details && renderDetails(details)}</SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    gap: 12,
    width: '80%',
    marginHorizontal: 'auto',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  column: {
    marginTop: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left',
    width: 120,
  },
  value: {
    fontSize: 13,
    flex: 1,
    textAlign: 'right',
  },
  description: {
    marginTop: 4,
    lineHeight: 20,
  },
});
