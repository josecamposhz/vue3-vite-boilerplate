<template>
  <table class="table" :class="$attrs.class">
    <thead>
      <tr>
        <th v-for="field in fields" :key="field.key" scope="col">
          {{ field.label }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in items" :key="index">
        <td v-for="field in fields" :key="`${field.key}-${index}`">
          <slot :name="field.key" :item="item">
            {{ item[field.key] }}
          </slot>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: ["items", "fields"],
};
</script>
