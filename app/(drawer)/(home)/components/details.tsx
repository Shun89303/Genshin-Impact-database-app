import { useHomeState } from '@/src/store/useHomeStore';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

interface Character {
  name: string;
  title?: string | null;
  vision?: string | null;
  weapon?: string | null;
  gender?: string | null;
  nation?: string | null;
  affiliation?: string | null;
  constellation?: string | null;
  description?: string | null;
}

export default function DetailsSheet() {
  const [details, setDetails] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);
  const selectedID = useHomeState((state) => state.selectedID);

  useEffect(() => {
    fetchCharacters();
  }, [selectedID]);

  async function fetchCharacters() {
    try {
      setLoading(true);
      setDetails(null);
      const res = await fetch(
        `https://genshin.jmp.blue/characters/${selectedID}?lang=en`,
      );
      const characterData = await res.json();

      setDetails(characterData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
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
          <Text style={styles.value}>{name || 'unknown'}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Title</Text>
          <Text style={styles.value}>{title || 'unknown'}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Vision</Text>
          <Text style={styles.value}>{vision || 'unknown'}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Weapon</Text>
          <Text style={styles.value}>{weapon || 'unknown'}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Gender</Text>
          <Text style={styles.value}>{gender || 'unknown'}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Nation</Text>
          <Text style={styles.value}>{nation || 'unknown'}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Affiliation</Text>
          <Text style={styles.value}>{affiliation || 'unknown'}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Constellation</Text>
          <Text style={styles.value}>{constellation || 'unknown'}</Text>
        </View>

        <View style={styles.column}>
          <Text style={styles.label}>Description</Text>
          <Text style={styles.description}>{description || 'unknown'}</Text>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        {loading && <ActivityIndicator />}
        {details && renderDetails(details)}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  column: {
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    ...Platform.select({
      android: {
        fontWeight: '900',
      },
      ios: {
        fontWeight: '600',
      },
    }),
    width: 120,
  },
  value: {
    fontSize: 13,
    textAlign: 'right',
    color: '#474747ff',
  },
  description: {
    marginTop: 8,
    lineHeight: 22,
    color: 'gray',
  },
});
