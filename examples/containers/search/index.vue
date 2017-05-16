<template>
  <div>
    <router-link to="/admin" style="display: 'block'; marginBottom: 10">
      Admin Panel
    </router-link>
    <UserSearchInput
      v-bind:default-value="query"
      v-bind:on-change="handleUserSearch"
    />
    <UserSearchResults
      v-bind:results="results"
      v-bind:loading="searchInFlight"
    />
  </div>
</template>
<script src="./Search.component.js"></script>
