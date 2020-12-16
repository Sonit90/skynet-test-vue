<template>
  <div
    class="step"
  >
    <h2
      class="step__title"
      :class="{active: active}"
      v-text="options.title"
      @click="stepClick()"
    />
    <transition-expand>
      <div v-show="active">
        <Variant
          v-for="(variant, index) in options.variants"
          :key="variant.title"
          :options="variant"
          :value="index === selectedIndex"
          @input="$emit('update:selectedIndex', index)"
          @selected="$emit('input',$event)"
        />
      </div>
    </transition-expand>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import Variant from '@/components/Variant.vue';
import { Step } from '@/interfaces/General';
import TransitionExpand from '@/transitions/TransitionExpand.vue';

export default Vue.extend({
  name: 'Step',
  components: { TransitionExpand, Variant },
  props: {
    value: {
      type: Number,
      default: 0,
    },
    options: {
      type: Object as PropType<Step>,
      default: () => [],
    },
    active: {
      type: Boolean,
      default: false,
    },
    selectedIndex: {
      type: Number,
      default: null,
    },
  },
  methods: {
    stepClick() {
      this.$emit('stepClick');
    },
  },
});
</script>

<style scoped lang="scss">
.step{
  border-top: 2px solid $gray;
  &__title{
    color: $gray;
    cursor: pointer;
    &.active{
      color: $black;
    }
  }
}
</style>
