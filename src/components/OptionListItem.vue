<template>
  <div
    class="option-list-item"
    :class="{disabled:disabled}"
    @click="onClick()"
  >
    <BaseCheckbox
      class="option-list-item__checkbox"
      :value="value"
      :disabled="disabled"
      @input="$emit('input',$event)"
    />
    <span
      class="option-list-item__label"
      v-text="label"
    >
      <slot />
    </span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import BaseCheckbox from '@/components/BaseCheckbox.vue';

export default Vue.extend({
  name: 'OptionListItem',
  components: {
    BaseCheckbox,
  },

  props: {
    label: {
      type: String,
      default: '',
    },
    value: {
      type: Boolean,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onClick(): void {
      if (this.disabled) {
        return;
      }
      this.$emit('input', !this.value);
    },
  },
});
</script>

<style scoped lang="scss">
.option-list-item{
  border: 1px solid $gray;
  border-radius: $br;
  padding: 9px;
  background: transparent;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  color: $gray;
  &__label{
    margin: 0 auto;
    @include non-selectable;
  }
  &.disabled{
    cursor: not-allowed;
  }
}
</style>
