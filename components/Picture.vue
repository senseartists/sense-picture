<template>
    <div class="picture row">
        <div class="column flex-2">
            <CellSpotify class="flex-1" :spotify="spotify" />
            <CellImage :image="image" />
        </div>
        <div class="column flex-2">
            <CellAppleMusic class="flex-2" :apple-music="appleMusic" />
            <CellDeezer class="flex-2" :deezer="deezer" />
            <CellTop3 class="flex-3" :top3="top3" />
        </div>
        <div class="column flex-2">
            <CellPlaylists class="flex-2" :playlists="playlists" />
            <CellTwitter />
        </div>
        <div class="column flex-3">
            <CellSubmit class="flex-1" :connected="connected" />
        </div>
    </div>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
    props: ["appleMusic","deezer","spotify","image","connected","top3","playlists"],
});
</script>

<style>
.picture {
    width: 100%;
}
.row {
    display: flex;
    flex-direction: row;
}
.column {
    display: flex;
    flex-direction: column;
}
.flex-1 {
    flex: 1;
}
.flex-2 {
    flex: 2;
}
.flex-3 {
    flex: 3;
}
.flex-4 {
    flex: 4;
}
.flex-6 {
    flex: 6;
}
.cell {
    font-size: 1.5em;
}
.cell h1 {
    font-size: 1.5em;
    margin: 0;
}

@media (orientation: portrait) {
    .row {
        flex-direction: column;
    }
}
</style>