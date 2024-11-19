<template>
    <div>
        <nav class="absolute left-0 border-t border-r border-b dark:border-gray-100/10">
            <ul class="flex flex-col gap-y-2">
                <li class="w-full h-full p-2" :class="{ 'bg-gray-200 dark:bg-gray-100/10': $route.name === 'eventDashboardFinished' }">
                    <router-link :to="{ name: 'eventDashboardFinished'}">
                        <Icon icon="mdi:view-dashboard-outline" class="text-lg" />
                    </router-link>
                </li>
                <li class="w-full h-full p-2" :class="{ 'bg-gray-200 dark:bg-gray-100/10': $route.name === 'eventSchedules' }">
                    <router-link :to="{ name: 'eventSchedules', query: { status: $route.query.status } }">
                        <Icon icon="healthicons:i-schedule-school-date-time" class="text-xl" />
                    </router-link>
                </li>
                <li class="w-full h-full p-2" :class="{ 'bg-gray-200 dark:bg-gray-100/10': $route.name === 'eventMedals' }">
                    <router-link :to="{ name: 'eventMedals', query: { status: $route.query.status } }">
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