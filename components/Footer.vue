<template>
    <footer>
        <div class="newsletter" v-if="!connected">
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
                <!--<div>
                    <NuxtLink to="#">manifesto</NuxtLink>
                    <NuxtLink to="#">brand guidelines</NuxtLink>
                </div>-->
            </div>
            <!--<div class="socials">
                <a href="https://www.instagram.com/senseartists" target="_blank"><img src="~/assets/images/socials/instagram.svg" alt="instagram" title="instagram" height="30" /></a>
                <a href="https://twitter.com/senseartists" target="_blank"><img src="~/assets/images/socials/twitter.svg" alt="twitter" title="twitter" height="30" /></a>
                <a href="#"><img src="~/assets/images/socials/discord.svg" alt="discord" title="discord" height="30" /></a>
                <a href="https://liinks.co/senseartists" target="_blank"><img src="~/assets/images/socials/liinks.svg" alt="liinks" title="liinks" height="30" /></a>
            </div>-->
            <SenseLogo />
        </div>
    </footer>
</template>

<script>
import Vue from 'vue'
const axios = require('axios');
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
        async submitNewsletter() {
            if (this.newsletterEmail.length > 3 && this.newsletterEmail.includes("@")) {
                axios.get("api/newsletter/subscribe?email="+encodeURIComponent(this.newsletterEmail))
                .then(res => {
                    this.$emit("subscribeNewsletter", this.newsletterEmail);
                    this.newsletterEmail = "";
                })
                .catch(error => {
                    console.error(error);
                    this.$emit("cannotSubscribeNewsletter", this.newsletterEmail);
                });
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
    background-image: url("~/assets/images/grad.jpg");
    background-size: 100%;
    background-position: 0 100%;
    background-blend-mode: difference;
    color: #fff;
    padding: 1em 5%;
    position: relative;
}
footer > div {
    position: relative;
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
footer .socials {
    flex: 1;
}
footer .socials img {
    height: 1.8em;
    vertical-align: middle;
    margin-right: 1em;
    margin-top: .5em;
}
footer .socials img:hover {
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
    position: absolute;
    right: 25%;
    border: 0;
    background-color: unset;
    font-size: 1.5em;
    padding: 0 1em
}
@media (orientation: portrait) {
    footer .newsletter {
        margin-bottom: 1em;
    }
    footer .newsletter input {
        width: 90%;
    }
    footer .newsletter button {
        right: 5%;
    }
    footer .links div > a {
        display: block;
    }
}
</style>