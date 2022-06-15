<template>
    <div class="logo-container">
        <span class="logo-title">"picture"</span>
        <i class="logo-by">by</i>
        <SenseLogo class="logo-logo" />
    </div>
</template>

<script>
</script>

<style>
.logo-container {
    display: flex;
    flex-direction: row;
    align-items: center;
}
.logo-title {
    font-size: 3em;
}
.logo-by {
    font-size: 2em;
    margin: 10px;
}
.logo-logo {
    height: 3em;
}
</style>