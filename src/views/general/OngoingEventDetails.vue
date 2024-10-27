<template>
    <div>
        <nav class="absolute left-0 border-t border-r border-b dark:border-gray-100/10">
            <ul class="flex flex-col gap-y-2">
                <li class="w-full h-full p-2" :class="{ 'bg-gray-200 dark:bg-gray-100/10': $route.name === 'eventDashboard' }">
                    <router-link :to="{ name: 'eventDashboard'}">
                        <Icon icon="mdi:view-dashboard-outline" class="text-lg" />
                    </router-link>
                </li>
                <li class="w-full h-full p-2" :class="{ 'bg-gray-200 dark:bg-gray-100/10': $route.name === 'eventSchedules' }">
                    <router-link :to="{ name: 'eventSchedules'}">
                        <Icon icon="healthicons:i-schedule-school-date-time" class="text-xl" />
                    </router-link>
                </li>
                <li class="w-full h-full p-2">
                    <router-link :to="{ name: 'eventDashboard'}">
                        <Icon icon="mdi:medal-outline" class="text-lg" />
                    </router-link>
                </li>
            </ul>
        </nav>
        <router-view />
    </div>
</template>

<script setup>

</script>