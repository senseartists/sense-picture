<template>
    <div class="picture row">
        <div class="column flex-2">
            <CellDsp class="flex-1 spotify" title="Spotify" :streams="spotify" />
            <CellCurve class="flex-1" :title="cryptocurrency.symbol+': $'+Math.round(cryptocurrency.value*100)/100" legend="last week" :points="cryptocurrency.points" />
            <CellImage :image="image" />
        </div>
        <div class="column flex-2">
            <CellDsp class="flex-2 apple-music" title="Apple" :streams="appleMusic" />
            <CellDsp class="flex-2 deezer" title="Deezer" :streams="deezer" />
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
import axios from 'axios';

export default Vue.extend({
    props: ["appleMusic","deezer","spotify","image","connected","top3","playlists"],
    data() {
        return {
            cryptocurrency: {points:[], value:""}
        }
    },
    mounted() {
        axios.get("api/cryptocurrency")
        .then(res => {
            res.data.points.forEach(e => {
                e.x = new Date(e.x*1000);
            });
            this.cryptocurrency = res.data;
        });
    }
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

.spotify {
    background-color: #1db954;
}
.deezer {
    background-color: #5ec6f2/*#46a0fd*/;
}
.apple-music {
    background: linear-gradient(to bottom, #e97272, #dd5c5c);
}

@media (orientation: portrait) {
    .row {
        flex-direction: column;
    }
}
</style>