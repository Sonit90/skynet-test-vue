<template>
  <div id="app">
    <Step
      v-for="(step, index) in backendData"
      :options="step"
      :key="step.title"
      :active="index === activeStep"
      v-model="prices[index]"
      @input="nextStep()"
      @stepClick="stepClick(index)"
      :selected-index.sync="pickedOptions[index]"
    />
    <div class="total-price">
      <span class="total-price__text">ИТОГО К ОПЛАТЕ:</span>
      <span
        class="total-price__sum"
        v-if="totalPrice"
      >{{ totalPrice| splitNumber }} ₽</span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Step from '@/components/Step.vue';
import data from '@/data/data.json';

export default Vue.extend({
  name: 'App',
  components: {
    Step,
  },
  data() {
    return {
      backendData: data,
      activeStep: 0,
      prices: [],
      pickedOptions: [],
    };
  },
  methods: {
    nextStep() {
      if (this.activeStep < this.backendData.length - 1) {
        this.activeStep += 1;
      }
    },
    stepClick(index: number) {
      if (index < this.activeStep) {
        this.prices.splice(index + 1, this.backendData.length);
        this.pickedOptions.splice(index + 1, this.backendData.length);
        this.activeStep = index;
      }
    },
  },
  computed: {
    totalPrice(): number {
      return this.prices.reduce((a: number, b: number) => a + b, 0);
    },
  },
});
</script>

<style lang="scss">
#app{
  max-width: 768px;
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  .total-price{
    border-radius: $br;
    background: $primary;
    padding: 12px 16px;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &__text{
      font-size: 26px;
      font-weight: 700;
    }
    &__sum{
      font-weight: 700;
      font-size: 24px;
    }
  }
}
</style>
