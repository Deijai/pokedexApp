import React, { useMemo, useState } from 'react'
import { FlatList, View } from 'react-native'
import { globalTheme } from '../../../config/theme/global-theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ActivityIndicator, Text, TextInput } from 'react-native-paper';
import { Pokemon } from '../../../domain/entities/pokemon';
import { PokemonCard } from '../../components/pokemons/PokemonCard';
import { useQuery } from '@tanstack/react-query';
import { getPokemonByIds, getPokemonNamesWithIds } from '../../../actions/pokemons';
import { FullScreenLoader } from '../../components/ui/FullScreenLoader';
import { useDebouncedValue } from '../../hooks/useDebouncedValue';

export const SearchScreen = () => {
  const { top } = useSafeAreaInsets();
  const [term, setTerm] = useState<string>('');
  const { debouncedValue } = useDebouncedValue(term);

  const { isLoading, data: pokemonNameList = [] } = useQuery({
    queryKey: ['pokemons', 'all'],
    queryFn: () => getPokemonNamesWithIds()
  });

  const pokemonNameIdList = useMemo(() => {
    if(!isNaN(Number(debouncedValue))) {
      const pokemon = pokemonNameList.find(pokemon => pokemon?.id === Number(debouncedValue));
      return pokemon ? [pokemon] : [];
    }

    if(debouncedValue.length === 0) return [];

    if(debouncedValue.length < 3) return [];
  
    return pokemonNameList.filter(pokemon => {
      return pokemon.name.includes(debouncedValue.toLocaleLowerCase())
    });

  }, [debouncedValue]);


  const {isLoading: isLoadingPokemons, data: pokemons = []} = useQuery({
    queryKey: ['pokemons', 'by', pokemonNameIdList],
    queryFn: () => getPokemonByIds(pokemonNameIdList.map(item => item.id)),
    staleTime: (1000 * 60 * 5)
  })




  if(isLoading) {
    return (<FullScreenLoader />)
  }

  return (
    <View style={[globalTheme.globalMargin, {marginTop: top + 10}]}>
        <TextInput 
        placeholder='Pesquisar Pokémon'
        autoFocus
        autoCorrect={false}
        onChangeText={setTerm} 
        value={ term }
        mode='flat' />
        {
          isLoadingPokemons && (<ActivityIndicator style={{ paddingTop: 20 }} />)
        }
        

        {/* <Text>{JSON.stringify(pokemons, null, 2)}</Text> */}

        <FlatList
        style={{ paddingTop: top + 20 }}
        showsVerticalScrollIndicator={false}
        data={pokemons}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        numColumns={2}
        renderItem={({ item }) => (<PokemonCard pokemon={item} />)}
        ListFooterComponent={<View style={{height: 100}}></View>}
      />

    </View>
  )
}
