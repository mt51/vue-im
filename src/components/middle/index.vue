<template>
  <div>middle</div>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'

export default createComponent({
  name: 'middle',
  setup() {
    console.log('middle');
  }
});
</script>
