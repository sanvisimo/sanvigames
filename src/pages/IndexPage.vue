<template>
  <q-page class="row items-center justify-evenly">
    <GameCard v-for="game in user.user_games" :key="game.game.id" :game="game.game" />
  </q-page>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import GameCard, { Game } from 'components/GameCard.vue';

const GET_USER_GAMES = `query getGames($id: Int!, $name: String!) {
        users_by_pk(id: $id) {
    user_games(where: {game: {name: {_ilike: $name}}}) {
      game {
        aggregated_rating
        aggregated_rating_count
        cover
        genres_games {
          genre {
            slug
            name
            id
          }
        }
        howlongtobeat_infos
        howlongtobeat_rating
        id
        igdb_id
        name
        perspectives_games {
          perspective {
            name
            id
            slug
          }
        }
        platforms_games {
          platform {
            id
            logo
            name
            slug
          }
        }
        similar_games
        slug
        summary
        total_rating
        total_rating_count
        url
      }
    }
    name
    id
  }
}`;

type User = {
    user_games: Game[];
    id: number | null;
    name: string;
}

interface GameVars {
  id: number;
  name: string;
}

export default defineComponent({
  name: 'IndexPage',
  components: { GameCard },
  setup() {
    const { result, loading, error } = useQuery<User, GameVars>(
      gql`${GET_USER_GAMES}`,
      {
        variables: {
          id: 1,
          name: 'mass effect%',
        },
      },
    );

    const user = computed<User>(() => result.value.users_by_pk);
    // eslint-disable-next-line no-console
    console.log('user', user);

    return { user };
  },
  computed: {
    grouped(): Game[] {
      return this.user.user_games;
    },
  },
});
</script>
