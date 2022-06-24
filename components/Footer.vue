<template>
    <footer>
        <div class="newsletter">
            <input type="email" placeholder="Register to the newsletter" v-model="newsletterEmail" @keyup="onKeyupNewsletterInput" />
            <button @click="submitNewsletter">&gt;</button>
        </div>
        <div>
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
        </div>
    </footer>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
    data(){
        return {
            newsletterEmail: ""
        };
    },
    props: {
        connected: {
            type: Boolean,
            default: false
        }
    },
    methods:{
        submitNewsletter() {
            if (this.newsletterEmail.length > 3 && this.newsletterEmail.includes("@")) {
                console.log(this.newsletterEmail);
                this.$emit("subscribeNewsletter", this.newsletterEmail);
                this.newsletterEmail = "";
            }
        },
        onKeyupNewsletterInput(event) {
            if (event.keyCode == 13)
                this.submitNewsletter();
        }
    }
});
</script>

<style>
footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #1d1d1d;
    color: #fff;
    padding: 1em 5%;
}
footer > div {
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;
}
footer .logo {
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
footer .newsletter input {
    width: 50%;
    padding: 1.2em 2em;
    background-color: #fff;
    color: #000;
    border: 0;
    border-radius: 1.2em;
    margin: auto;
}
footer .newsletter button {
    position: relative;
    right: calc(25% + 1em);
    border: 0;
    background-color: unset;
    font-size: 1.5em;
    padding: 0 1em
}
</style>