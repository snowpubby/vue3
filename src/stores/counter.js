import { defineStore } from "pinia";
import { ref } from "vue";

// export const useCounterStore = defineStore("counter", {
//   state: () => {
//     return {
//       count: 0,
//     };
//   },
//   actions: {
//     increment() {
//       this.count++;
//     },
//     decrement() {
//       this.count--;
//     },
//   },
// });
//使用setup函数或对象定义store
export const useCounterStore = defineStore(
  "counter",
  () => {
    const count = ref(0);
    const increment = () => {
      count.value++;
    };
    const decrement = () => {
      count.value--;
    };
    return { count, increment, decrement };
  },
  {
    persist: {
      storage: localStorage,
      key: "counter",
    },
  }
);
