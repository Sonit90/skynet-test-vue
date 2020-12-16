<template>
  <div class="option-list">
    <OptionListItem
      class="option-list__item"
      v-for="(item, index) in options"
      :key="item.title"
      :label="item.title"
      :disabled="disabled"
      @input="onInput($event, index)"
      :value="value.includes(index)"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import OptionListItem from '@/components/OptionListItem.vue';
import { Item } from '@/interfaces/General';

export default Vue.extend({
  name: 'OptionList',
  components: {
    OptionListItem,
  },
  props: {
    options: {
      type: Array as () => Item[],
      required: true,
    },
    value: {
      type: Array,
      default: () => [],
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    price: {
      type: Number,
      default: null,

    },
  },
  data() {
    return {
      localValue: this.value,
    };
  },
  methods: {
    onInput(value: boolean, index: number) {
      if (value) {
        this.localValue.push(index);
      } else {
        const searchIndex = this.localValue.indexOf(index);
        if (searchIndex !== -1) {
          this.localValue.splice(searchIndex, 1);
        }
      }
      this.$emit('input', this.localValue);
      this.$emit('update:price', this.totalPrice);
    },
  },
  computed: {
    totalPrice(): number {
      // eslint-disable-next-line max-len
      const priceArray = this.options.map((e: Item, index: number) => (this.localValue.includes(index) ? e.price : 0));
      return priceArray.reduce((a: number, b: number) => a + b, 0);
    },
  },
});
</script>

<style scoped lang="scss">
.option-list{
  &__item{
    margin-bottom: 10px;
  }
}
</style>
