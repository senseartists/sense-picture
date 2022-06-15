<template>
    <div class="image cell">
        <Transition mode="out-in" name="fade">
            <div :style="{'background-image':'url('+image+')'}"></div>
        </Transition>
    </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
    props: ["image"]
});
</script>

<style>
.image > div {
    width: 100%;
    padding-bottom: 100%;
    background-position: center;
    background-size: cover;
    transition: background-image .5s ease;
}
</style>