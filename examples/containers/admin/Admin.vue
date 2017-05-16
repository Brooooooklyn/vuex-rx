<template>
   <p v-if="!adminAccess">Checking access...</p>
   <p v-else-if="adminAccess === 'GRANTED'">Access granted</p>
   <p v-else>Access denied. Redirecting back home.</p>
</template>
<script src="./Admin.component.js"></script>
