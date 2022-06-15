<template>
    <div class="spotify cell">
        <h1>Spotify</h1>
        <Transition mode="out-in" name="fade">
            <span :key="spotify">{{spotify}}</span>
        </Transition>
    </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
    name: "CellSpotify",
    props: ['spotify']
});
</script>

<style>
.spotify {
    background-color: #1db954;
    color: #fff;
    padding: 1.5rem 10%;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.spotify span {
    text-align: center;
    display: block;
}
</style>