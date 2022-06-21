<template>
    <div class="notification" :style="{backgroundColor:color,color:textColor}" @click="dismiss()">
        {{ text }}
    </div>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
    mounted() { 
        if (this.timeout) {
            setTimeout(()=>{
                this.dismiss();
            }, this.timeout);
        }
    },
    props: {
        text: {type: String, default: ""},
        color: {type: String, default: ""},
        textColor: {type: String, default: ""},
        timeout: {type: Number, default: 3000}
    },
    methods: {
        dismiss() {
            this.$emit("dismiss");
        }
    }
});
</script>

<style>
.notification {
    position: fixed;
    bottom: 3em;
    right: 0;
    left: 0;
    width: fit-content;
    margin: auto;
    z-index: 250;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5em;
    padding: .5em 2em;
    border-radius: .5em;
    background-color: #000;
    color: #fff;
    cursor: pointer;
}
.notification-enter-active {
    transition: transform 0.25s ease-out;
}
.notification-leave-active {
    transition: transform 0.25s ease-in;
}
.notification-enter, .notification-leave-to {
    transform: translateY(200%);
    transform: translateY(calc(100% + 3em));
}
</style>