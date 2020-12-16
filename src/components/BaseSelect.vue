<template>
  <div>
    <p
      class="base-select--title"
      v-if="options.title"
      v-text="options.title"
    />
    <select
      class="base-select"
      @change="$emit('input', $event.target.value)"
    >
      <option
        v-for="option in options.items"
        :key="option.title"
        :label="option.title"
        :value="option.price"
      />
    </select>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { Select } from '@/interfaces/General';

export default Vue.extend({
  name: 'BaseSelect',
  props: {
    value: {
      type: Number,
      default: 0,
    },
    options: {
      type: Object as PropType<Select>,
      required: true,
    },
  },
  mounted() {
    if (this.options.items.length > 0) {
      this.$emit('input', this.options.items[0].price);
    }
  },
});
</script>

<style scoped lang="scss">
.base-select{
  width: 100%;
  border-radius: $br;
  padding: 8px 12px;
  &--title{
    margin-bottom: 10px;
    margin-top: 0;
    font-size: 12px;
  }
}
</style>
