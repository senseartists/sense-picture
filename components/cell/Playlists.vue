<template>
    <div class="playlists cell">
        <h1>Playlists</h1>
        <div class="playlists-list" name="fade">
            <Transition v-for="(playlist,index) in playlists" :key="playlist" mode="out-in" name="fade">
                <img :key="playlist" :src="playlist" />
            </Transition>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
export default Vue.extend({
    props: {
        playlists: {type: Array, default: () => []}
    }
});
</script>

<style>
.playlists {
    background: #fff;
    color: #000;
    display: flex;
    flex-direction: column;
    align-content: space-between;
}
.playlists h1 {
    text-align: center;
    padding-top: 2rem;
    flex: 1;

}
.playlists-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
}
.playlists-list img {
    width: 33%;
    padding: 0.5%;
}
</style>