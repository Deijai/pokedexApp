import * as React from 'react';
import { FlatList, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper';
import { getPokemons } from '../../../actions/pokemons';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { PokeballBg } from '../../components/ui/PokeballBg';
import { globalTheme } from '../../../config/theme/global-theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PokemonCard } from '../../components/pokemons/PokemonCard';
import { FullScreenLoader } from '../../components/ui/FullScreenLoader';


export const HomeScreen = () => {
  const { top } = useSafeAreaInsets();
  const queryClient = useQueryClient();

  // Queries
 /*  const { isLoading, isError, data = [] } = useQuery({
    queryKey: ['pokemons'],
    queryFn: () => getPokemons(0),
    staleTime: (1000 * 60 * 60) // 60 minutos
   }); */


   const { isLoading, isError, data, fetchNextPage } = useInfiniteQuery({
    queryKey: ['pokemons', 'infinite'],
    initialPageParam: 0,
    staleTime: (1000 * 60 * 60), // 60 minutos
    queryFn: async ( params ) => {
      const pokemons = await getPokemons(params.pageParam);
      pokemons.forEach(pokemon => {
        queryClient.setQueryData( ['pokemon', pokemon.id], pokemon )
      })
      return pokemons;
    },
    getNextPageParam: (lastPage, pages) => pages.length,
   });

    if(isLoading) {
       return (<FullScreenLoader />)
     }

   

  return (
    <View style={[globalTheme.globalMargin]}>
        <PokeballBg style={styles.imgPosition} />



        <FlatList
        style={{paddingTop: top + 20}}
        showsVerticalScrollIndicator={false}
        data={data?.pages.flat() ?? []}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        numColumns={2}
        ListHeaderComponent={() => <Text variant={'displayMedium'}>{'Pokédex'}</Text>}
        renderItem={({ item }) => (<PokemonCard pokemon={item} />)}
        onEndReachedThreshold={0.6}
        onEndReached={() => fetchNextPage()}
         />
    </View>
  )
}

const styles = StyleSheet.create({
  imgPosition: {
    position: 'absolute',
    top: -100,
    right: -100
  }
});
