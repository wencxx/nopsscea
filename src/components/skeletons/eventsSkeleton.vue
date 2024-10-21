<template>
    <div class="w-full grid lg:grid-cols-2 xl:grid-cols-3 gap-5">
        <div v-for="i in 3" :key="i" class="border h-fit rounded shadow dark:border-gray-100/10 overflow-hidden">
            <div class="w-full aspect-video bg-gray-300 animate-pulse">
                
            </div>
            <div class="p-4 space-y-1">
                <div class="space-y-1">
                    <div class="h-6 w-28 rounded bg-gray-300 animate-pulse"></div>
                    <div class="h-3 w-20 rounded bg-gray-300 animate-pulse"></div>
                </div>
                <div class="space-y-1">
                    <div class="h-4 w-full bg-gray-300 rounded animate-pulse"></div>
                    <div class="h-4 w-full bg-gray-300 rounded animate-pulse"></div>
                    <div class="h-4 w-3/4 bg-gray-300 rounded animate-pulse"></div>
                </div>
                <div class="w-1/4 bg-gray-300 animate-pulse h-8 rounded !mt-2"></div>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>