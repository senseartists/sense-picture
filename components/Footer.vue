<template>
    <footer>
        <div class="links">
            <Transition name="fade" mode="out-in">
                <div v-if="connected" :key="1">
                    <NuxtLink to="#">resources</NuxtLink>
                    <NuxtLink to="#">your contract</NuxtLink>
                    <NuxtLink to="#">earnings</NuxtLink>
                </div>
                <div v-else :key="2">
                    <NuxtLink to="#">terms</NuxtLink>
                    <NuxtLink to="#">privacy</NuxtLink>
                    <NuxtLink to="#">jobs</NuxtLink>
                </div>
            </Transition>
            <div>
                <NuxtLink to="#">manifesto</NuxtLink>
                <NuxtLink to="#">brand guidelines</NuxtLink>
                <NuxtLink to="#"><img src="~/assets/images/socials/instagram.svg" alt="instagram" title="instagram" height="30" /></NuxtLink>
                <NuxtLink to="#"><img src="~/assets/images/socials/twitter.svg" alt="twitter" title="twitter" height="30" /></NuxtLink>
                <NuxtLink to="#"><img src="~/assets/images/socials/discord.svg" alt="discord" title="discord" height="30" /></NuxtLink>
            </div>
        </div>
        <NuxtLink class="logo" to="/">
            <SenseLogo />
        </NuxtLink>
    </footer>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
    props: {
        connected: {
            type: Boolean,
            default: false
        }
    }
});
</script>

<style>
footer {
    display: flex;
    flex-direction: row;
    align-items: center;
    background: #1d1d1d;
    color: #fff;
    padding: 1em 5%;
}
footer > .logo {
    flex: 1;
    display: flex;
    flex-direction: row-reverse;
}
footer .links {
    flex: 1;
    display: flex;
    flex-direction: column;
    font-size: 1.5em;
}
footer .links a {
    margin-right: 1em;
}
footer .links a:hover {
    text-shadow: 0 0 0.2em #fff;
}
footer .links img {
    height: 1em;
    vertical-align: middle;
}
footer .links img:hover {
    filter: drop-shadow(0px 0px 0.2em #fff);
}
</style>