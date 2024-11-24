<template>
  <div class="fixed top-0 left-0 w-screen h-screen flex items-center justify-center !mt-0">
    <iframe :src="`https://docs.google.com/viewer?url=${encodeURIComponent(docsUrl)}&embedded=true`" width="50%" height="100%" class="overflow-auto"></iframe>

    <div class="absolute top-0 right-0">
      <a :href="docsUrl" download class="!bg-gray-500">
        <Icon icon="mdi:download" class="text-3xl text-green-" />
      </a>
    </div>
  </div>
</template>

<script setup>
const { docsUrl } = defineProps({
  docsUrl: String
})

</script>
