<template>
  <div class="variant">
    <div
      class="variant__border"
      :style="{background: options.color}"
    />
    <div class="variant__top">
      <h2
        class="variant__top--title"
        v-text="options.title"
      />
      <span
        v-if="price"
        class="variant__top--price"
      >{{ price | splitNumber }} ₽ </span>
    </div>
    <div class="variant__inner">
      <div class="variant__text">
        <span
          v-for="(row, index) in description"
          :key="index"
          class="variant__text--description"
          v-text="row"
        />
      </div>
      <div class="variant__options">
        <OptionList
          v-if="options.options.length>0"
          :options="options.options"
          @update:price="updateOptionSum($event)"
        />
        <template v-if="options.select.length>0">
          <BaseSelect
            class="variant__select"
            v-for="(select,index) in options.select"
            :key="select.title"
            :options="select"
            v-model.number="selectValues[index]"
          />
        </template>
        <BaseButton
          class="variant__options--btn"
          :label="btnOptions.label"
          :dimmed="btnOptions.dimmed"
          @click="selectVariant()"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import OptionList from '@/components/OptionList.vue';
import { Variant } from '@/interfaces/General';
import BaseSelect from '@/components/BaseSelect.vue';
import BaseButton from '@/components/BaseButton.vue';

export default Vue.extend({
  name: 'Variant',
  components: {
    OptionList,
    BaseSelect,
    BaseButton,
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Object as PropType<Variant>,
      required: true,
    },
  },
  data() {
    return {
      optionSum: 0,
      selectValues: [] as Array <number>,
    };
  },
  computed: {
    btnOptions() {
      const normal = { label: 'Выбрать', dimmed: true };
      const done = { label: 'Выбрано', dimmed: false };

      return !this.value ? normal : done;
    },
    description(): Array<string> {
      return this.options.description.split('\n');
    },
    selectedSum(): number {
      return this.selectValues.reduce((a: number, b: number) => a + b, 0);
    },
    price() {
      return this.optionSum + this.selectedSum + this.options.price_default;
    },
  },
  methods: {
    selectVariant() {
      this.$emit('selected', this.price);
      this.$emit('input', !this.value);
    },
    updateOptionSum(price: number) {
      this.optionSum = price;
    },
  },
});
</script>

<style scoped lang="scss">
.variant{
  background: $bg;
  padding: 12px 18px;
  position: relative;
  margin-bottom: 12px;
  &__inner{
    display: flex;
    flex-direction: row;
  }
  &__top{
    flex-direction: row;
    display: flex;
    justify-content: space-between;
    &--title{
      margin: 0;
      margin-bottom: 18px;
    }
    &--price{
      font-size: 16px;
      font-weight: 500;
    }
  }
  &__text{
    display: flex;
    flex-direction: column;
    flex-basis: 70%;
    padding: 0;
    &--description{
      line-height: 1.5em;
      margin-bottom: 10px;
    }
  }
  &__options{
    flex-basis: 30%;
    position: relative;
    padding: 12px 0 12px 12px;
    &::before{
      @include pseudo();
      border-left: 1px solid $gray;
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
    }
    &--btn{
      width: 100%;
      margin-top: 12px;
    }
  }
  &__select{
    margin-bottom: 10px;
  }
  &__border{
    height: 100%;
    width: 4px;
    position: absolute;
    left: 0;
    top: 0;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }
}
</style>
