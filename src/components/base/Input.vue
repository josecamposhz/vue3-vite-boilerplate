<template>
  <div class="mb-3" :class="$attrs.class">
    <label v-if="$attrs.label" :for="name" class="form-label">
      {{ $attrs.label }}
    </label>
    <input
      class="form-control"
      v-model="value"
      :name="name"
      v-bind="$attrs"
      :class="{ 'is-invalid': errorMessage }"
    />
    <div class="invalid-feedback">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
import { useField } from "vee-validate";
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    rules: {
      type: [Object, String],
      default: "",
    },
  },
  setup(props, { attrs }) {
    const { value, errorMessage } = useField(props.name, props.rules, {
      label: attrs.label || attrs.placeholder,
    });
    return {
      value,
      errorMessage,
    };
  },
};
</script>
