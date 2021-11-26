<template>
  <div v-if="modelValue" class="modal modal-background" @click.self="onClose">
    <div class="modal-dialog" :class="{ 'modal-dialog-centered': centered }">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ title }}</h5>
          <button type="button" class="btn-close" @click="onClose"></button>
        </div>
        <div class="modal-body">
          <slot name="body" />
        </div>
        <div class="modal-footer">
          <slot name="footer">
            <button class="btn btn-light" @click="handleCancel">
              Cancelar
            </button>
            <button class="btn btn-primary" @click="handleOk">Aceptar</button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: Boolean,
    },
    title: {
      type: String,
      default: "",
    },
    centered: {
      type: Boolean,
      default: false,
    },
    ok: {
      type: Function,
      default: () => {},
    },
    cancel: {
      type: Function,
      default: () => {},
    },
  },
  emits: ["update:modelValue", "on:ok", "on:cancel"],
  setup(props, { emit }) {
    const onClose = () => emit("update:modelValue", false);
    return {
      onClose,
      handleCancel: () => {
        props.cancel();
        onClose();
      },
      handleOk: () => {
        props.ok();
        onClose();
      },
    };
  },
};
</script>

<style>
.modal.modal-background {
  display: block;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
