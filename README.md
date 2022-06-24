## 使用 CompositionAPI 结合 defineStore 来定义 Store

defineStore(mouduleId, storeFunc)
用 ref 声明 state, computed 声明 getter， function 声明 action。

```js
// user.js
import { defineStore } from "@/store/storeManager";
export const useUserStore = defineStore("user", () => {
  const firstName = ref("HexOr");
  const lastName = ref("Zeng");

  const age = ref(16);
  const getName = computed(() => {
    return firstName.value + " " + lastName.value;
  });
  const changeAge = () => {
    age.value++;
  };
  return {
    firstName,
    lastName,
    getName,
    age,
    changeAge,
  };
});
```

## Composition API 中调用

直接引入 user.js 中的 useUserStore 对象，然后从中解构出想要的 state, getter, action 中使用，注意 state 是 ref 对象

```js
<script setup>
import  { useUserStore }  from "@/store/user";

const userStore = useUserStore();
const { firstName, age, changeAge } = userStore
firstName.value = 'Taylor'
const changeAge = () => {
  userStore.changeAge();
};
</script>
```

## Option API 中调用

使用辅助函数 mapState 来取 state 和 getter 的值;

使用辅助函数 mapWritableState 来读写 state 的值;

使用辅助函数 mapActions 来取 action 的值;

其中第一个参数是 store 模块，

第二个参数：

- 不传： 全部取出来
- array：取指定 key 值数据
- object: 去指定值并改名{'old':'new'}

详细使用请参照 pinia 的 mapState、mapWritableState 和 mapActions 方法。

```js
<script>
  import {useUserStore} from "@/store/user";
  import {mapState, mapActions, mapWritableState} from "@/store/storeManager";

  const user = useUserStore()
  const alarm = useAlarmStore()

  export default {
    data() {
      return {}
    },
    computed: {
      ...mapState(user, ["age"]),
      ...mapWritableState(user, {"age": "age2"}),
    },
    methods: {
      ...mapActions(user, ['changeAge']),
      changeAge2() {
        this.age2 += 1
      }
    }
  }
</script>
```
