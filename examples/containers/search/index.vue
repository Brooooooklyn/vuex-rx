<template>
  <div>
    <router-link to="/admin" style="display: 'block'; marginBottom: 10">
      Admin Panel
    </router-link>
    <user-search-input
      :default-value="query"
      :on-change="search"
    />
    <user-search-results
      :results="results"
      :loading="searchInFlight"
    />
  </div>
</template>
<script src="./Search.component.js"></script>
