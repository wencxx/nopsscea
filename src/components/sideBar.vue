<template>
  <div>
    <aside class="min-w-[250px] h-screen border-r dark:border-gray-100/10 z-10 bg-white dark:bg-dark-bg space-y-3">
        <div class="w-full px-5 !py-4">
          <header class="h-[5dvh] flex items-center gap-x-3">
              <img src="../assets/images/logo.png" alt="logo" class="h-4/5">
              <h2 class="font-semibold dark:text-dark-primary-text text-sm uppercase">Nopsscea - {{ role }}</h2>
          </header>
        </div>
        <!-- nav for schools -->
        <nav class="p-5" v-if="role === 'school'">
            <ul class="space-y-2">
              <li>
                <router-link :to="{ name: 'schoolDashboard' }" class="flex items-center gap-x-2 text-md !text-white-secondary-text p-1 rounded" :class="{ 'bg-gray-100 dark:bg-gray-50/10 !text-white-primary-text dark:!text-dark-primary-text': $route.name == 'schoolDashboard' }">
                  <Icon icon="mdi:view-dashboard-outline" class="text-xl"/>
                  <p>Dashboard</p>
                </router-link>
              </li>
              <li>
                <router-link :to="{ name: 'athleteNewsfeed' }" class="flex items-center gap-x-2 text-md !text-white-secondary-text p-1 rounded hover:bg-gray-100 hover:dark:bg-gray-50/10" :class="{ 'bg-gray-100 dark:bg-gray-50/10 !text-white-primary-text dark:!text-dark-primary-text': $route.name == 'athleteNewsfeed' }">
                  <Icon icon="mdi:view-dashboard-outline" class="text-xl"/>
                  <p>Newsfeed</p>
                </router-link>
              </li>
              <li>
                <div @click="toggleDropdown('athletes')" class="flex items-center gap-x-2 text-md !text-white-secondary-text p-1 rounded" :class="{ 'bg-gray-100 dark:bg-gray-50/10 !text-white-primary-text dark:!text-dark-primary-text': $route.name == 'pendingAthletes' || $route.name == 'athletesList' }">
                  <Icon icon="ic:round-sports-gymnastics" class="text-xl"/>
                  <p>Athletes</p>
                   <Icon icon="iconamoon:arrow-down-2-duotone" class="text-2xl ml-auto transition-all duration-100" :class="{ 'rotate-180': openDropdown.includes('athletes') }" />
                </div>
                <div v-if="openDropdown.includes('athletes')" class="border-l dark:border-gray-100/10 ml-3 mt-1">
                    <router-link :to="{ name: 'athletesList' }" class="flex items-center gap-x-2 text-md !text-white-secondary-text p-1 pl-3 rounded-tr rounded-br" :class="{ 'bg-gray-100 dark:bg-gray-50/10 border-l !text-white-primary-text dark:!text-dark-primary-text border-dark-bg dark:border-white': $route.name == 'athletesList' }">
                      <p>Athlete Lists</p>
                    </router-link>
                    <router-link :to="{ name: 'pendingAthletes' }" class="flex items-center gap-x-2 text-md !text-white-secondary-text p-1 pl-3 rounded-tr rounded-br" :class="{ 'bg-gray-100 dark:bg-gray-50/10 border-l !text-white-primary-text dark:!text-dark-primary-text border-dark-bg dark:border-white': $route.name == 'pendingAthletes' }">
                      <p>Pending Athletes</p>
                    </router-link>
                </div>
              </li>
              <li>
                <div @click="toggleDropdown('coaches')" class="flex items-center gap-x-2 text-md !text-white-secondary-text p-1 rounded" :class="{ 'bg-gray-100 dark:bg-gray-50/10 !text-white-primary-text dark:!text-dark-primary-text': $route.name == 'pendingCoaches' || $route.name == 'coachesList' }">
                  <Icon icon="material-symbols:sports-kabaddi-rounded" class="text-xl"/>
                  <p>Coaches</p>
                   <Icon icon="iconamoon:arrow-down-2-duotone" class="text-2xl ml-auto transition-all duration-100" :class="{ 'rotate-180': openDropdown.includes('coaches') }" />
                </div>
                <div v-if="openDropdown.includes('coaches')" class="border-l dark:border-gray-100/10 ml-3 mt-1">
                    <router-link :to="{ name: 'pendingCoaches' }" class="flex items-center gap-x-2 text-md !text-white-secondary-text p-1 pl-3 rounded-tr rounded-br" :class="{ 'bg-gray-100 dark:bg-gray-50/10 border-l !text-white-primary-text dark:!text-dark-primary-text border-dark-bg dark:border-white': $route.name == 'pendingCoaches' }">
                      <p>Pending Coaches</p>
                    </router-link>
                    <router-link :to="{ name: 'coachesList' }" class="flex items-center gap-x-2 text-md !text-white-secondary-text p-1 pl-3 rounded-tr rounded-br" :class="{ 'bg-gray-100 dark:bg-gray-50/10 border-l !text-white-primary-text dark:!text-dark-primary-text border-dark-bg dark:border-white': $route.name == 'coachesList' }">
                      <p>Coach Lists</p>
                    </router-link>
                </div>
              </li>
              <li>
                <div @click="toggleDropdown('events')" class="flex items-center gap-x-2 text-md !text-white-secondary-text p-1 rounded cursor-pointer hover:bg-gray-100 hover:dark:bg-gray-50/10" :class="{ 'bg-gray-100 dark:bg-gray-50/10 !text-white-primary-text dark:!text-dark-primary-text': $route.name == 'upcomingEvents' || $route.name == 'ongoingEvents' || $route.name == 'FinishedEvents' || $route.name == 'upcomingEventDetails' || $route.name == 'eventApplicants' || $route.name == 'eventDashboard' }">
                  <Icon icon="mdi:event-outline" class="text-xl"/>
                  <p>Events</p>
                  <Icon icon="iconamoon:arrow-down-2-duotone" class="text-2xl ml-auto transition-all duration-100" :class="{ 'rotate-180': openDropdown.includes('events') }" />
                </div>
                <div v-if="openDropdown.includes('events')" class="border-l dark:border-gray-100/10 ml-3 mt-1">
                    <router-link :to="{ name: 'ongoingEvents' }" class="flex items-center gap-x-2 text-md !text-white-secondary-text p-1 pl-3 rounded-tr rounded-br hover:bg-gray-100 hover:dark:bg-gray-50/10" :class="{ 'bg-gray-100 dark:bg-gray-50/10 border-l !text-white-primary-text dark:!text-dark-primary-text border-dark-bg dark:border-white': $route.name == 'ongoingEvents' || $route.name == 'eventDashboard'}">
                      <p>Ongoing Events</p>
                    </router-link>
                    <router-link :to="{ name: 'upcomingEvents' }" class="flex items-center gap-x-2 text-md !text-white-secondary-text p-1 pl-3 rounded-tr rounded-br hover:bg-gray-100 hover:dark:bg-gray-50/10" :class="{ 'bg-gray-100 dark:bg-gray-50/10 border-l !text-white-primary-text dark:!text-dark-primary-text border-dark-bg dark:border-white': $route.name == 'upcomingEvents' || $route.name == 'upcomingEventDetails' || $route.name == 'eventApplicants' }">
                      <p>Upcoming Events</p>
                    </router-link>
                    <router-link :to="{ name: 'FinishedEvents' }" class="flex items-center gap-x-2 text-md !text-white-secondary-text p-1 pl-3 rounded-tr rounded-br hover:bg-gray-100 hover:dark:bg-gray-50/10" :class="{ 'bg-gray-100 dark:bg-gray-50/10 border-l !text-white-primary-text dark:!text-dark-primary-text border-dark-bg dark:border-white': $route.name == 'FinishedEvents' }">
                      <p>Finished Events</p>
                    </router-link>
                </div>
              </li>
            </ul>
        </nav>
        <!-- nav for admin -->
        <nav class="p-5" v-if="role === 'admin'">
            <ul class="space-y-2">
              <li>
                <router-link :to="{ name: 'adminDashboard' }" class="flex items-center gap-x-2 text-md !text-white-secondary-text p-1 rounded hover:bg-gray-100 hover:dark:bg-gray-50/10" :class="{ 'bg-gray-100 dark:bg-gray-50/10 !text-white-primary-text dark:!text-dark-primary-text': $route.name == 'adminDashboard' }">
                  <Icon icon="mdi:view-dashboard-outline" class="text-xl"/>
                  <p>Dashboard</p>
                </router-link>
              </li>
              <li>
                <div @click="toggleDropdown('schools')" class="flex items-center gap-x-2 text-md !text-white-secondary-text p-1 rounded cursor-pointer hover:bg-gray-100 hover:dark:bg-gray-50/10" :class="{ 'bg-gray-100 dark:bg-gray-50/10 !text-white-primary-text dark:!text-dark-primary-text': $route.name == 'memberSchool' || $route.name == 'schoolApplications' }">
                  <Icon icon="lucide:school-2" class="text-xl"/>
                  <p>Schools</p>
                  <Icon icon="iconamoon:arrow-down-2-duotone" class="text-2xl ml-auto transition-all duration-100" :class="{ 'rotate-180': openDropdown.includes('schools') }" />
                </div>
                <div v-if="openDropdown.includes('schools')" class="border-l dark:border-gray-100/10 ml-3 mt-1">
                    <router-link :to="{ name: 'memberSchool' }" class="flex items-center gap-x-2 text-md !text-white-secondary-text p-1 pl-3 rounded-tr rounded-br hover:bg-gray-100 hover:dark:bg-gray-50/10" :class="{ 'bg-gray-100 dark:bg-gray-50/10 border-l !text-white-primary-text dark:!text-dark-primary-text border-dark-bg dark:border-white': $route.name == 'memberSchool' }">
                      <p>Member Schools</p>
                    </router-link>
                    <router-link :to="{ name: 'schoolApplications' }" class="flex items-center gap-x-2 text-md !text-white-secondary-text p-1 pl-3 rounded-tr rounded-br hover:bg-gray-100 hover:dark:bg-gray-50/10" :class="{ 'bg-gray-100 dark:bg-gray-50/10 border-l !text-white-primary-text dark:!text-dark-primary-text border-dark-bg dark:border-white ': $route.name == 'schoolApplications' }">
                      <p>School applications</p>
                    </router-link>
                </div>
              </li>
              <li>
                <div @click="toggleDropdown('events')" class="flex items-center gap-x-2 text-md !text-white-secondary-text p-1 rounded cursor-pointer hover:bg-gray-100 hover:dark:bg-gray-50/10" :class="{ 'bg-gray-100 dark:bg-gray-50/10 !text-white-primary-text dark:!text-dark-primary-text': $route.name == 'upcomingEvents' || $route.name == 'ongoingEvents' || $route.name == 'FinishedEvents' || $route.name == 'upcomingEventDetails' || $route.name == 'eventApplicants' || $route.name == 'eventDashboard' }">
                  <Icon icon="mdi:event-outline" class="text-xl"/>
                  <p>Events</p>
                  <Icon icon="iconamoon:arrow-down-2-duotone" class="text-2xl ml-auto transition-all duration-100" :class="{ 'rotate-180': openDropdown.includes('events') }" />
                </div>
                <div v-if="openDropdown.includes('events')" class="border-l dark:border-gray-100/10 ml-3 mt-1">
                    <router-link :to="{ name: 'ongoingEvents' }" class="flex items-center gap-x-2 text-md !text-white-secondary-text p-1 pl-3 rounded-tr rounded-br hover:bg-gray-100 hover:dark:bg-gray-50/10" :class="{ 'bg-gray-100 dark:bg-gray-50/10 border-l !text-white-primary-text dark:!text-dark-primary-text border-dark-bg dark:border-white': $route.name == 'ongoingEvents' || $route.name == 'eventDashboard'}">
                      <p>Ongoing Events</p>
                    </router-link>
                    <router-link :to="{ name: 'upcomingEvents' }" class="flex items-center gap-x-2 text-md !text-white-secondary-text p-1 pl-3 rounded-tr rounded-br hover:bg-gray-100 hover:dark:bg-gray-50/10" :class="{ 'bg-gray-100 dark:bg-gray-50/10 border-l !text-white-primary-text dark:!text-dark-primary-text border-dark-bg dark:border-white': $route.name == 'upcomingEvents' || $route.name == 'upcomingEventDetails' || $route.name == 'eventApplicants' }">
                      <p>Upcoming Events</p>
                    </router-link>
                    <router-link :to="{ name: 'FinishedEvents' }" class="flex items-center gap-x-2 text-md !text-white-secondary-text p-1 pl-3 rounded-tr rounded-br hover:bg-gray-100 hover:dark:bg-gray-50/10" :class="{ 'bg-gray-100 dark:bg-gray-50/10 border-l !text-white-primary-text dark:!text-dark-primary-text border-dark-bg dark:border-white': $route.name == 'FinishedEvents' || $route.name == 'eventDashboardFinished' }">
                      <p>Finished Events</p>
                    </router-link>
                </div>
              </li>
              <li>
                <router-link :to="{ name: 'announcements' }" class="flex items-center gap-x-2 text-md !text-white-secondary-text p-1 rounded hover:bg-gray-100 hover:dark:bg-gray-50/10" :class="{ 'bg-gray-100 dark:bg-gray-50/10 !text-white-primary-text dark:!text-dark-primary-text': $route.name == 'announcements' }">
                  <Icon icon="mdi:announcement-outline" class="text-xl"/>
                  <p>Announcemens</p>
                </router-link>
              </li>
            </ul>
        </nav>
        <!-- nav for athlete -->
        <nav class="p-5" v-if="role === 'athlete'">
          <ul class="space-y-2">
              <li>
                <router-link :to="{ name: 'athleteProfile' }" class="flex items-center gap-x-2 text-md !text-white-secondary-text p-1 rounded hover:bg-gray-100 hover:dark:bg-gray-50/10" :class="{ 'bg-gray-100 dark:bg-gray-50/10 !text-white-primary-text dark:!text-dark-primary-text': $route.name == 'athleteProfile' }">
                  <Icon icon="mdi:user" class="text-xl"/>
                  <p>Profile</p>
                </router-link>
              </li>
              <li>
                <router-link :to="{ name: 'athleteNewsfeed' }" class="flex items-center gap-x-2 text-md !text-white-secondary-text p-1 rounded hover:bg-gray-100 hover:dark:bg-gray-50/10" :class="{ 'bg-gray-100 dark:bg-gray-50/10 !text-white-primary-text dark:!text-dark-primary-text': $route.name == 'athleteNewsfeed' }">
                  <Icon icon="mdi:view-dashboard-outline" class="text-xl"/>
                  <p>Newsfeed</p>
                </router-link>
              </li>
              <li>
                <div @click="toggleDropdown('forms')" class="flex items-center gap-x-2 text-md !text-white-secondary-text p-1 rounded cursor-pointer hover:bg-gray-100 hover:dark:bg-gray-50/10" :class="{ 'bg-gray-100 dark:bg-gray-50/10 !text-white-primary-text dark:!text-dark-primary-text': $route.name == 'forms' || $route.name == 'filledOut' }">
                  <Icon icon="clarity:form-line" class="text-xl"/>
                  <p>Forms</p>
                  <Icon icon="iconamoon:arrow-down-2-duotone" class="text-2xl ml-auto transition-all duration-100" :class="{ 'rotate-180': openDropdown.includes('forms') }" />
                </div>
                <div v-if="openDropdown.includes('forms')" class="border-l dark:border-gray-100/10 ml-3 mt-1">
                    <router-link :to="{ name: 'forms' }" class="flex items-center gap-x-2 text-md !text-white-secondary-text p-1 pl-3 rounded-tr rounded-br hover:bg-gray-100 hover:dark:bg-gray-50/10" :class="{ 'bg-gray-100 dark:bg-gray-50/10 border-l !text-white-primary-text dark:!text-dark-primary-text border-dark-bg dark:border-white': $route.name == 'forms' }">
                      <p>Forms</p>
                    </router-link>
                    <router-link :to="{ name: 'filledOut' }" class="flex items-center gap-x-2 text-md !text-white-secondary-text p-1 pl-3 rounded-tr rounded-br hover:bg-gray-100 hover:dark:bg-gray-50/10" :class="{ 'bg-gray-100 dark:bg-gray-50/10 border-l !text-white-primary-text dark:!text-dark-primary-text border-dark-bg dark:border-white': $route.name == 'filledOut' }">
                      <p>Filled Out Form</p>
                    </router-link>
                </div>
              </li>
              <li>
                <div @click="toggleDropdown('events')" class="flex items-center gap-x-2 text-md !text-white-secondary-text p-1 rounded cursor-pointer hover:bg-gray-100 hover:dark:bg-gray-50/10" :class="{ 'bg-gray-100 dark:bg-gray-50/10 !text-white-primary-text dark:!text-dark-primary-text': $route.name == 'upcomingEvents' || $route.name == 'ongoingEvents' || $route.name == 'FinishedEvents' || $route.name == 'upcomingEventDetails' || $route.name == 'eventApplicants' || $route.name == 'eventDashboard' }">
                  <Icon icon="mdi:event-outline" class="text-xl"/>
                  <p>Events</p>
                  <Icon icon="iconamoon:arrow-down-2-duotone" class="text-2xl ml-auto transition-all duration-100" :class="{ 'rotate-180': openDropdown.includes('events') }" />
                </div>
                <div v-if="openDropdown.includes('events')" class="border-l dark:border-gray-100/10 ml-3 mt-1">
                    <router-link :to="{ name: 'ongoingEvents' }" class="flex items-center gap-x-2 text-md !text-white-secondary-text p-1 pl-3 rounded-tr rounded-br hover:bg-gray-100 hover:dark:bg-gray-50/10" :class="{ 'bg-gray-100 dark:bg-gray-50/10 border-l !text-white-primary-text dark:!text-dark-primary-text border-dark-bg dark:border-white': $route.name == 'ongoingEvents' || $route.name == 'eventDashboard'}">
                      <p>Ongoing Events</p>
                    </router-link>
                    <router-link :to="{ name: 'upcomingEvents' }" class="flex items-center gap-x-2 text-md !text-white-secondary-text p-1 pl-3 rounded-tr rounded-br hover:bg-gray-100 hover:dark:bg-gray-50/10" :class="{ 'bg-gray-100 dark:bg-gray-50/10 border-l !text-white-primary-text dark:!text-dark-primary-text border-dark-bg dark:border-white': $route.name == 'upcomingEvents' || $route.name == 'upcomingEventDetails' || $route.name == 'eventApplicants' }">
                      <p>Upcoming Events</p>
                    </router-link>
                    <router-link :to="{ name: 'FinishedEvents' }" class="flex items-center gap-x-2 text-md !text-white-secondary-text p-1 pl-3 rounded-tr rounded-br hover:bg-gray-100 hover:dark:bg-gray-50/10" :class="{ 'bg-gray-100 dark:bg-gray-50/10 border-l !text-white-primary-text dark:!text-dark-primary-text border-dark-bg dark:border-white': $route.name == 'FinishedEvents' }">
                      <p>Finished Events</p>
                    </router-link>
                </div>
              </li>
          </ul>
        </nav>
        <!-- nav for coach -->
        <nav class="p-5" v-if="role === 'coach'">
            <ul class="space-y-2">
              <li>
                <router-link :to="{ name: 'athleteNewsfeed' }" class="flex items-center gap-x-2 text-md !text-white-secondary-text p-1 rounded" :class="{ 'bg-gray-100 dark:bg-gray-50/10 !text-white-primary-text dark:!text-dark-primary-text': $route.name == 'coachDashboard' }">
                  <Icon icon="mdi:view-dashboard-outline" class="text-xl"/>
                  <p>Newsfeed</p>
                </router-link>
              </li>
              <li>
                <router-link :to="{ name: 'training' }" class="flex items-center gap-x-2 text-md !text-white-secondary-text p-1 rounded cursor-pointer hover:bg-gray-100 hover:dark:bg-gray-50/10" :class="{ 'bg-gray-100 dark:bg-gray-50/10 !text-white-primary-text dark:!text-dark-primary-text': $route.name == 'training' }">
                  <Icon icon="mdi:view-dashboard-outline" class="text-xl"/>
                  <p>Training</p>
                </router-link>
              </li>
              <li>
                <div @click="toggleDropdown('athletes')" class="flex items-center gap-x-2 text-md !text-white-secondary-text p-1 rounded cursor-pointer hover:bg-gray-100 hover:dark:bg-gray-50/10" :class="{ 'bg-gray-100 dark:bg-gray-50/10 !text-white-primary-text dark:!text-dark-primary-text': $route.name == 'pendingAthletesCoach' || $route.name == 'athletesListCoach' }">
                  <Icon icon="ic:round-sports-gymnastics" class="text-xl"/>
                  <p>Athletes</p>
                   <Icon icon="iconamoon:arrow-down-2-duotone" class="text-2xl ml-auto transition-all duration-100" :class="{ 'rotate-180': openDropdown.includes('athletes') }" />
                </div>
                <div v-if="openDropdown.includes('athletes')" class="border-l dark:border-gray-100/10 ml-3 mt-1">
                    <router-link :to="{ name: 'athletesListCoach' }" class="flex items-center gap-x-2 text-md !text-white-secondary-text p-1 pl-3 rounded-tr rounded-br" :class="{ 'bg-gray-100 dark:bg-gray-50/10 border-l !text-white-primary-text dark:!text-dark-primary-text border-dark-bg dark:border-white': $route.name == 'athletesListCoach' }">
                      <p>Athlete Lists</p>
                    </router-link>
                    <router-link :to="{ name: 'pendingAthletesCoach' }" class="flex items-center gap-x-2 text-md !text-white-secondary-text p-1 pl-3 rounded-tr rounded-br" :class="{ 'bg-gray-100 dark:bg-gray-50/10 border-l !text-white-primary-text dark:!text-dark-primary-text border-dark-bg dark:border-white': $route.name == 'pendingAthletesCoach' }">
                      <p>Pending Athletes</p>
                    </router-link>
                </div>
              </li>
              <li>
                <div @click="toggleDropdown('events')" class="flex items-center gap-x-2 text-md !text-white-secondary-text p-1 rounded cursor-pointer hover:bg-gray-100 hover:dark:bg-gray-50/10" :class="{ 'bg-gray-100 dark:bg-gray-50/10 !text-white-primary-text dark:!text-dark-primary-text': $route.name == 'upcomingEvents' || $route.name == 'ongoingEvents' || $route.name == 'FinishedEvents' || $route.name == 'upcomingEventDetails' || $route.name == 'eventApplicants' || $route.name == 'eventDashboard' }">
                  <Icon icon="mdi:event-outline" class="text-xl"/>
                  <p>Events</p>
                  <Icon icon="iconamoon:arrow-down-2-duotone" class="text-2xl ml-auto transition-all duration-100" :class="{ 'rotate-180': openDropdown.includes('events') }" />
                </div>
                <div v-if="openDropdown.includes('events')" class="border-l dark:border-gray-100/10 ml-3 mt-1">
                    <router-link :to="{ name: 'ongoingEvents' }" class="flex items-center gap-x-2 text-md !text-white-secondary-text p-1 pl-3 rounded-tr rounded-br hover:bg-gray-100 hover:dark:bg-gray-50/10" :class="{ 'bg-gray-100 dark:bg-gray-50/10 border-l !text-white-primary-text dark:!text-dark-primary-text border-dark-bg dark:border-white': $route.name == 'ongoingEvents' || $route.name == 'eventDashboard'}">
                      <p>Ongoing Events</p>
                    </router-link>
                    <router-link :to="{ name: 'upcomingEvents' }" class="flex items-center gap-x-2 text-md !text-white-secondary-text p-1 pl-3 rounded-tr rounded-br hover:bg-gray-100 hover:dark:bg-gray-50/10" :class="{ 'bg-gray-100 dark:bg-gray-50/10 border-l !text-white-primary-text dark:!text-dark-primary-text border-dark-bg dark:border-white': $route.name == 'upcomingEvents' || $route.name == 'upcomingEventDetails' || $route.name == 'eventApplicants' }">
                      <p>Upcoming Events</p>
                    </router-link>
                    <router-link :to="{ name: 'FinishedEvents' }" class="flex items-center gap-x-2 text-md !text-white-secondary-text p-1 pl-3 rounded-tr rounded-br hover:bg-gray-100 hover:dark:bg-gray-50/10" :class="{ 'bg-gray-100 dark:bg-gray-50/10 border-l !text-white-primary-text dark:!text-dark-primary-text border-dark-bg dark:border-white': $route.name == 'FinishedEvents' }">
                      <p>Finished Events</p>
                    </router-link>
                </div>
              </li>
            </ul>
        </nav>
    </aside>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue"
const role = ref('')

// dropdown logic
const openDropdown = ref([])

const toggleDropdown = (dropdownName) => {
  if(openDropdown.value.includes(dropdownName)){
    openDropdown.value = openDropdown.value.filter(dropdown => dropdown != dropdownName)
  }else{
    openDropdown.value.push(dropdownName)
  }
}

onMounted(() => {
    if(localStorage.getItem('role')){
        role.value = localStorage.getItem('role')
    }
})
</script>

<style>

</style>