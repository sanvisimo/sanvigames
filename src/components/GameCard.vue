<template>
  <q-card class="my-card" :style="{ 'max-width': width }">
    <img :src="cover" :alt="game.name" />

    <q-card-section>
      <div class="row justify-between items-center no-wrap">
        <div>
          <div class="text-subtitle1 ellipsis">{{ game.name }}</div>
          <div class="text-subtitle2">{{ genre }}</div>
        </div>
        <div>
          <div class="text-blue-grey-4">{{ rating }}</div>
          <div class="text-blue-grey-4">{{ duration }}</div>
        </div>
      </div>

    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';

type Genre = {
  name: string;
  id: number;
  slug: string;
};

type HLTB = {
  howlongtobeat_url: string;
  howlongtobeat_main: number;
  howlongtobeat_main_unit: string;
  howlongtobeat_main_extra: number;
  howlongtobeat_main_extra_unit: string;
  howlongtobeat_completionist: number;
  howlongtobeat_completionist_unit: string;
};

type Cover = {
  id: number;
  alpha_channel: boolean;
  animated: boolean;
  game: number;
  height: number;
  image_id: string;
  url: string;
  width: number;
  checksum: string;
};

type Website = {
  url: string;
  id: number;
  category: string;
};

type Platform = {
  name: string;
  logo: string;
  id: number;
  slug: string;
};

export type Game = {
  name: string;
  genres_games: Array<{ genre: Genre }>;
  aggregated_rating: number;
  aggregated_rating_count: number;
  howlongtobeat_rating: number;
  howlongtobeat_infos: HLTB;
  cover: Cover;
  similar_games: Array<number>;
  slug: string;
  summary: string;
  total_rating: number;
  total_rating_count: 1765;
  url: string;
  websites: Website[];
  perspectives_games: Array<{ perspective: Genre }>;
  platforms_games: Array<{ platform: Platform }>;
};

export default defineComponent({
  name: 'GameCard',
  props: {
    width: {
      type: Number,
      default: 300,
    },
    game: {
      type: Object as PropType<Game>,
      required: true,
    },
  },
  computed: {
    rating(): string {
      const rating = this.game.total_rating
        ? this.game.total_rating
        : this.game.aggregated_rating
          ? this.game.aggregated_rating
          : this.game.howlongtobeat_rating
            ? this.game.howlongtobeat_rating
            : 0;
      return `${Math.round(rating)}%`;
    },
    cover(): string {
      return `//images.igdb.com/igdb/image/upload/t_cover_big/${this.game.cover.image_id}.jpg`;
    },
    genre(): string {
      return this.game.genres_games[0].genre.name;
    },
    duration(): string {
      return `${this.game.howlongtobeat_infos.howlongtobeat_main_extra} ${this.game.howlongtobeat_infos.howlongtobeat_main_extra_unit}`;
    },
  },
});
</script>

<style scoped lang="scss">
.my-card {
  width: 100%;
  max-width: 300px;
}
</style>
