<script setup lang="ts">
import ToolTip from "../ToolTip.vue";

defineEmits(["update:modelValue"]);

defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: false,
  },
  options: {
    type: Array,
    required: true,
  },
  tooltip: {
    type: String,
    required: false,
  },
  nullable: {
    type: Boolean,
    required: false,
    default: false,
  },
  tooltipPosition: {
    type: String,
    required: false,
    default: "right",
  },
});
</script>

<template>
  <div class="flex space-x-4 items-start" :class="{ 'items-center': label }">
    <label
      v-if="label"
      :for="`x-select-${label.replaceAll(' ', '-').toLowerCase()}`"
      class="text-sm font-medium text-gray-700 w-1/5 text-right flex items-center justify-end space-x-2"
      ><span>{{ label }}</span>
      <ToolTip v-if="tooltip" :position="tooltipPosition">{{
        tooltip
      }}</ToolTip>
    </label>
    <select
      class="border border-gray-300 rounded px-2 py-1 flex-grow focus:ring-blue-300 focus:ring-2 focus:ring-offset-0 focus:outline-none"
      :class="{ 'w-full flex-grow-0': !label }"
      :id="`x-select-${label?.replaceAll(' ', '-').toLowerCase()}`"
      :value="modelValue"
      autocomplete="off"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
    >
      <option v-if="nullable" placeholder="None" value="" selected>None</option>
      <option v-for="option in options" :value="option">
        {{ option }}
      </option>
    </select>
  </div>
</template>
