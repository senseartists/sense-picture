<template>
    <div v-bind:class="$route.name">
        <NuxtChild @notification="addNotification"></NuxtChild>
        <TransitionGroup name="notification">
            <Notification v-for="notif in notifications" :key="notif.id" @dismiss="dismissNotification(notif)" :text="notif.text" :color="notif.color" />
        </TransitionGroup>
    </div>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
    data() {
        return {
            notifications: [],
            notifIndex: 1
        }
    },
    methods: {
        addNotification(notif) {
            notif.id = this.notifIndex++;
            this.notifications.push(notif);
        },
        dismissNotification(notif) {
            this.notifications = this.notifications.filter(n => n.id !== notif.id);
        }
    }
});
</script>

<style>
html, input, textarea, button, select {
    font-size: 100%;
    line-height: 1.25;
    font-family: 'Antoine', 'Apfel Grotezk', 'apfel_reg', -apple-system, "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-text-size-adjust: 100%;
}
html, body {
    background: #1d1d1d;
    margin: 0;
    overflow: hidden;
}
* {
    box-sizing: border-box;
}
a, select {
    color: inherit;
    text-decoration: none;
    transition: color 0.3s ease;
    background-color: transparent;
}
button {
    cursor: pointer;
}

.button {
    border-radius: 1em;
    border: solid .1em #ffffff;
    padding: .25em 1em;
    background-color: transparent;
    color: inherit;
    font-size: 1.15em;
    transition: color 0.3s ease, background-color 0.3s ease;
    cursor: pointer;
}
.button:hover {
    background-color: #fff;
    color: #1d1d1d;
}
select.button {
    appearance: none;
    text-align: center;
}
select.button option {
    appearance: none;
    text-align: center;
    background-color: black;
    color: white; /* TODO */
}
select.button option:hover {
    background-color: white;
    color: black; /* TODO */
}
select.button :last-child {
    border-radius: 1em;
}
input, select {
    appearance: none;
    background-color: transparent;
    border: none;
    outline: none;
    font-size: 1em;
    color: inherit;
    padding: .25em;
    border-bottom: .05em solid #fff;
    height: 2em;
}
input:focus, select:focus {
    border-bottom: .1em solid #fff;
    padding-bottom: .2em;
}
select {
    position: relative;
}
select::-ms-expand {
    display: none;
}
select:after {
    content: "▼";
    position: absolute;
    top: 100%;
    left: 0;
}

/* scrollbars */
::-webkit-scrollbar {
    width: 8px;
}
::-webkit-scrollbar-track {
    background: #444;
}
::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
    background: #ddd;
}

/* transition */
.page-enter-active, .page-leave-active {
    transition: opacity 0.5s;
}
.page-enter, .page-leave-to {
    opacity: 0;
}

.layout-enter-active, .layout-leave-active {
    transition: opacity 0.5s;
}
.layout-enter, .layout-leave-to {
    opacity: 0;
}

.fade-leave-active, .fade-enter-active {
    transition: opacity 0.25s;
}
.fade-enter, .fade-leave-to {
    opacity: 0;
}

.slide-enter-active {
    transition: transform 0.25s ease-out;
}
.slide-leave-active {
    transition: transform 0.25s ease-in;
}
.slide-out-leave-active {
    transition: transform 0.25s ease-in;
}
.slide-out-enter-active {
    transition: transform 0.25s ease-out;
}
.slide-enter, .slide-out-leave-to {
    transform: translateX(100%);
}
.slide-leave-to, .slide-out-enter {
    transform: translateX(-100%);
}
</style>
