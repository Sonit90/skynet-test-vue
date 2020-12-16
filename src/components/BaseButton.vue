<template>
  <button
    class="base-button"
    :disabled="disabled"
    :class="[{disabled:disabled}, {dimmed: dimmed}]"
    v-on="$listeners"
  >
    <span v-text="label">
      <slot />
    </span>
  </button>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'BaseButton',
  props: {
    label: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    dimmed: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style scoped lang="scss">
.base-button{
  outline: 0;
  cursor: pointer;
  background: $primary;
  color: $white;
  display: inline-flex;
  flex-direction: column;
  align-items: stretch;
  position: relative;
  border: 0;
  vertical-align: middle;
  text-decoration: none;
  text-align: center;
  width: auto;
  height: auto;
  border-radius: $br;
  padding: 9px;
  @include non-selectable;
  &:before{
    @include pseudo;
    @include size(100%);
    left: 0;
    top:0;
    opacity: 0;
    transition: opacity 0.3s cubic-bezier(0.25,0.8,0.5,1),opacity 0.6s cubic-bezier(0.25,0.8,0.5,1);
    background: $white;
  }
  &:hover{
    &:before{
      opacity: .25;
    }
  }
  &.disabled{
    background: $disabled;
    cursor: not-allowed;
  }
  &.dimmed{
    background: $disabled;
  }
}
</style>
