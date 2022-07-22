<template>
    <NuxtLink class="sense-logo" to="/">
        <img src="~/assets/images/svg/logo.svg" width="466" alt="SENSE" />
        <span>music release club</span>
    </NuxtLink>
</template>

<script>
  export default {
    layout: 'SenseLogo'
  }
</script>

<style>
.sense-logo {
    height: 3em;
}
.sense-logo img {
    display: block;
    height: 2em;
    width: auto;
}
.sense-logo span {
    display: block;
    text-align: center;
}
</style>